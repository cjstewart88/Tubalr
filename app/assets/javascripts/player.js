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
      playerVars: { 'autoplay': 1, 'rel': 0, 'theme': 'dark', 'showinfo': 0, 'iv_load_policy': 3, 'autohide': 1, 'wmode': 'opaque', 'allowScriptAccess': 'always', 'version': 3, 'restriction': 'US' },
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
      // we don't want to report video views in dj mode due
      // to some browsers wigging out and triggering this
      // several times in a row
      if (Playlist.djMode == null) {
        Report.reportWatchedVideo();
      }

      Playlist.nextSong();
    }
    else if (newState.data == 1) {
      $('#pause').show();
      $('#play').hide();
    }
    else if (newState.data == 2 && Playlist.djMode) {
      // if in djMode and the user trys to pause the video, start it back
      Player.self.playVideo();
    }
    else if (newState.data == 2) {
      $('#pause').hide();
      $('#play').show();
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
