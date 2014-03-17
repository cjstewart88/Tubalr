var Playlist = {

  genres: ["a cappella", "acid house", "acid jazz", "acousmatic", "acoustic blues", "african rock", "afrobeat", "afrobeats", "aggrotech", "albanian pop", "album rock", "alternative country", "alternative dance", "alternative emo", "alternative hip hop", "alternative metal", "alternative rock", "ambient", "ambient idm", "andean", "anti-folk", "arab pop", "argentine rock", "art rock", "atmospheric black metal", "atmospheric post rock", "australian alternative rock", "australian hip hop", "avant-garde", "avant-garde jazz", "avantgarde metal", "azonto", "bachata", "baile funk", "balearic", "balkan brass", "banda", "bangla", "barbershop", "baroque", "basque rock", "bass music", "beatdown", "bebop", "belgian rock", "bhangra", "big band", "big beat", "black death", "black metal", "bluegrass", "blues", "blues-rock", "bolero", "boogaloo", "boogie-woogie", "bossa nova", "bounce", "bouncy house", "brass band", "brazilian gospel", "brazilian hip hop", "brazilian pop music", "brazilian punk", "breakbeat", "breakcore", "breaks", "brill building pop", "british blues", "british folk", "british invasion", "britpop", "broken beat", "brutal death metal", "brutal deathcore", "bubblegum dance", "bubblegum pop", "c-pop", "c86", "cabaret", "calypso", "canadian indie", "canadian pop", "canterbury scene", "cantopop", "capoeira", "ccm", "cello", "celtic", "celtic rock", "chalga", "chamber pop", "chanson", "chaotic hardcore", "chicago blues", "chicago house", "chicago soul", "chicano rap", "children's music", "chilean rock", "chill-out", "chillwave", "chinese indie rock", "chinese traditional", "chiptune", "choral", "choro", "christian alternative rock", "christian dance", "christian hardcore", "christian hip hop", "christian metal", "christian music", "christian punk", "christian rock", "classic chinese pop", "classic funk rock", "classic garage rock", "classic rock", "classic russian rock", "classical", "classical guitar", "classical period", "classical piano", "comedy", "comic", "contemporary country", "contemporary jazz", "contemporary post-bop", "cool jazz", "country", "country blues", "country gospel", "country rock", "cowpunk", "crossover thrash", "crunk", "crust punk", "cuban rumba", "cumbia", "current", "czech folk", "dance pop", "dance rock", "dance-punk", "dancehall", "dangdut", "danish pop", "dark ambient", "dark black metal", "dark wave", "death core", "death metal", "deathgrind", "deep house", "deeper house", "delta blues", "desi", "detroit techno", "digital hardcore", "dirty south rap", "disco", "disco house", "discovery", "djent", "doo-wop", "doom metal", "downtempo", "downtempo fusion", "dream pop", "drill and bass", "drone", "drum and bass", "drumfunk", "dub", "dub techno", "dubstep", "dutch pop", "dutch rock", "early music", "east coast hip hop", "easy listening", "ebm", "electric blues", "electro", "electro house", "electro swing", "electro trash", "electro-industrial", "electroclash", "electronic", "emo", "enka", "entehno", "estonian pop", "ethereal wave", "ethiopian pop", "eurobeat", "eurodance", "europop", "exotica", "experimental", "experimental rock", "fado", "fallen angel", "faroese pop", "filmi", "filthstep", "finnish hardcore", "flamenco", "folk", "folk metal", "folk punk", "folk rock", "folk-pop", "footwork", "forro", "fourth world", "freak folk", "freakbeat", "free improvisation", "free jazz", "freestyle", "french hip hop", "french rock", "funeral doom", "funk", "funk metal", "funk rock", "future garage", "futurepop", "g funk", "gabba", "gamelan", "gangster rap", "garage rock", "german hip hop", "german pop", "german punk", "glam metal", "glam rock", "glitch", "glitch hop", "goregrind", "gospel", "gothic americana", "gothic metal", "gothic rock", "gothic symphonic metal", "grave wave", "grime", "grindcore", "groove metal", "grunge", "guidance", "gypsy jazz", "hands up", "happy hardcore", "hard alternative", "hard bop", "hard glam", "hard house", "hard rock", "hard trance", "hardcore", "hardcore hip hop", "hardcore punk", "hardcore techno", "hardstyle", "harmonica blues", "harp", "hawaiian", "hi nrg", "highlife", "hip hop", "hip house", "hiplife", "horror punk", "hot", "house", "hungarian pop", "hyphy", "icelandic pop", "illbient", "indian classical", "indian pop", "indie folk", "indie pop", "indie rock", "indietronica", "indonesian pop", "industrial", "industrial metal", "industrial rock", "intelligent dance music", "irish folk", "israeli rock", "italian disco", "italian indie pop", "italian pop", "j-alt", "j-metal", "j-pop", "j-punk", "j-rap", "j-rock", "jam band", "jangle pop", "japanese psychedelic", "japanoise", "jazz", "jazz blues", "jazz funk", "jazz fusion", "jazz metal", "jazz orchestra", "judaica", "jug band", "juggalo", "jump blues", "jump up", "jungle", "k-indie", "k-pop", "k-rock", "kiwi rock", "kizomba", "klezmer", "kompa", "kraut rock", "kuduro", "kwaito", "laiko", "latin", "latin alternative", "latin jazz", "latin metal", "latin pop", "latvian pop", "lilith", "liquid funk", "lithumania", "lo-fi", "louisiana blues", "lounge", "lovers rock", "luk thung", "madchester", "makossa", "malagasy folk", "malaysian pop", "mambo", "mande pop", "mandopop", "manele", "marching band", "mariachi", "martial industrial", "math pop", "math rock", "mathcore", "mbalax", "medieval", "meditation", "mellow gold", "melodic death metal", "melodic hard rock", "melodic hardcore", "melodic metalcore", "memphis blues", "memphis soul", "merengue", "merseybeat", "metal", "metalcore", "mexican son", "microhouse", "minimal", "minimal techno", "modern blues", "modern classical", "moombahton", "motown", "mpb", "musique concrete", "nashville sound", "native american", "neo classical metal", "neo soul", "neo-industrial rock", "neo-progressive", "neo-psychedelic", "neo-singer-songwriter", "neo-synthpop", "neo-trad metal", "neoclassical", "neofolk", "neue deutsche harte", "neue deutsche welle", "neurofunk", "new age", "new beat", "new jack swing", "new orleans blues", "new orleans jazz", "new rave", "new romantic", "new wave", "new weird america", "ninja", "no wave", "noise pop", "noise rock", "nordic folk", "northern soul", "norwegian jazz", "norwegian pop", "nu age", "nu disco", "nu gaze", "nu jazz", "nu metal", "nu skool breaks", "nueva cancion", "nwobhm", "oi", "old school hip hop", "old-time", "opera", "operatic pop", "opm", "oratory", "orchestral", "orgcore", "outlaw country", "pagan black metal", "pagode", "persian pop", "peruvian rock", "piano blues", "piano rock", "piedmont blues", "pipe band", "poetry", "polish hip hop", "polish pop", "polka", "pop", "pop emo", "pop punk", "pop rap", "pop rock", "portuguese rock", "post rock", "post-disco", "post-grunge", "post-hardcore", "post-metal", "post-post-hardcore", "post-punk", "power blues-rock", "power electronics", "power metal", "power noise", "power pop", "power violence", "power-pop punk", "progressive bluegrass", "progressive house", "progressive metal", "progressive psytrance", "progressive rock", "progressive trance", "protopunk", "psych gaze", "psychedelic rock", "psychedelic trance", "psychill", "psychobilly", "punjabi", "punk", "punk blues", "qawwali", "quebecois", "quiet storm", "r&b", "ragtime", "rai", "ranchera", "rap", "rap metal", "rap rock", "reggae", "reggae rock", "reggaeton", "renaissance", "retro metal", "riot grrrl", "rock", "rock 'n roll", "rock en espanol", "rock steady", "rockabilly", "romantic", "roots reggae", "roots rock", "rumba", "russian pop", "russian punk", "russian rock", "salsa", "samba", "schlager", "schranz", "screamo", "sega", "serialism", "sertanejo", "sexy", "shibuya-kei", "shimmer pop", "shimmer psych", "shoegaze", "show tunes", "singer-songwriter", "ska", "ska punk", "skate punk", "skiffle", "skweee", "slovak pop", "slovenian rock", "slow core", "sludge metal", "smooth jazz", "soca", "soft rock", "soukous", "soul", "soul blues", "soul jazz", "soundtrack", "south african jazz", "southern gospel", "southern hip hop", "southern rock", "southern soul", "space rock", "spanish hip hop", "spanish indie pop", "spanish pop", "speed garage", "speed metal", "speedcore", "steampunk", "stoner metal", "stoner rock", "straight edge", "stride", "string quartet", "suomi rock", "surf music", "swamp blues", "swedish hip hop", "swedish indie pop", "swedish pop", "swing", "swiss rock", "symphonic black metal", "symphonic metal", "symphonic rock", "synthpop", "taiwanese pop", "talent show", "tango", "tech house", "technical death metal", "techno", "teen pop", "tejano", "tekno", "texas blues", "texas country", "thai pop", "thrash core", "thrash metal", "throat singing", "tin pan alley", "traditional blues", "traditional country", "traditional folk", "trance", "trap music", "trapstep", "tribal house", "trip hop", "turbo folk", "turkish pop", "turntablism", "twee pop", "uk garage", "uk post-punk", "ukrainian rock", "underground hip hop", "underground rap", "uplifting trance", "urban contemporary", "vallenato", "vaporwave", "venezuelan rock", "video game music", "vienna indie", "vietnamese pop", "viking metal", "viral pop", "visual kei", "vocal house", "vocal jazz", "volksmusik", "warm drone", "west coast rap", "western swing", "wind ensemble", "wonky", "world", "worship", "ye ye", "yugoslav rock", "zeuhl", "zim", "zouglou", "zouk", "zydeco"],

  currentTrack: 0,

  videos: [],

  direction: 'forward',

  sortThrottler: null,

  reportUpdateNowPlayingThrottler: null,

  options: {
    search:               null,
    searchType:           null,
    customPlaylistOwner:  null,
    customPlaylistName:   null,
    persistentSorting:    false,
    videoID:              null,
    subReddit:            null
  },

  init: function (options) {
    Playlist.reset(function () {
      $.extend(Playlist.options, options);

      if (Playlist.options.search) {
        Playlist.determineIfSpecialSearch();
      }

      Report.gaPageview();

      Playlist[Playlist.options.searchType]();
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
    Playlist.options.customPlaylistOwner  = null;
    Playlist.options.customPlaylistName   = null;
    Playlist.options.persistentSorting    = false;
    Playlist.options.videoID              = null;
    Playlist.options.subReddit            = null;

    $('#empty-playlist').hide();
    $('.remove-when-searching').fadeOut(function () {
      if ($('#player').css('display') == "none") {
        $('#loading').fadeIn(callback);
      }
      else {
        $('#player').fadeOut(function () {
          $('#loading').fadeIn(callback);
        });
      }
    });
  },

  determineIfSpecialSearch: function () {
    var search = Playlist.options.search;

    if (Playlist.genres.indexOf(search.replace(/[+]/g, '')) != -1) {
      Playlist.options.searchType = 'genre';
    }
    else if (search.match('/r/') != null) {
      Playlist.options.searchType = 'subreddit';
      Playlist.options.subReddit = search.replace('/r/', '');
    }
  },

  just: function () {
    var search = Playlist.options.search;

    $.getJSON('http://developer.echonest.com/api/v4/artist/songs?api_key=OYJRQNQMCGIOZLFIW&name=' + encodeURIComponent(search) + '&format=jsonp&callback=?&start=0&results=40' , function (data) {
      if (data.response.status.code == 5 || data.response.songs.length <= 10) {
        Playlist.youtube();
      }
      else {
        var ajaxs = [];

        $.each(data.response.songs, function (i, track) {
          ajaxs.push(
            $.getJSON('http://gdata.youtube.com/feeds/api/videos?q=' + escape(search) + '%20%2D%20' + escape(track.title) + '&orderby=relevance&start-index=1&max-results=10&v=2&format=5&alt=json-in-script&callback=?', function (data) {
              var video = Video.determineBestVideo(data.feed.entry, Playlist.videos);
              if (video) {
                Playlist.videos.push(video);
              }
            })
          )
        });

        $.when.apply($, ajaxs).then(Playlist.resultsReady);
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
              var video = Video.determineBestVideo(data.feed.entry, Playlist.videos);
              if (video) {
                Playlist.videos.push(video);
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

  youtube: function () {
    var search = Playlist.options.search;
    var videos = Playlist.videos;

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

      Playlist.resultsReady();
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
    //don't randomly sort a user playlist.
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

    History.update();

    clearTimeout(Playlist.reportUpdateNowPlayingThrottler);
    Playlist.reportUpdateNowPlayingThrottler = setTimeout(function () {
      Report.lastfmAction('update_now_playing');
    }, 10000);
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
        url += search + '%20on%20tubalr%21&url=http%3A%2F%2Ftubalr.com';
        url += '%2Fjust%2F' + search.replace(/%20/g, '%2B');
        break;
      case 'similar':
        search = Playlist.options.search.replace(/[ +]/g,"%20");
        url += 'artists%2Fbands%20similar%20to%20' + search + '%20on%20tubalr%21&url=http%3A%2F%2Ftubalr.com';
        url += '%2Fsimilar%2F' + search.replace(/%20/g,'%2B');
        break;
      case 'customPlaylist':
        search = Playlist.options.customPlaylistName.replace(/[ +]/g,'%20');
        var tubalrURL = "http://tubalr.com/"+Playlist.options.customPlaylistOwner+"/playlist/"+Playlist.options.customPlaylistName;
        url += search + '%20on%20tubalr%21&url='+encodeURIComponent(tubalrURL);
        break;
      case 'video':
        url += Playlist.videos[Playlist.currentTrack].videoTitle.replace(/[ +]/g,"%20") + '%20on%20tubalr%21&url=http%3A%2F%2Ftubalr.com';
        url += '%2Fvideo%2F' + Playlist.videos[Playlist.currentTrack].videoID;
        break;
      case 'subreddit':
        url += '%2Fr%2F' + Playlist.options.subReddit + '%20on%20tubalr%21&url=http%3A%2F%2Ftubalr.com';
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
    else if (Playlist.options.search) {
      if (Playlist.options.searchType == "similar") {
        shareText += "Artists/Bands similar to ";
        url += "similar/";
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
    else {
      // just x, similar x, genre x
      return this.options.searchType + " " + this.options.search;
    }
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
