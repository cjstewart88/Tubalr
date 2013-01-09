/*jshint browser:true undef:true strict:false jquery:true*/
/*global io */

var exports = window.Tubalr || {};

window.Tubalr = (function(exports) {
  var DJ = function(username, opts) {
    opts = opts || {};

    this.username = username;

    this.server   = opts.server || 'localhost';
    this.port     = opts.port   || 8900;

    this.socket   = io.connect(this.server, {port: this.port});
    this.onUpdate = opts.onUpdate || function() {};
  };

  DJ.prototype.startBroadcasting = function(videoId, videoElapsed) {
    if (!this.broadcasting) {
      this.broadcasting = true;
      this.socket.emit('start', {
        from: this.username,
        id:   videoId,
        at:   videoElapsed
      });
    }
  };

  DJ.prototype.stopBroadcasting = function() {
    if (this.broadcasting) {
      this.broadcasting = false;

      this.socket.emit('stop', {
        from: this.username
      });
    }
  };

  DJ.prototype.updateBroadcast = function(videoId, videoElapsed) {
    if (this.broadcasting) {
      this.socket.emit('change', {
        from: this.username,
        id:   videoId,
        at:   videoElapsed
      });
    }
  };

  DJ.prototype.listenTo = function(who) {
    var self = this;

    this.socket.on('dj-' + who, function(msg) {
      self.onUpdate(msg);
    });

    this.socket.emit('subscribe', {target: who});
  };

  exports.DJ = DJ;
  return exports;
})(exports);
