var Player = {
  self: null,
  
  init: function () {
    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/player_api?version=3";

    //incoming ugly fix for YT not firing onReady if the player element is hidden
    if($.browser.mozilla) {
      tag.onload = function() {
        setTimeout(function() {
          if (!$("#player").is(':visible')) {
            $('#loading-playlist').hide();
            $('#player').show(0, function(){$('#player').hide();});
          }
        }, 2000);
      }
    }
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);    
  },

  youtubeAPIReady: function () {
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
    Playlist.playerReady();
  },

  onPlayerStateChange: function (newState) {
    if (newState.data == 0) {
      Playlist.nextSong();
    }
  },

  onPlayerError: function (errorCode) {
    if (Playlist.direction == "backward") {
      Playlist.previousSong();
    } 
    else {
      Playlist.nextSong();
    }
  }

};

function onYouTubePlayerAPIReady () { Player.youtubeAPIReady(); }
