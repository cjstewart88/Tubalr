var Playlist = {

  genres: ["a cappella", "acid house", "acid jazz", "acoustic blues", "afrobeat", "album rock", "alternative country", "alternative dance", "alternative hip hop", "alternative metal", "alternative rock", "ambient", "anti-folk", "art rock", "atmospheric black metal", "australian hip hop", "avant-garde", "avant-garde jazz", "avantgarde metal", "azonto", "bachata", "baile funk", "banda", "bass music", "bebop", "bhangra", "big band", "big beat", "black metal", "blue-eyed soul", "bluegrass", "blues", "blues-rock", "bolero", "boogaloo", "boogie-woogie", "bossa nova", "brass band", "brazilian pop music", "breakbeat", "breakcore", "brill building pop", "british blues", "british folk", "british invasion", "british pop", "broken beat", "brutal death metal", "bubblegum dance", "bubblegum pop", "cabaret", "calypso", "canterbury scene", "ccm", "celtic", "celtic rock", "chamber pop", "chanson", "chicago blues", "chicago house", "chicago soul", "children's music", "chill-out", "chillwave", "chiptune", "choral", "choro", "christian alternative rock", "christian hardcore", "christian hip hop", "christian metal", "christian music", "christian punk", "christian rock", "classic funk rock", "classic rock", "classical", "comedy", "contemporary country", "cool jazz", "country", "country blues", "country gospel", "country rock", "cowpunk", "crossover thrash", "crunk", "crust punk", "cumbia", "dance pop", "dance rock", "dance-punk", "dancehall", "dark ambient", "dark wave", "death core", "death metal", "deathgrind", "deep house", "delta blues", "desi", "detroit techno", "digital hardcore", "dirty south rap", "disco", "disco house", "djent", "doo-wop", "doom metal", "downtempo", "dream pop", "drone", "drum and bass", "dub", "dub techno", "dubstep", "dutch rock", "early music", "east coast hip hop", "easy listening", "ebm", "electric blues", "electro", "electro-industrial", "electroclash", "electronic", "emo", "eurobeat", "eurodance", "europop", "exotica", "experimental", "experimental rock", "fado", "filmi", "flamenco", "folk", "folk metal", "folk punk", "folk rock", "folk-pop", "freak folk", "freakbeat", "free improvisation", "free jazz", "freestyle", "funeral doom", "funk", "funk metal", "funk rock", "futurepop", "g funk", "gabba", "game", "gangster rap", "garage rock", "german pop", "glam metal", "glam rock", "glitch", "goregrind", "gospel", "gothic metal", "gothic rock", "gothic symphonic metal", "grave wave", "grime", "grindcore", "groove metal", "grunge", "gypsy jazz", "happy hardcore", "hard bop", "hard house", "hard rock", "hard trance", "hardcore", "hardcore hip hop", "hardcore techno", "hardstyle", "harmonica blues", "hi nrg", "highlife", "hip hop", "hip house", "horror punk", "house", "hyphy", "icelandic pop", "illbient", "indian classical", "indie folk", "indie pop", "indie rock", "indietronica", "industrial", "industrial metal", "industrial rock", "intelligent dance music", "irish folk", "italian disco", "j pop", "j rock", "jam band", "jangle pop", "japanoise", "jazz", "jazz blues", "jazz funk", "jazz fusion", "judaica", "jug band", "juggalo", "jump blues", "jungle music", "k pop", "kiwi rock", "klezmer", "kompa", "kraut rock", "kwaito", "laiko", "latin", "latin alternative", "latin jazz", "latin pop", "lo-fi", "louisiana blues", "lounge", "lovers rock", "madchester", "mambo", "mariachi", "martial industrial", "math rock", "mathcore", "mbalax", "medieval", "mellow gold", "melodic death metal", "melodic hardcore", "melodic metalcore", "memphis blues", "memphis soul", "merengue", "merseybeat", "metal", "metalcore", "minimal", "modern blues", "modern classical", "motown", "mpb", "musique concrete", "nashville sound", "native american", "neo classical metal", "neo soul", "neo-progressive", "neoclassical", "neofolk", "neue deutsche harte", "new age", "new beat", "new jack swing", "new orleans blues", "new orleans jazz", "new rave", "new romantic", "new wave", "new weird america", "ninja", "no wave", "noise pop", "noise rock", "northern soul", "nu jazz", "nu metal", "nu skool breaks", "nwobhm", "oi", "old school hip hop", "opera", "opm", "oratory", "outlaw country", "pagan black metal", "piano blues", "piano rock", "piedmont blues", "polka", "pop", "pop punk", "pop rap", "pop rock", "portuguese rock", "post rock", "post-grunge", "post-hardcore", "post-metal", "post-punk", "power electronics", "power metal", "power noise", "power pop", "power violence", "progressive bluegrass", "progressive house", "progressive metal", "progressive rock", "progressive trance", "protopunk", "psychedelic rock", "psychedelic trance", "psychobilly", "punk", "punk blues", "quiet storm", "r&b", "ragtime", "rai", "ranchera", "rap", "rap metal", "rap rock", "reggae", "reggaeton", "renaissance", "rock", "rock 'n roll", "rock en espanol", "rock steady", "rockabilly", "roots reggae", "roots rock", "rumba", "salsa", "samba", "screamo", "sexy", "shibuya-kei", "shoegaze", "show tunes", "singer-songwriter", "ska", "ska punk", "skate punk", "skiffle", "slovenian rock", "slow core", "sludge metal", "smooth jazz", "soca", "soft rock", "soukous", "soul", "soul blues", "soul jazz", "soundtrack", "southern gospel", "southern hip hop", "southern rock", "southern soul", "space rock", "speed garage", "speed metal", "speedcore", "stoner metal", "stoner rock", "straight edge", "stride", "suomi rock", "surf music", "swamp blues", "swedish indie pop", "swing", "symphonic black metal", "symphonic metal", "symphonic rock", "synthpop", "tango", "tech house", "technical death metal", "techno", "teen pop", "tejano", "texas blues", "texas country", "thai pop", "thrash core", "thrash metal", "traditional blues", "traditional country", "traditional folk", "trance", "trap music", "trapstep", "tribal house", "trip hop", "turbo folk", "turntablism", "twee pop", "uk garage", "uk post-punk", "underground hip hop", "uplifting trance", "urban contemporary", "vallenato", "video game music", "viking metal", "visual kei", "vocal house", "vocal jazz", "west coast rap", "western swing", "world", "worship", "zouk", "zydeco"],

  currentTrack: 0,

  videos: [],

  direction: 'forward',

  sortThrottler: null,

  djMode: null,

  options: {
    search:               null,
    searchType:           null,
    customPlaylistOwner:  null,
    customPlaylistName:   null,
    persistentSorting:    false,
    videoID:              null,
    subReddit:            null,
    djUsername:           null,
    djListener:           null
  },

  init: function (options) {
    Playlist.reset();
    $.extend(Playlist.options, options);

    Playlist.determineIfSpecialSearch();
    Playlist.report();

    Playlist[Playlist.options.searchType]();
  },

  resultsReady: function () {
    if (Player.self) {
      Playlist.start();
    }
    else {
      Player.init();
    }
  },

  reset: function () {
    if (Player.self && Playlist.videos.length > 0) {
      Player.self.stopVideo();
    }

    Playlist.videos                       = [];
    Playlist.currentTrack                 = 0;
    Playlist.direction                    = 'forward';
    Playlist.options.customPlaylistOwner  = null;
    Playlist.options.customPlaylistName   = null;
    Playlist.options.persistentSorting    = false;
    Playlist.options.videoID              = null;
    Playlist.options.subReddit            = null;

    $('.remove-when-searching').fadeOut();
    $('#player').fadeOut();
    $('#empty-playlist').fadeOut();
    $('#playlist-message').text('Loading...').fadeIn();
  },

  report: function () {
    Report.gaPageview();
  },

  determineIfSpecialSearch: function () {
    var search = Playlist.options.search;

    if (Playlist.genres.indexOf(search.replace(/[ +]/g, '')) != -1) {
      Playlist.options.searchType = 'genre';
    }
    else if (search.match('/r/') != null) {
      Playlist.options.searchType = 'subreddit';
      Playlist.options.subReddit = search.replace('/r/', '');
    }
  },

  dj: function () {
    Playlist.djMode = new Tubalr.DJ(Playlist.options.djListener);
    Playlist.djMode.listenTo(Playlist.options.djUsername);
    Playlist.djMode.onUpdate = Playlist.djModeChange;
  },

  djModeChange: function (dj, title, videoId, videoAt) {
    Playlist.videos = [{
      videoID:    videoId,
      videoTitle: title,
      startAt:    (videoAt < 0 ? 0 : videoAt)
    }];

    Playlist.resultsReady();
  },

  popupSearch: function () {
    var search = $('#popup-search-query').val();
    var videos = [];
    if (search == '') { return; }

    $('#popup-search-query, #search-popup-btn').attr('disabled', 'disabled');
    $('#popup-search-results-holder').addClass('show-popup-search-message');
    $('#popup-search-message').html("Searching...");
    $('#popup-search-results').html('');

    Playlist.just({
      search:       search,
      videos:       videos,
      resultsReady: function () {
        $('#popup-search-query, #search-popup-btn').removeAttr('disabled');

        if (!videos || videos.length == 0) {
          $('#popup-search-message').html("We couldn't find anything for you :(");
        }
        else {
          $('#popup-search-results-holder').removeClass('show-popup-search-message');

          $.each(videos, function (i, video) {
            $('#popup-search-results').append(
              "<li class='dragvid' data-video-title='" + video.videoTitle + "' data-video-id='" + video.videoID + "' >" +
              "<span class='remove-video icon-trash'></span>" +
              "<a href='#' id='" + video.videoID + "' >" + video.videoTitle + "</a></li>"
            );
          });
        }
      }
    });
  },

  just: function (options) {
    options = options || {};

    var search = options.search || Playlist.options.search;
    var videos = options.videos || Playlist.videos;

    // This is needed so when the similar search calls this method
    // it only gets 20 songs for the original search
    var numberOfSongs = (Playlist.options.searchType == 'just' ? 40 : 20);
    $.getJSON('http://developer.echonest.com/api/v4/artist/songs?api_key=OYJRQNQMCGIOZLFIW&name=' + encodeURIComponent(search) + '&format=jsonp&callback=?&start=0&results=' + numberOfSongs , function (data) {
      if (data.response.status.code == 5 || data.response.songs.length <= 10) {
        Playlist.youtube(options);
      }
      else {
        var ajaxs = [];

        $.each(data.response.songs, function (i, track) {
          if (track.title.toLowerCase().search("cover") == -1 && track.title.toLowerCase().search("remix") == -1) {
            ajaxs.push(
              $.getJSON('http://gdata.youtube.com/feeds/api/videos?q=' + escape(search) + '%20%2D$20' + escape(track.title) + '&orderby=relevance&start-index=1&max-results=10&v=2&format=5&alt=json-in-script&callback=?', function (data) {
                if (data.feed.hasOwnProperty("entry")) {
                  $.each(data.feed.entry, function (i, video) {
                    if (Video.isNotBlocked(video) && Video.isMusic(video) && Video.isUnique(video, videos) && Video.isNotCoverOrRemix(video) && Video.isNotUserBanned(video) && Video.isNotLive(video) && Video.hasTitle(video)) {
                      videos.push({
                        videoID:    video.id.$t.split(":")[3],
                        videoTitle: video.title.$t
                      });
                      return false;
                    }
                  });
                }
              })
            )
          }
        });
        $.when.apply($, ajaxs).then(options.resultsReady || Playlist.resultsReady);
      }
    });
  },

  similar: function () {
    var search = Playlist.options.search;
    $.getJSON('http://developer.echonest.com/api/v4/artist/similar?api_key=OYJRQNQMCGIOZLFIW&name=' + encodeURIComponent(search) + '&format=jsonp&callback=?&results=40&start=0', function (data) {
      if (data.response.status.code == 5) {
        Playlist.just()
      }
      else {
        var ajaxs = [];

        $.each(data.response.artists, function (i, artist) {
          ajaxs.push(
            $.getJSON('http://gdata.youtube.com/feeds/api/videos?q='+escape(artist.name)+'&orderby=relevance&start-index=1&max-results=10&v=2&alt=json-in-script&callback=?&format=5', function (data) {
              if (data.feed.hasOwnProperty("entry")) {
                $.each(data.feed.entry, function (i, video) {
                  if (Video.isNotBlocked(video) && Video.isMusic(video) && Video.isNotCoverOrRemix(video) && Video.isNotUserBanned(video) && Video.isNotLive(video) && Video.hasTitle(video)) {
                    Playlist.videos.push({
                      videoID: video.id.$t.split(":")[3],
                      videoTitle: video.title.$t
                    });

                    return false;
                  }
                });
              }
            })
          );
        });

        $.when.apply($,ajaxs).then(Playlist.just);
      }
    });
  },

  genre: function () {
    var search = Playlist.options.search;

    $.getJSON('http://developer.echonest.com/api/v4/playlist/basic?api_key=OYJRQNQMCGIOZLFIW&genre=' + search + '&format=jsonp&callback=?&results=40&type=genre-radio' , function(data) {
      var ajaxs = [];

      $.each(data.response.songs, function (i, song) {
        var searchFor = song.artist_name + ' ' + song.title;
        ajaxs.push(
          $.getJSON('http://gdata.youtube.com/feeds/api/videos?q=' + searchFor + '&orderby=relevance&start-index=1&max-results=10&v=2&alt=json-in-script&callback=?', function (data) {
            if (data.feed.hasOwnProperty("entry")) {
              $.each(data.feed.entry, function (i,video) {
                if (Video.isNotBlocked(video) && Video.isMusic(video) && Video.isNotLive(video) && Video.isNotUserBanned(video) && Video.hasTitle(video)) {
                  Playlist.videos.push({
                    videoID:    video.id.$t.split(":")[3],
                    videoTitle: video.title.$t,
                    artistName: song.artist_name
                  });

                  return false;
                }
              });
            }
          })
        )
      });

      $.when.apply($, ajaxs).then(Playlist.resultsReady);
    });
  },

  youtube: function (options) {
    var search = options.search || Playlist.options.search;
    var videos = options.videos || Playlist.videos;

    $.getJSON('http://gdata.youtube.com/feeds/api/videos?q=' + escape(search) + '&orderby=relevance&start-index=1&max-results=40&v=2&alt=json-in-script&callback=?', function (data) {
      if (data.feed.hasOwnProperty("entry")) {
        $.each(data.feed.entry, function (i, video) {
          if (Video.isNotBlocked(video) && Video.isNotUserBanned(video) && Video.hasTitle(video)) {
            videos.push({
              videoID:    video.id.$t.split(":")[3],
              videoTitle: video.title.$t
            });
          }
        });
      }

      if (options.resultsReady) {
        options.resultsReady();
      }
      else {
        Playlist.resultsReady();
      }
    });
  },

  customPlaylist: function () {
    var url = "/" + Playlist.options.customPlaylistOwner + "/playlist/" + Playlist.options.customPlaylistName + ".json";

    $.getJSON(url, function (data) {
      Playlist.videos = data;
      Playlist.resultsReady();
    });
  },

  video: function () {
    $.getJSON('https://gdata.youtube.com/feeds/api/videos/' + Playlist.options.videoID + '?v=2&alt=json-in-script&callback=?', function (data) {
      var video = data.entry;

      if (typeof video !== "undefined" && Video.isNotBlocked(video)) {
        Playlist.videos.push({
          videoID:    video.id.$t.split(":")[3],
          videoTitle: video.title.$t
        });
      }

      Playlist.resultsReady();
    });
  },

  subreddit: function () {
    var subredditError = setTimeout(function () {
      Playlist.togglePlayer();
    }, 6000);

    $.getJSON("http://www.reddit.com/r/" + Playlist.options.subReddit + "/hot.json?jsonp=?&limit=100", function (data) {
      $.each(data.data.children, function () {
        var post = this.data;

        if (post.domain == "youtube.com" && post.media != null && typeof post.media === 'object' && post.media.hasOwnProperty("oembed") && post.media.oembed.url !== undefined) {
          var videoID = Video.getVideoID([{ href: post.media.oembed.url }]);

          if (videoID.length == 11){
            Playlist.videos.push({
              videoID:    videoID,
              videoTitle: post.media.oembed.title
            });
          }
        }
      });

      clearTimeout(subredditError);
      Playlist.resultsReady();
    });
  },

  togglePlayer: function () {
    $('#playlist-message').hide();

    if (Playlist.videos.length == 0) {
      $('#empty-playlist').fadeIn();
    }
    else {
      $('#player').fadeIn(1000);
    }
  },

  preparePlaylist: function () {
    //don't sort a user playlist.
    if (Playlist.options.customPlaylistOwner == null || Playlist.options.customPlaylistOwner.length == 0) {
      Playlist.videos.sort(function () {
        return (Math.round(Math.random()) - 0.5);
      });
    }

    Playlist.buildPlaylistUI();
  },

  buildPlaylistUI: function () {
    var playlistContainer = $('#playlist').empty();

    $.each(Playlist.videos, function(i) {
      playlistContainer.append('<li data-video-title="' + this.videoTitle + '" data-video-id="' + this.videoID + '"><span class="remove-video icon-trash"></span><a href="#" id="' + this.videoID + '">' + this.videoTitle + '</a></li>');
    });
    if (Playlist.videos.length > 0) {
      $('#' + Playlist.videos[Playlist.currentTrack].videoID).addClass('active');
    }
  },

  start: function () {
    Playlist.preparePlaylist();
    Playlist.togglePlayer();
    Playlist.currentVideo();
  },

  playPause: function () {
    if (Player.self.getPlayerState() === 1) {
      Player.self.pauseVideo();
    }
    else {
      Player.self.playVideo();
    }
  },

  shuffle: function () {
    Playlist.options.persistentSorting = false;

    var currentTrackVideoID = Playlist.videos[Playlist.currentTrack].videoID;

    Playlist.videos.sort(function () {
      return (Math.round(Math.random()) - 0.5);
    });

    Playlist.currentTrack = 0;
    Playlist.currentVideo();
    Playlist.buildPlaylistUI();
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

  jumpToSong: function (videoID) {
    Playlist.currentTrack = videoID;
    Playlist.currentVideo();
  },

  currentVideo: function () {
    // failed search - exit early
    if (Playlist.videos.length == 0) {
      return;
    }
    var currentVideo      = Playlist.videos[Playlist.currentTrack];
    var currentVideoTitle = currentVideo.videoTitle;

    document.title = currentVideoTitle;
    $('#current-video-title').text(currentVideoTitle)

    $('#playlist .active').removeClass('active');
    $('#' + currentVideo.videoID).addClass('active');

    Player.self.loadVideoById({
      videoId: currentVideo.videoID,
      startSeconds: currentVideo.startAt || 0,
      suggestedQuality: (User.hd ? 'hd1080' : 'default')
    });

    Player.checkPlayerStatus();

    // if the user is in djing we need to update the
    // connected listeners of the video change
    if (Playlist.djMode && Playlist.djMode.broadcasting) {
      Playlist.djMode.updateBroadcast(currentVideo.videoTitle, currentVideo.videoID, 0);
    }

    History.update();
  },

  throttlePersistSort: function () {
    clearTimeout(Playlist.sortThrottler);
    Playlist.sortThrottler = setTimeout(Playlist.persistSort, 5000);
  },

  sortVideos: function () {
    var positions           = [];
    var currentPlayingVideo = Playlist.videos[Playlist.currentTrack].videoID;

    $('#playlist li').each(function (index, item) {
      positions.push({
        track_number: index,
        videoID:      $(item).data('videoId'),
        videoTitle:   $(item).data('videoTitle')
      });

      if ($(item).data('videoId') == currentPlayingVideo) {
        Playlist.currentTrack = index;
      }
    });

    Playlist.videos = positions;

    if (Playlist.options.persistentSorting) {
      Playlist.throttlePersistSort();
    }
  },

  persistSort: function () {
    $.ajax({
      type:         'POST',
      url:          '/' + User.username + '/playlist/' + Playlist.options.customPlaylistName + '/sort',
      dataType:     'json',
      contentType:  'application/json',
      data:         JSON.stringify({tracks: Playlist.videos})
    });
  },

  removeVideo: function (videoID) {
    if (User.id) {
      if (User.username == Playlist.options.customPlaylistOwner) {
        $.ajax({
          type: 'POST',
          url: '/playlist/delete_video',
          data: {
            playlist_name:  Playlist.options.customPlaylistName,
            video_id:       videoID
          },
          dataType: 'json',
          success: function (data) { }
        });
      }
      else {
        $.ajax({
          type: 'POST',
          url: '/api/ban_video',
          data: {
            video_id: videoID
          },
          dataType: 'json',
          success: function (data) {
            User.bannedVideos.push(videoID);
          }
        });
      }
    }

    $("#playlist #" + videoID).parent().remove();

    var videoIndex = findIndexByKeyValue(Playlist.videos,'videoID', videoID);

    Playlist.sortVideos();

    if (Playlist.videos.length == 0) {
      Player.self.stopVideo();
      $('#player').fadeOut();
      $('#empty-playlist').fadeIn();
    }
    else if (videoIndex == Playlist.currentTrack) {
      Playlist.nextSong("keepCurrentTrack");
    }
  },

  shareOnTwitter: function () {
    var url     = "http://twitter.com/share?text=I%27m%20listening%20to%20";
    var search  = "";

    switch (Playlist.options.searchType) {
      case 'genre':
      case 'just':
        search = Playlist.options.search.replace(/[ +]/g,"%20");
        url += search + '%20on%20%40tubalr%21&url=http%3A%2F%2Ftubalr.com';
        url += '%2Fjust%2F' + search.replace(/%20/g, '%2B');
        break;
      case 'dj':
        search = Playlist.options.djUsername;
        url += search + '%20DJ%20on%20%40tubalr%21&url=http%3A%2F%2Ftubalr.com';
        url += '%2Fdj%2F' + search;
        break;
      case 'similar':
        search = Playlist.options.search.replace(/[ +]/g,"%20");
        url += 'artists%2Fbands%20similar%20to%20' + search + '%20on%20%40tubalr%21&url=http%3A%2F%2Ftubalr.com';
        url += '%2Fsimilar%2F' + search.replace(/%20/g,'%2B');
        break;
      case 'customPlaylist':
        search = Playlist.options.customPlaylistName.replace(/[ +]/g,'%20');
        var tubalrURL = "http://tubalr.com/"+Playlist.options.customPlaylistOwner+"/playlist/"+Playlist.options.customPlaylistName;
        url += search + '%20on%20%40tubalr%21&url='+encodeURIComponent(tubalrURL);
        break;
      case 'video':
        url += Playlist.videos[Playlist.currentTrack].videoTitle.replace(/[ +]/g,"%20") + '%20on%20%40tubalr%21&url=http%3A%2F%2Ftubalr.com';
        url += '%2Fvideo%2F' + Playlist.videos[Playlist.currentTrack].videoID;
        break;
      case 'subreddit':
        url += '%2Fr%2F' + Playlist.options.subReddit + '%20on%20%40tubalr%21&url=http%3A%2F%2Ftubalr.com';
        url += '%2Fr%2F' + Playlist.options.subReddit;
        break;
    }

    var opts = 'status=1'     +
               ',width=575'   +
               ',height=400'  +
               ',top='        + ($(window).height() - 400)  / 2  +
               ',left='       + ($(window).width()  - 575)  / 2;

    window.open(url, 'twitter', opts);
  },

  shareOnFacebook: function () {
    var url       = "http://www.tubalr.com/";
    var shareText = "";

    if (Playlist.options.searchType == "subreddit") {
      url += "r/" + Playlist.options.subReddit;
      shareText += "/r/" + Playlist.options.subReddit;
    }
    else if (Playlist.options.djUsername) {
      url += "dj/" + Playlist.options.djUsername;
      shareText += "I'm listening to " + Playlist.options.djUsername + " DJ";
    }
    else if (Playlist.options.search) {
      if (Playlist.options.searchType == "similar") {
        shareText += "Artists/Bands similar to ";
      }
      else {
        shareText += "I'm listening to ";
        url += "just/";
      }

      url += Playlist.options.search.replace(/ /g,"%20");
      shareText += unescape(Playlist.options.search.replace(/[+]/g," "));
    }
    else if (Playlist.options.videoID) {
      url += "video/" + Playlist.videos[Playlist.currentTrack].videoID;
      shareText += unescape(Playlist.videos[Playlist.currentTrack].videoTitle.replace(/[+]/g," "));
    }
    else if (Playlist.options.customPlaylistOwner) {
      url += Playlist.options.customPlaylistOwner.replace(/ /g,"%20") + "/playlist/" + Playlist.options.customPlaylistName.replace(/ /g,"%20");
      shareText += unescape(Playlist.options.customPlaylistName.replace(/[+]/g," "));
    }

    shareText += ", on tubalr!";

    FB.ui({
        method: 'stream.publish',
        attachment: {
          name: shareText,
          href: url,
          description: ("Tubalr allows you to effortlessly listen to a band's or artist's top YouTube videos without all the clutter YouTube brings.")
        },
        display: 'popup'
      },
      function (response) {
      }
    );
  },

  name: function() {
    if (this.options.subReddit) {
      return "/r/"+this.options.subReddit;
    }
    else if (this.options.customPlaylistName) {
      return "playlist " + this.options.customPlaylistName + " by " + this.options.customPlaylistOwner;
    }
    else if (Playlist.options.videoID) {
      return "video " + Playlist.videos[Playlist.currentTrack].videoTitle;
    }
    // just x, similar x, genre x
    return this.options.searchType + " " + this.options.search;
  }
};

$(document).ready(function () {

  $('#listenForm input[type=button]').click(function () {
    if ($('#q').val() != "") {
      Playlist.init({
        search:     $('#q').val(),
        searchType: $(this).attr('name')
      });
    }
  });

  $('input#q').keypress(function (e) {
    var code = (e.keyCode ? e.keyCode : e.which);

    if (code == 13 && $('#q').val() != "") {
      Playlist.init({
        search:     $('#q').val(),
        searchType: 'just'
      });
    }
  });

  $('.remove-video').live('click', function (e) {
    e.stopImmediatePropagation();
    Playlist.removeVideo($(this).next().attr('id'));
    return false;
  });

  $('#next').click(function () {
    Playlist.nextSong();
    return false;
  });

  $('#pause').click(function () {
    Player.self.pauseVideo();
    return false;
  });

  $('#play').click(function () {
    Player.self.playVideo();
    return false;
  });

  $('#previous').click(function () {
    Playlist.previousSong();
    return false;
  });

  $('#playlist').delegate('a', 'click', function () {
    Playlist.jumpToSong($(this).index('#playlist a'));
  });

  $('#share-on-twitter').click(function () {
    Playlist.shareOnTwitter();
  });

  $('#share-on-facebook').click(function () {
    Playlist.shareOnFacebook();
  });

  $('#playlist').sortable({
    receive: Playlist.sortVideos,
    stop: Playlist.sortVideos,
    helper: 'clone'
  });

  $('.shuffle').click(function () {
    Playlist.shuffle();
    return false;
  });

});
