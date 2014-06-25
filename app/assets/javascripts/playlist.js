var Playlist = {

  genres: ["a cappella", "abstract hip hop", "accordion", "acid house", "acid jazz", "acid techno", "acousmatic", "acoustic blues", "acoustic pop", "adult album alternative", "adult standards", "african percussion", "african rock", "afrikaans", "afrobeat", "afrobeats", "aggrotech", "albanian pop", "album rock", "alternative americana", "alternative country", "alternative dance", "alternative emo", "alternative hip hop", "alternative metal", "alternative metalcore", "alternative new age", "alternative pop", "alternative pop rock", "alternative r&b", "alternative rock", "ambeat", "ambient", "ambient dub techno", "ambient fusion", "ambient idm", "andean", "anime", "anime score", "anti-folk", "arab folk", "arab pop", "argentine rock", "armenian folk", "art rock", "athens indie", "atmospheric black metal", "atmospheric post rock", "atmospheric post-metal", "austindie", "australian alternative rock", "australian hip hop", "australian indie", "australian pop", "austropop", "avant-garde", "avant-garde jazz", "avantgarde metal", "axe", "azonto", "bachata", "baile funk", "balearic", "balkan brass", "banda", "bangla", "barbershop", "baroque", "basque rock", "bass music", "beach music", "beatdown", "bebop", "belgian indie", "belgian rock", "belly dance", "bemani", "benga", "bhangra", "big band", "big beat", "black death", "black metal", "black sludge", "bluegrass", "blues", "blues-rock", "bolero", "boogaloo", "boogie-woogie", "bossa nova", "boston rock", "bounce", "bouncy house", "brass band", "brass ensemble", "brazilian gospel", "brazilian hip hop", "brazilian indie", "brazilian pop music", "brazilian punk", "breakbeat", "breakcore", "breaks", "brega", "breton folk", "brill building pop", "british alternative rock", "british blues", "british dance band", "british folk", "british indie rock", "british invasion", "britpop", "broken beat", "brostep", "brutal death metal", "brutal deathcore", "bubble trance", "bubblegum dance", "bubblegum pop", "bulgarian rock", "c-pop", "c64", "c86", "cabaret", "calypso", "canadian indie", "canadian pop", "cantautor", "cante flamenco", "canterbury scene", "cantopop", "capoeira", "carnatic", "ccm", "ceilidh", "cello", "celtic", "celtic christmas", "celtic punk", "celtic rock", "chalga", "chamber pop", "chanson", "chaotic black metal", "chaotic hardcore", "charred death", "chicago blues", "chicago house", "chicago indie", "chicago soul", "chicano rap", "children's music", "chilean rock", "chill lounge", "chill-out", "chill-out trance", "chillwave", "chinese indie rock", "chinese traditional", "chiptune", "choral", "choro", "chr", "christian alternative rock", "christian christmas", "christian dance", "christian hardcore", "christian hip hop", "christian metal", "christian music", "christian punk", "christian rock", "christmas", "christmas product", "cinematic dubstep", "classic afrobeat", "classic belgian pop", "classic chinese pop", "classic danish pop", "classic eurovision", "classic finnish pop", "classic finnish rock", "classic french pop", "classic funk rock", "classic garage rock", "classic italian pop", "classic norwegian pop", "classic polish pop", "classic psychedelic rock", "classic rock", "classic russian rock", "classic schlager", "classic soundtrack", "classic swedish pop", "classical", "classical christmas", "classical guitar", "classical organ", "classical period", "classical piano", "colombian rock", "comedy", "comic", "commons", "complextro", "concert piano", "contemporary classical", "contemporary country", "contemporary folk", "contemporary jazz", "contemporary post-bop", "cool jazz", "corrosion", "country", "country blues", "country christmas", "country gospel", "country rock", "coupe decale", "coverchill", "covertrance", "cowpunk", "crack rock steady", "croatian pop", "crossover prog", "crossover thrash", "crunk", "crust punk", "cuban rumba", "cubaton", "cumbia", "cumbia funk", "cumbia villera", "current", "czech folk", "czech rock", "dallas indie", "dance pop", "dance rock", "dance-punk", "dancehall", "dangdut", "danish jazz", "danish pop", "danish pop rock", "dansband", "danseband", "dark ambient", "dark black metal", "dark cabaret", "dark electro-industrial", "dark psytrance", "dark wave", "darkstep", "death core", "death metal", "deathgrind", "deep ambient", "deep chill", "deep disco", "deep disco house", "deep euro house", "deep filthstep", "deep flow", "deep funk", "deep house", "deep italo disco", "deep liquid", "deep northern soul", "deep psytrance", "deep ragga", "deep soul house", "deep space rock", "deep tech house", "deep trap", "deeper house", "delta blues", "demoscene", "denver indie", "desert blues", "desi", "destroy techno", "detroit hip hop", "detroit techno", "didgeridoo", "digital hardcore", "dirty south rap", "dirty texas rap", "disco", "disco house", "discofox", "discovery", "djent", "doo-wop", "doom metal", "doomcore", "doujin", "downtempo", "downtempo fusion", "downtempo trip hop", "dream pop", "dreamo", "drill and bass", "drone", "drum and bass", "drumfunk", "dub", "dub techno", "dubstep", "dubstep product", "duranguense", "dutch hip hop", "dutch house", "dutch pop", "dutch rock", "e6fi", "early music", "early music ensemble", "east coast hip hop", "easy listening", "ebm", "ectofolk", "ecuadoria", "edm", "electric blues", "electro", "electro dub", "electro house", "electro jazz", "electro latino", "electro swing", "electro trash", "electro-industrial", "electroacoustic improvisation", "electroclash", "electronic", "electronica", "emo", "emo punk", "enka", "entehno", "environmental", "estonian pop", "ethereal gothic", "ethereal wave", "ethiopian pop", "eurobeat", "eurodance", "europop", "euroska", "eurovision", "exotica", "experimental", "experimental dubstep", "experimental psych", "experimental rock", "fado", "fake", "fallen angel", "faroese pop", "fast melodic punk", "filmi", "filter house", "filthstep", "fingerstyle", "finnish hardcore", "finnish hip hop", "finnish indie", "finnish jazz", "finnish pop", "flamenco", "flick hop", "folk", "folk christmas", "folk metal", "folk punk", "folk rock", "folk-pop", "folklore argentino", "folkmusik", "footwork", "forro", "fourth world", "freak folk", "freakbeat", "free improvisation", "free jazz", "freestyle", "french folk", "french folk pop", "french hip hop", "french indie pop", "french movie tunes", "french pop", "french punk", "french rock", "full on", "funeral doom", "funk", "funk metal", "funk rock", "funky breaks", "future ambient", "future garage", "futurepop", "g funk", "gabba", "gamecore", "gamelan", "gangster rap", "garage pop", "garage rock", "gbvfi", "geek folk", "geek rock", "german ccm", "german hip hop", "german indie", "german oi", "german pop", "german pop rock", "german punk", "german show tunes", "ghettotech", "girl group", "glam metal", "glam rock", "glitch", "glitch hop", "goa trance", "goregrind", "gospel", "gospel blues", "gothic alternative", "gothic americana", "gothic doom", "gothic metal", "gothic post-punk", "gothic rock", "gothic symphonic metal", "grave wave", "greek hip hop", "greek indie", "grim death metal", "grime", "grindcore", "groove metal", "grunge", "grunge pop", "grupera", "guidance", "gujarati", "gypsy jazz", "hands up", "happy hardcore", "hard alternative", "hard bop", "hard glam", "hard house", "hard rock", "hard stoner rock", "hard trance", "hardcore", "hardcore breaks", "hardcore hip hop", "hardcore punk", "hardcore techno", "hardstyle", "harmonica blues", "harp", "hatecore", "hauntology", "hawaiian", "heavy alternative", "heavy christmas", "hi nrg", "highlife", "hindustani classical", "hip hop", "hip house", "hip pop", "hiplife", "hollywood", "horror punk", "hot", "hot adult contemporary", "house", "hungarian hip hop", "hungarian pop", "hungarian rock", "hurban", "hyphy", "icelandic pop", "idol", "illbient", "indian classical", "indian pop", "indian rock", "indie christmas", "indie folk", "indie pop", "indie psych-pop", "indie rock", "indie shoegaze", "indie singer-songwriter", "indietronica", "indonesian indie", "indonesian pop", "industrial", "industrial metal", "industrial rock", "instrumental post rock", "intelligent dance music", "irish folk", "irish rock", "israeli rock", "italian disco", "italian folk", "italian hip hop", "italian indie pop", "italian pop", "italian progressive rock", "italian punk", "j-alt", "j-ambient", "j-core", "j-dance", "j-idol", "j-indie", "j-metal", "j-pop", "j-poppunk", "j-poprock", "j-punk", "j-rap", "j-rock", "j-theme", "jam band", "jangle pop", "jangle rock", "japanese jazztronica", "japanese psychedelic", "japanese r&b", "japanese standards", "japanese traditional", "japanoise", "jazz", "jazz bass", "jazz blues", "jazz christmas", "jazz funk", "jazz fusion", "jazz metal", "jazz orchestra", "jazz trio", "jerk", "judaica", "jug band", "juggalo", "jump blues", "jump up", "jungle", "k-hop", "k-indie", "k-pop", "k-rock", "kabarett", "kannada", "karneval", "kc indie", "kindermusik", "kirtan", "kiwi rock", "kizomba", "klezmer", "kompa", "kraut rock", "kuduro", "kwaito", "la indie", "laiko", "latin", "latin alternative", "latin christian", "latin christmas", "latin hip hop", "latin jazz", "latin metal", "latin pop", "latvian pop", "lds", "leeds indie", "levenslied", "liedermacher", "lilith", "liquid funk", "lithumania", "lo star", "lo-fi", "louisiana blues", "lounge", "lounge house", "lovers rock", "lowercase", "luk thung", "madchester", "maghreb", "makossa", "malagasy folk", "malayalam", "malaysian pop", "mambo", "mande pop", "mandopop", "manele", "marching band", "mariachi", "martial industrial", "mashup", "math pop", "math rock", "mathcore", "mbalax", "medieval", "medieval rock", "meditation", "mellow gold", "melodic death metal", "melodic hard rock", "melodic hardcore", "melodic metalcore", "melodic power metal", "melodic progressive metal", "memphis blues", "memphis soul", "merengue", "merengue urbano", "merseybeat", "metal", "metal guitar", "metalcore", "metropopolis", "mexican indie", "mexican rock-and-roll", "mexican son", "miami bass", "microhouse", "military band", "minimal", "minimal dub", "minimal dubstep", "minimal melodic techno", "minimal techno", "minimal wave", "mizrahi", "mod revival", "modern blues", "modern classical", "modern country rock", "modern southern rock", "modern uplift", "monastic", "moombahton", "more acoustic pop", "more adult standards", "more baroque", "more brazilian pop", "more canadian indie", "more ccm", "more classic garage rock", "more classical piano", "more comedy", "more contemporary country", "more dance pop", "more deep house", "more deeper house", "more dub techno", "more east coast hip hop", "more eurodance", "more free jazz", "more german indie", "more hardcore", "more indie pop", "more indie rock", "more indie singer-songwriter", "more jazz guitar", "more jazz piano", "more melodic death metal", "more melodic metalcore", "more motown", "more neo-synthpop", "more new wave", "more orchestral", "more pop emo", "more pop punk", "more progressive house", "more progressive trance", "more psychobilly", "more punk rock", "more regional mexican", "more smooth jazz", "more soft rock", "more soundtrack", "more southern soul", "more symphonic black metal", "more tech house", "more thrash metal", "more turkish pop", "more uplifting trance", "more vocal house", "more vocal jazz", "morna", "motown", "movie tunes", "mpb", "musica para ninos", "musique concrete", "nasheed", "nashville sound", "native american", "neo classical metal", "neo soul", "neo soul-jazz", "neo-industrial rock", "neo-pagan", "neo-progressive", "neo-psychedelic", "neo-rockabilly", "neo-singer-songwriter", "neo-synthpop", "neo-trad metal", "neo-traditional country", "neoclassical", "neofolk", "nepali", "nerdcore", "neue deutsche harte", "neue deutsche welle", "neurofunk", "neurostep", "new age", "new age piano", "new beat", "new jack swing", "new orleans blues", "new orleans jazz", "new rave", "new romantic", "new tribe", "new wave", "new weird america", "ninja", "nintendocore", "nl folk", "no wave", "noise pop", "noise punk", "noise rock", "nordic folk", "nordic house", "norteno", "northern irish indie", "northern soul", "norwegian gospel", "norwegian jazz", "norwegian pop", "norwegian rock", "nu age", "nu disco", "nu electro", "nu gaze", "nu jazz", "nu metal", "nu skool breaks", "nu-cumbia", "nueva cancion", "nursery", "nwobhm", "nwothm", "oi", "old school hip hop", "old-time", "opera", "operatic pop", "opm", "oratory", "orchestral", "organic ambient", "orgcore", "ostrock", "outer hip hop", "outlaw country", "outsider", "pagan black metal", "pagode", "pakistani pop", "persian pop", "persian traditional", "peruvian rock", "piano blues", "piano rock", "piedmont blues", "pipe band", "poetry", "polish hip hop", "polish indie", "polish jazz", "polish pop", "polish punk", "polish reggae", "polka", "polynesian pop", "pop", "pop christmas", "pop emo", "pop house", "pop punk", "pop rap", "pop rock", "portland indie", "portuguese rock", "post rock", "post-disco", "post-disco soul", "post-grunge", "post-hardcore", "post-metal", "post-post-hardcore", "post-punk", "power blues-rock", "power electronics", "power metal", "power noise", "power pop", "power violence", "power-pop punk", "progressive alternative", "progressive bluegrass", "progressive electro house", "progressive house", "progressive metal", "progressive psytrance", "progressive rock", "progressive trance", "progressive uplifting trance", "protopunk", "psych gaze", "psychedelic blues-rock", "psychedelic rock", "psychedelic trance", "psychill", "psychobilly", "pub rock", "puerto rican rock", "punjabi", "punk", "punk blues", "punk christmas", "qawwali", "quebecois", "quiet storm", "r&b", "r-neg-b", "ragga jungle", "ragtime", "rai", "ranchera", "rap", "rap metal", "rap metalcore", "rap rock", "raw black metal", "re:techno", "reading", "rebetiko", "reggae", "reggae fusion", "reggae rock", "reggaeton", "regional mexican", "relaxative", "remix", "renaissance", "retro metal", "riddim", "riot grrrl", "rock", "rock catala", "rock en espanol", "rock gaucho", "rock noise", "rock steady", "rock-and-roll", "rockabilly", "romanian pop", "romantic", "roots reggae", "roots rock", "rumba", "russian hip hop", "russian pop", "russian punk", "russian rock", "salsa", "samba", "schlager", "schranz", "scorecore", "scottish rock", "screamo", "screamo punk", "screamocore", "seattle indie", "sega", "serialism", "sertanejo", "sertanejo tradicional", "sertanejo universitario", "sevdah", "sexy", "shibuya-kei", "shimmer pop", "shimmer psych", "shiver pop", "shoegaze", "show tunes", "singer-songwriter", "ska", "ska punk", "skate punk", "skiffle", "skinhead reggae", "skweee", "slam death metal", "slash punk", "sleaze rock", "slovak hip hop", "slovak pop", "slovenian rock", "slow core", "sludge metal", "smooth jazz", "soca", "soft rock", "soukous", "soul", "soul blues", "soul christmas", "soul flow", "soul jazz", "soundtrack", "south african jazz", "southern gospel", "southern hip hop", "southern rock", "southern soul", "space rock", "spanish folk", "spanish hip hop", "spanish indie pop", "spanish indie rock", "spanish pop", "spanish punk", "speed garage", "speed metal", "speedcore", "spoken word", "spytrack", "steampunk", "stl indie", "stomp and flutter", "stomp and holler", "stomp pop", "stoner metal", "stoner rock", "straight edge", "street punk", "stride", "string quartet", "sunset lounge", "suomi rock", "surf music", "swamp blues", "swedish hip hop", "swedish indie pop", "swedish indie rock", "swedish jazz", "swedish pop", "swedish pop punk", "swedish punk", "swedish soft pop", "swing", "swiss folk", "swiss hip hop", "swiss rock", "symphonic black metal", "symphonic metal", "symphonic rock"],

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
        url += search + '%20on%20%40tubalr%21&url=http%3A%2F%2Fwww.tubalr.com';
        url += '%2Fjust%2F' + search.replace(/%20/g, '%2B');
        break;
      case 'similar':
        search = Playlist.options.search.replace(/[ +]/g,"%20");
        url += 'artists%2Fbands%20similar%20to%20' + search + '%20on%20%40tubalr%21&url=http%3A%2F%2Fwww.tubalr.com';
        url += '%2Fsimilar%2F' + search.replace(/%20/g,'%2B');
        break;
      case 'customPlaylist':
        search = Playlist.options.customPlaylistName.replace(/[ +]/g,'%20');
        var tubalrURL = "http://www.tubalr.com/"+Playlist.options.customPlaylistOwner+"/playlist/"+Playlist.options.customPlaylistName;
        url += search + '%20on%20%40tubalr%21&url='+encodeURIComponent(tubalrURL);
        break;
      case 'video':
        url += Playlist.videos[Playlist.currentTrack].videoTitle.replace(/[ +]/g,"%20") + '%20on%20%40tubalr%21&url=http%3A%2F%2Fwww.tubalr.com';
        url += '%2Fvideo%2F' + Playlist.videos[Playlist.currentTrack].videoID;
        break;
      case 'subreddit':
        url += '%2Fr%2F' + Playlist.options.subReddit + '%20on%20%40tubalr%21&url=http%3A%2F%2Fwww.tubalr.com';
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

  $('#search-for-music-form input[type=button]').click(function () {
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
