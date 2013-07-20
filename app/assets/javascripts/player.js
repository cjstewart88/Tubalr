var Player = {
  self: null,
  listeners: [],

  init: function () {
    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/player_api?version=3";

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // lets keep the session active in google analytics to
    // track better avg visit duration
    setInterval(function () {
      Report.gaPing();
    }, 60000);
  },

  youtubeAPIReady: function () {
    // We have to make the youtube player visible for things
    // to work, not sure why...
    Playlist.togglePlayer();

    Player.self = new YT.Player('ytplayerid', {
      width:    800,
      height:   400,
      version:  3,
      playerVars: { 'autoplay': 1, 'rel': 0, 'theme': 'light', 'showinfo': 0, 'iv_load_policy': 3, 'autohide': 1, 'wmode': 'opaque', 'allowScriptAccess': 'always', 'version': 3, 'restriction': 'US' },
      events: {
        'onReady':        Player.onPlayerReady,
        'onStateChange':  Player.onPlayerStateChange,
        'onError':        Player.onPlayerError
      }
    });
  },

  onPlayerReady: function () {
    Playlist.start();
  },

  onPlayerStateChange: function (newState) {
    if (newState.data == 0) {
      Report.reportWatchedVideo();
      Playlist.nextSong();
    }

    for (var i = 0; i < Player.listeners.length; ++i) {
      Player.listeners[i](newState);
    }
  },

  onPlayerError: function (errorCode) {
    if (Playlist.direction == "backward") {
      Playlist.previousSong();
    }
    else {
      Playlist.nextSong();
    }
  },

  addStateListener: function(listener) {
    Player.listeners.push(listener);
  },

  checkPlayerStatus: function () {
    setInterval(function () {
      newState = {
        data: Player.self.getPlayerState()
      }

      Player.onPlayerStateChange(newState);
    }, 500);
  }

};

function onYouTubePlayerAPIReady () { Player.youtubeAPIReady(); }
