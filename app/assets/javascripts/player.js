var Player = {
  self: null,
  listeners: [],
  
  init: function () {
    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/player_api?version=3";

    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);    
  },

  youtubeAPIReady: function () {
    // We have to make the youtube player visible for things
    // to work, not sure why...
    Playlist.togglePlayer();

    Player.self = new YT.Player('ytplayerid', {
      width:    800,
      height:   400,
      version:  3,
      playerVars: { 'autoplay': 1, 'rel': 0, 'theme': 'dark', 'showinfo': 0, 'autohide': 1, 'wmode': 'opaque', 'allowScriptAccess': 'always', 'version': 3, 'restriction': 'US' },
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
  }

};

function onYouTubePlayerAPIReady () { Player.youtubeAPIReady(); }
