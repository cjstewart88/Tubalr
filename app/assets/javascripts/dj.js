/*jshint browser:true undef:true strict:false jquery:true*/
/*global io */

var exports = window.Tubalr || {};

window.Tubalr = (function(exports) {
  var DJ = function(username, opts) {
    var self = this;

    opts = opts || {};

    this.username = username || 'guest';

    this.server   = opts.server || 'throttle.io';
    this.port     = opts.port   || 8900;

    this.socket   = io.connect(this.server, {port: this.port});
    this.onUpdate = opts.onUpdate || function() {};

    this.listenerCount = 0;

    this.socket.on('update', function(msg) {
      var diff = (Date.now() - msg.ts) / 1000;
      self.onUpdate(msg.from, msg.title, msg.id, msg.at + diff);
    });

    this.socket.on('chat', function(msg) {
      self.newChatMessage(msg.from, msg.text);
    });

    this.socket.on('no-dj', function () {
      $('#playlist-message').text('This DJ is currently not broadcasting :(');
    });

    this.socket.on('join', function(msg) {
      self.listenerCount += 1; 
      self.joinPartNotice(msg.from, 'join');
      self.updateListenerCount();
    });

    this.socket.on('part', function(msg) {
      self.listenerCount -= 1;
      self.joinPartNotice(msg.from, 'part');
      self.updateListenerCount();
    });


    this.socket.emit('register', {from: this.username});
  };

  DJ.prototype.chat = function(text) {
    this.socket.emit('chat', {target: this.listeningTo, text: text});
    this.newChatMessage('you', text);
  };

  DJ.prototype.startBroadcasting = function(videoTitle, videoId, videoElapsed) {
    if (!this.broadcasting) {
      this.broadcasting = true;
      this.socket.emit('start', {
        ts:    Date.now(),
        title: videoTitle,
        id:    videoId,
        at:    videoElapsed
      });

      this.listeningTo = this.username;

      this.initBroadcastingUI();
    }
  };

  DJ.prototype.initBroadcastingUI = function () {
    window.onbeforeunload = function(e) {
      return 'Are you sure you want to leave DJ mode?';
    };

    $('.enter-dj-mode').addClass('leave-dj-mode')
                       .removeClass('enter-dj-mode')
                       .text('Quit DJ Mode')
                       .attr('original-title', 'If you leave DJ mode your listeners will be sad!');

    $('#dj-chat').addClass('show-chat');

    $('#djing').slideDown();
  };

  DJ.prototype.removeBroadcastingUI = function () {
    this.stopBroadcasting();

    window.onbeforeunload = null;

    $('.leave-dj-mode').addClass('enter-dj-mode')
                       .removeClass('leave-dj-mode')
                       .text('Enter DJ Mode')
                       .attr('original-title', 'Go LIVE and let others listen along with you!');

    $('#dj-chat').removeClass('show-chat');

    $('#djing').slideUp();
  };

  DJ.prototype.stopBroadcasting = function() {
    if (this.broadcasting) {
      this.broadcasting = false;

      this.socket.emit('stop', { });

      this.removeBroadcastingUI();
      Playlist.djMode = null;
    }
  };

  DJ.prototype.updateBroadcast = function(videoTitle, videoId, videoElapsed) {
    if (this.broadcasting) {
      this.socket.emit('change', {
        ts:    Date.now(),
        title: videoTitle,
        id:    videoId,
        at:    videoElapsed
      });
    }
  };

  DJ.prototype.listenTo = function(who) {
    this.listeningTo = who;
    this.socket.emit('subscribe', {target: who});
  };

  DJ.prototype.newChatMessage = function (from, text) {
    var chatLog = $('#dj-chat-log');
    var newLine = $('<div>').addClass('line');
    var fromSpan= $('<span>').addClass('from').text(from + ': ');
    var message = $('<span>').addClass('message').text(text);

    newLine.append(fromSpan).append(message);

    chatLog.append(newLine).scrollTop(chatLog[0].scrollHeight);
  };

  DJ.prototype.joinPartNotice = function (who, type) {
    var chatLog = $('#dj-chat-log');
    var action  = (type == 'join' ? ' joined the room.' : ' left the room.');
    var newLine = $('<div>').addClass('line').text(who + action);

    chatLog.append(newLine).scrollTop(chatLog[0].scrollHeight);
  };

  DJ.prototype.updateListenerCount = function () {
    $('#dj-listener-count').text(this.listenerCount);
  };

  exports.DJ = DJ;
  return exports;
})(exports);

$(document).ready(function () {

  $('.enter-dj-mode').live('click', function () {
    Playlist.djMode = new Tubalr.DJ($(this).data('dj-username'));

    Playlist.djMode.startBroadcasting(Playlist.videos[Playlist.currentTrack].videoTitle, Playlist.videos[Playlist.currentTrack].videoID, Player.self.getCurrentTime());

    return false;
  });

  $('.leave-dj-mode').live('click', function () {
    if (confirm('Are you sure you want to leave DJ mode?')) {
      Playlist.djMode.stopBroadcasting();
    }

    return false;
  });

  Mousetrap.bind('enter', function (e, element, combo) {
    if ($(e.target).attr('id') == 'dj-chat-input' && $(e.target).val().trim() != '') {
      if (User.username) {
        Playlist.djMode.chat($(e.target).val().trim());
        $(e.target).val('')
      }
      else {
        alert('You need to login to chat!');
      }
    }
  });

});
