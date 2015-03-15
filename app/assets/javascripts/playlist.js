var Playlist = {

  currentTrack: 0,

  videos: [],

  direction: 'forward',

  reportUpdateNowPlayingThrottler: null,

  options: {
    videoID:              null,
    subreddit:            null,
    genre:                null
  },

  init: function (options) {
    Playlist.reset(function () {
      $.extend(Playlist.options, options);

      if (Playlist.options.subreddit) {
        Playlist.subreddit();
      }
      else if (Playlist.options.genre) {
        Playlist.genre();
      }
    });
  },

  resultsReady: function () {
    if (Player.self) {
      Playlist.start();
    }
    else {
      Player.init();
    }
  },

  reset: function (callback) {
    if (Player.self && Playlist.videos.length > 0) {
      Player.self.stopVideo();
    }

    Playlist.videos                       = [];
    Playlist.currentTrack                 = 0;
    Playlist.direction                    = 'forward';
    Playlist.options.videoID              = null;
    Playlist.options.subreddit            = null;
    Playlist.options.genre                = null;

    callback()
  },

  genre: function () {
    $.getJSON('http://developer.echonest.com/api/v4/playlist/basic?api_key=OYJRQNQMCGIOZLFIW&genre=' + Playlist.options.genre + '&format=jsonp&callback=?&results=40&type=genre-radio' , function(data) {
      var ajaxs = [];

      $.each(data.response.songs, function (i, song) {
        var searchFor = song.artist_name + ' ' + song.title;
        ajaxs.push(
          $.getJSON('http://gdata.youtube.com/feeds/api/videos?q=' + searchFor + '&orderby=relevance&start-index=1&max-results=10&v=2&alt=json-in-script&callback=?', function (data) {
            var video = Video.determineBestVideo(data.feed.entry, Playlist.videos);
            if (video) {
              Playlist.videos.push(video);
            }
          })
        )
      });

      $.when.apply($, ajaxs).then(Playlist.resultsReady);
    });
  },

  subreddit: function () {
    var subredditError = setTimeout(function () {
      Playlist.togglePlayer();
    }, 6000);

    $.getJSON("http://www.reddit.com/r/" + Playlist.options.subreddit + "/hot.json?jsonp=?&limit=100", function (data) {
      $.each(data.data.children, function () {
        var post = this.data;

        if (post.domain == "youtube.com" && post.media != null && typeof post.media === 'object' && post.media.hasOwnProperty("oembed") && post.media.oembed.url !== undefined) {
          var videoID = Video.getVideoID([{ href: post.media.oembed.url }]);

          if (videoID.length == 11) {
            Playlist.videos.push({
              videoID:    videoID,
              videoTitle: post.media.oembed.title.replace(/&amp;/g, '&')
            });
          }
        }
      });

      clearTimeout(subredditError);
      Playlist.resultsReady();
    });
  },

  togglePlayer: function () {
    $('#loading').fadeOut(function () {
      if (Playlist.videos.length == 0) {
        $('#empty-playlist').fadeIn();
      }
      else {
        $('#player').fadeIn();
      }
    });
  },

  preparePlaylist: function () {
    //randomly sort
    Playlist.videos.sort(function () {
      return (Math.round(Math.random()) - 0.5);
    });
  },

  start: function () {
    Playlist.preparePlaylist();
    Playlist.togglePlayer();
    Playlist.currentVideo();
  },

  playPause: function () {
    if (Player.self.getPlayerState() === 1) {
      Player.self.pauseVideo();
      $('#play').show();
      $('#pause').hide();
    }
    else {
      Player.self.playVideo();
      $('#pause').show();
      $('#play').hide();
    }
  },

  nextSong: function (keepCurrentTrack) {
    Playlist.direction = "forward";

    if (keepCurrentTrack) {
      if (Playlist.currentTrack == Playlist.videos.length) {
        Playlist.currentTrack = 0;
      }
    }
    else if (Playlist.currentTrack == Playlist.videos.length-1) {
      Playlist.currentTrack = 0;
    }
    else {
      Playlist.currentTrack = Playlist.currentTrack+=1;
    }

    Playlist.currentVideo();
  },

  previousSong: function () {
    Playlist.direction = "backward";

    if (Playlist.currentTrack == 0) {
      Playlist.currentTrack = Playlist.videos.length-1;
      Playlist.currentVideo();
    }
    else {
      Playlist.currentTrack = Playlist.currentTrack-=1;
      Playlist.currentVideo();
    }
  },

  currentVideo: function () {
    // failed search - exit early
    if (Playlist.videos.length == 0) {
      return;
    }

    var currentVideo      = Playlist.videos[Playlist.currentTrack];
    var currentVideoTitle = currentVideo.videoTitle;

    document.title = currentVideoTitle;
    $('#currently-playing').text(currentVideoTitle);

    Player.self.loadVideoById({
      videoId: currentVideo.videoID
    });
  }

};

$(document).ready(function () {

  $('#next').click(function () {
    Playlist.nextSong();
  });

  $('#previous').click(function () {
    Playlist.previousSong();
  });

  $('#play, #pause').click(function() {
    Playlist.playPause();
  });

});
