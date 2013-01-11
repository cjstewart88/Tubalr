var Playlist = {                                                                                                                                                                                                                                                                       

  genres: ["acappella","acidhouse","acidjazz","acousticblues","afrobeat","albumrock","alternativecountry","alternativedance","alternativehiphop","alternativemetal","alternativerock","ambient","anti-folk","artrock","atmosphericblackmetal","australianhiphop","avant-garde","avant-gardejazz","avantgardemetal","bachata","bailefunk","banda","bassmusic","bebop","bhangra","bigband","bigbeat","blackmetal","blue-eyedsoul","bluegrass","blues","blues-rock","bolero","boogaloo","boogie-woogie","bossanova","brassband","brazilianpopmusic","breakbeat","breakcore","brillbuildingpop","britishblues","britishfolk","britishinvasion","britishpop","brokenbeat","brutaldeathmetal","bubblegumdance","bubblegumpop","cabaret","calypso","canterburyscene","ccm","celtic","celticrock","chamberpop","chanson","chicagoblues","chicagohouse","chicagosoul","children'smusic","chill-out","chillwave","chiptune","choro","chorus","christianalternativerock","christianhardcore","christianhiphop","christianmetal","christianmusic","christianpunk","christianrock","classicrock","classical","comedy","contemporarycountry","cooljazz","country","countryblues","countrygospel","countryrock","cowpunk","crossoverthrash","crunk","crustpunk","cumbia","dancepop","dancerock","dance-punk","dancehall","darkambient","darkwave","deathcore","deathmetal","deathgrind","deephouse","deltablues","desi","detroittechno","digitalhardcore","dirtysouthrap","disco","discohouse","djent","doo-wop","doommetal","downtempo","dreampop","drone","drumandbass","dub","dubstep","earlymusic","eastcoasthiphop","easylistening","ebm","electricblues","electro","electro-industrial","electroclash","electronic","emo","eurobeat","eurodance","europop","exotica","experimental","experimentalrock","fado","filmi","flamenco","folk","folkmetal","folkpunk","folkrock","folk-pop","freakfolk","freakbeat","freeimprovisation","freejazz","freestyle","funeraldoom","funk","funkmetal","funkrock","futurepop","gfunk","gabba","game","gangsterrap","garagerock","germanpop","glammetal","glamrock","glitch","goregrind","gospel","gothicmetal","gothicrock","gothicsymphonicmetal","grime","grindcore","groovemetal","grunge","gypsyjazz","happyhardcore","hardbop","hardhouse","hardrock","hardtrance","hardcore","hardcorehiphop","hardcoretechno","hardstyle","harmonicablues","hinrg","highlife","hiphop","hiphouse","horrorpunk","house","hyphy","icelandicpop","illbient","indianclassical","indiefolk","indiepop","indierock","indietronica","industrial","industrialmetal","industrialrock","intelligentdancemusic","irishfolk","italiandisco","jpop","jrock","jamband","janglepop","japanoise","jazz","jazzblues","jazzfunk","jazzfusion","judaica","jugband","juggalo","jumpblues","junglemusic","kpop","kiwirock","klezmer","kompa","krautrock","kwaito","laiko","latin","latinalternative","latinjazz","latinpop","lo-fi","louisianablues","lounge","loversrock","madchester","mambo","mariachi","martialindustrial","mathrock","mathcore","medieval","mellowgold","melodicdeathmetal","melodichardcore","melodicmetalcore","memphisblues","memphissoul","merengue","merseybeat","metal","metalcore","minimal","modernblues","modernclassical","motown","mpb","musiqueconcrete","nashvillesound","nativeamerican","neoclassicalmetal","neosoul","neo-progressive","neoclassical","neofolk","neuedeutscheharte","newage","newbeat","newjackswing","neworleansblues","neworleansjazz","newrave","newromantic","newwave","newweirdamerica","ninja","nowave","noisepop","noiserock","northernsoul","nujazz","numetal","nuskoolbreaks","nwobhm","oi","oldschoolhiphop","opera","oratory","outlawcountry","paganblackmetal","pianoblues","pianorock","piedmontblues","polka","pop","poppunk","poprap","poprock","portugueserock","postrock","post-grunge","post-hardcore","post-metal","post-punk","powerelectronics","powermetal","powernoise","powerpop","powerviolence","progressivebluegrass","progressivehouse","progressivemetal","progressiverock","progressivetrance","protopunk","psychedelicrock","psychedelictrance","psychobilly","punk","punkblues","quietstorm","r&b","ragtime","rai","ranchera","rap","rapmetal","raprock","reggae","reggaeton","renaissance","rock","rock'nroll","rockenespanol","rocksteady","rockabilly","rootsreggae","rootsrock","rumba","salsa","samba","screamo","sexy","shibuya-kei","shoegaze","showtunes","singer-songwriter","ska","skapunk","skatepunk","skiffle","slovenianrock","slowcore","sludgemetal","smoothjazz","soca","softrock","soukous","soul","soulblues","souljazz","soundtrack","southerngospel","southernhiphop","southernrock","southernsoul","spacerock","speedgarage","speedmetal","speedcore","stonermetal","stonerrock","straightedge","stride","suomirock","surfmusic","swampblues","swing","symphonicblackmetal","symphonicmetal","symphonicrock","synthpop","tango","techhouse","technicaldeathmetal","techno","teenpop","tejano","texasblues","texascountry","thaipop","thrashcore","thrashmetal","traditionalblues","traditionalcountry","traditionalfolk","trance","tribalhouse","triphop","turbofolk","turntablism","tweepop","ukgarage","undergroundhiphop","upliftingtrance","urbancontemporary","vallenato","videogamemusic","vikingmetal","visualkei","vocalhouse","vocaljazz","westcoastrap","westernswing","world","worship","zouk","zydeco"],
  
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
    if (Player.self) { 
      Player.self.stopVideo(); 
    }

    Playlist.videos = [];
    Playlist.currentTrack = 0;
    Playlist.direction = 'forward';
    Playlist.options.customPlaylistOwner = null;
    Playlist.options.customPlaylistName = null;
    Playlist.options.persistentSorting = false;
    Playlist.options.videoID = null;
    Playlist.options.subReddit = null;

    $('.remove-when-searching').fadeOut();
    $('#player').fadeOut();
    $('#empty-playlist').fadeOut();
    $('#playlist-message').text('Loading...').fadeIn();
  },

  report: function () {
    Report.gaPageview();

    if (Playlist.options.searchType != 'video') {
      Report.event({
        event: Playlist.options.searchType,
        query: Playlist.options.search || Playlist.options.subReddit || Playlist.options.djUsername || null,
        playlist_name: Playlist.options.customPlaylistName,
        playlist_owner: Playlist.options.customPlaylistOwner
      });
    }
  },

  determineIfSpecialSearch: function () {
    var search = Playlist.options.search;

    if (Playlist.genres.indexOf(search.replace(/[ +]/g, '')) != -1) {
      Playlist.options.searchType = 'genre';
    }
    else if (search.match('/r/') != null) {
      Playlist.options.searchType = 'reddit';
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
      videoID: videoId,
      videoTitle: title,
      startAt: videoAt
    }];

    Playlist.resultsReady();
  },

  just: function () {
    var search = Playlist.options.search;
    
    var numberOfSongs = (Playlist.options.searchType == 'just' ? 40 : 20);

    $.getJSON('http://developer.echonest.com/api/v4/artist/songs?api_key=OYJRQNQMCGIOZLFIW&name=' + escape(search) + '&format=jsonp&callback=?&start=0&results=' + numberOfSongs , function (data) {
      if (data.response.status.code == 5 || data.response.songs.length <= 10) {
        Playlist.youtube();
      }
      else {
        var ajaxs = [];
        
        $.each(data.response.songs, function (i, track) {
          if (track.title.toLowerCase().search("cover") == -1 && track.title.toLowerCase().search("remix") == -1) {
            ajaxs.push(
              $.getJSON('http://gdata.youtube.com/feeds/api/videos?q=' + escape(search) + '%20%2D$20' + escape(track.title) + '&orderby=relevance&start-index=1&max-results=10&v=2&format=5&alt=json-in-script&callback=?', function (data) {
                if (data.feed.hasOwnProperty("entry")) {
                  $.each(data.feed.entry, function (i, video) {
                    if (Video.isNotBlocked(video) && Video.isMusic(video) && Video.isUnique(video) && Video.isNotCoverOrRemix(video) && Video.isNotUserBanned(video) && Video.isNotLive(video)) {
                      Playlist.videos.push({ 
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
        
        $.when.apply($, ajaxs).then(Playlist.resultsReady);
      }
    });
  },

  similar: function () {
    var search = Playlist.options.search;

    $.getJSON('http://developer.echonest.com/api/v4/artist/similar?api_key=OYJRQNQMCGIOZLFIW&name=' + escape(search) + '&format=jsonp&callback=?&results=40&start=0', function (data) {
      var ajaxs = [];
      
      $.each(data.response.artists, function (i, artist) {
        ajaxs.push(
          $.getJSON('http://gdata.youtube.com/feeds/api/videos?q='+escape(artist.name)+'&orderby=relevance&start-index=1&max-results=10&v=2&alt=json-in-script&callback=?&format=5', function (data) {
            if (data.feed.hasOwnProperty("entry")) {
              $.each(data.feed.entry, function (i, video) {  
                if (Video.isNotBlocked(video) && Video.isMusic(video) && Video.isNotCoverOrRemix(video) && Video.isNotUserBanned(video) && Video.isNotLive(video)) {
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
                if (Video.isNotBlocked(video) && Video.isMusic(video) && Video.isNotLive(video) && Video.isNotUserBanned(video)) {
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

  youtube: function () {
    var search = Playlist.options.search;
    
    $.getJSON('http://gdata.youtube.com/feeds/api/videos?q='+escape(search)+'&orderby=relevance&start-index=1&max-results=40&v=2&alt=json-in-script&callback=?', function (data) {
      if (data.feed.hasOwnProperty("entry")) {
        $.each(data.feed.entry, function (i, video) {
          if (Video.isNotBlocked(video) && Video.isNotUserBanned(video)) {
            Playlist.videos.push({ 
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

  reddit: function () {
    var redditError = setTimeout(function () {
      Playlist.togglePlayer();
    }, 6000);

    $.getJSON("http://www.reddit.com/r/" + Playlist.options.subReddit + "/hot.json?jsonp=?&limit=100", function (data) {
      $.each(data.data.children, function () {
        var post = this.data;
        
        if (post.domain == "youtube.com" && post.media != null && typeof post.media === 'object' && post.media.hasOwnProperty("oembed") && post.media.oembed.url !== undefined) {
          var videoID = Import.getVideoID([{ href: post.media.oembed.url }]);

          if (videoID.length == 11){
            Playlist.videos.push({ 
              videoID:    videoID,
              videoTitle: post.media.oembed.title
            });
          }
        }
      });

      clearTimeout(redditError);
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
      playlistContainer.append('<li data-video-title="' + this.videoTitle + '" data-video-id="' + this.videoID + '"><a href="#" id="' + this.videoID + '">' + this.videoTitle + '</a></li>');
    });
    
    $('#' + Playlist.videos[Playlist.currentTrack].videoID).addClass('active');      
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
    
    return false;
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
    
    return false;
  },

  jumpToSong: function (videoID) {
    Playlist.currentTrack = videoID;
    Playlist.currentVideo();
  },

  currentVideo: function () {
    var currentVideo      = Playlist.videos[Playlist.currentTrack]
    var currentVideoTitle = currentVideo.videoTitle;

    document.title = currentVideoTitle;
    $('#current-video-title').text(currentVideoTitle)

    $('#playlist .active').removeClass('active');
    $('#' + currentVideo.videoID).addClass('active');
    
    Player.self.loadVideoById(currentVideo.videoID, currentVideo.startAt || 0);
    
    // if the user is in djing we need to update the 
    // connected listeners of the video change
    if (Playlist.djMode && Playlist.djMode.broadcasting) {
      Playlist.djMode.updateBroadcast(currentVideo.videoTitle, currentVideo.videoID, 0);
    }
  },

  throttlePersistSort: function () {
    clearTimeout(Playlist.sortThrottler);
    Playlist.sortThrottler = setTimeout(Playlist.persistSort, 5000);
  },

  sortVideos: function () {
    var positions           = [];
    var currentPlayingVideo = Playlist.videos[Playlist.currentTrack].videoID;

    $('#playlist li').each(function(index, item) {
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

  removeVideo: function () {
    var videoID = Playlist.videos[Playlist.currentTrack].videoID;

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
          success: function(data) { }
        }); 
      }
      else {
        $.ajax({
          type: 'POST',
          url: '/ban_video',
          data: {
            video_id: videoID
          },
          dataType: 'json',
          success: function(data) {
            User.bannedVideos.push(videoID);
          }
        });
      }
    }

    $("#playlist #" + videoID).remove();
    Playlist.videos.splice(Playlist.currentTrack, 1);

    if (Playlist.videos.length == 0) {
      Player.self.stopVideo();
      $('#player').fadeOut();
      $('#empty-playlist').fadeIn();
    }
    else {
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
      case 'reddit':
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

    if (Playlist.options.searchType == "reddit") {
      url += "r/" + Playlist.options.subReddit;
      shareText += "/r/" + Playlist.options.subReddit;
    }
    else if (Playlist.options.djUsername) {
      url += "dj/" + Playlist.options.djUsername;
      shareText += "I'm listening to " + Playlist.options.djUsername + " DJ"
    }
    else if (Playlist.options.search) {
      if (Playlist.options.searchType == "similar") {
        shareText += "Artists/Bands similar to ";
      }
      else {
      shareText += "I'm listening to ";
        url += "just/"
      }

      url += Playlist.options.search.replace(/ /g,"%20");
      shareText += unescape(Playlist.options.search.replace(/[+]/g," "));
    }
    else if (Playlist.options.videoID) {
      url += "video/" + Playlist.videos[Playlist.currentTrack].videoID
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

  $('#remove-video').click(function () {
    Playlist.removeVideo();
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
    stop: Playlist.sortVideos
  });

  $('.shuffle').click(function () {
    Playlist.shuffle();
    return false;
  });
});