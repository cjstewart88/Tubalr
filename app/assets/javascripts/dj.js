/*jshint browser:true undef:true strict:false jquery:true*/
/*global io */

window.Tubalr = (function(exports) {
  var DJ = function(username, opts) {
    var self = this;

    opts = opts || {};

    this.username = username      || 'guest';
    this.server   = opts.server   || 'throttle.io';
    this.port     = opts.port     || 8900;
    this.onUpdate = opts.onUpdate || function() {};
    this.socket   = io.connect(this.server, {port: this.port});

    self.socket.emit('register', {from: self.username});

    this.listenerCount = 0;

    this.socket.on('update', function(msg) {
      var diff = Math.max(0, (Date.now() - msg.ts) / 1000);
      self.onUpdate(msg.from, msg.title, msg.id, msg.at + diff);
    });

    this.socket.on('register', function(msg) {
      self.socket.emit('register', {from: self.username});
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
      self.updateListenersUI({ user: msg.from, action: 'join' });
    });

    this.socket.on('part', function(msg) {
      self.listenerCount -= 1;
      self.joinPartNotice(msg.from, 'part');
      self.updateListenersUI({ user: msg.from, action: 'part' });
    });

    this.socket.on('users', function(msg) {
      self.listenerCount = msg.users.length;
      self.updateListenersUI({ users: msg.users });
    });

  };

  DJ.prototype.chat = function(text) {
    this.socket.emit('chat', {text: text});
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

      this.initBroadcastingUI();
    }
  };

  DJ.prototype.initBroadcastingUI = function () {
    window.onbeforeunload = function(e) {
      return 'Are you sure you want to leave DJ mode?';
    };

    $('.enter-dj-mode').addClass('leave-dj-mode')
                       .removeClass('enter-dj-mode')
                       .val('Quit DJ Mode')
                       .attr('original-title', 'If you leave DJ mode your listeners will be sad!');

    $('#main-player-ui-tabs-wrapper').addClass('show-dj-ui show-only-playlist');

    $('#djing').slideDown();
  };

  DJ.prototype.stopBroadcasting = function() {
    if (this.broadcasting) {
      this.broadcasting = false;
      this.socket.emit('stop', { });
      this.removeBroadcastingUI();
      Playlist.djMode = null;
    }
  };

  DJ.prototype.removeBroadcastingUI = function () {
    this.stopBroadcasting();

    window.onbeforeunload = null;

    $('.leave-dj-mode').addClass('enter-dj-mode')
                       .removeClass('leave-dj-mode')
                       .val('Enter DJ Mode')
                       .attr('original-title', 'Go LIVE and let others listen along with you!');

    $('#main-player-ui-tabs-wrapper').removeClass('show-dj-ui')
                                     .removeClass('show-only-playlist show-only-chat show-only-listeners');

    $('#djing').slideUp();
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
    if (who.search("guest") == 0) {
      return;
    }
    
    var chatLog = $('#dj-chat-log');
    var action  = (type == 'join' ? ' joined the room.' : ' left the room.');
    var newLine = $('<div>').addClass('line').text(who + action);
    chatLog.append(newLine).scrollTop(chatLog[0].scrollHeight);
  };

  DJ.prototype.updateListenersUI = function (options) {
    $('#dj-listener-count').text(this.listenerCount);

    if (options.user) {
      var username = options.user.replace(/#/g,'');

      if (options.action == 'join') {
        var userLI = $('<li>').attr('id', username).text(username);
        $('#dj-listeners').append(userLI);
      }
      else {
        $('#dj-listeners #' + username).remove();
      }
    }
    else {
      $('#dj-listeners').html('');

      $.each(options.users, function (i, user) {
        var username = user.replace(/#/g,'');
        var userLI = $('<li>').attr('id', username).text(username);
        $('#dj-listeners').append(userLI);
      });
    }
  };

  exports.DJ = DJ;
  return exports;
})(window.Tubalr || {});

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

  $('#main-player-ui-tabs button').click(function () {
    if ($(this).attr('id') == 'show-playlist-button') {
      $('#main-player-ui-tabs-wrapper').removeClass('show-only-chat show-only-listeners').addClass('show-only-playlist');
    }
    else if ($(this).attr('id') == 'show-chat-button') {
      $('#main-player-ui-tabs-wrapper').removeClass('show-only-playlist show-only-listeners').addClass('show-only-chat'); 
    }
    else {
      $('#main-player-ui-tabs-wrapper').removeClass('show-only-playlist show-only-chat').addClass('show-only-listeners'); 
    }
  });

});
