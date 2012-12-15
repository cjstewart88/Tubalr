var Playlist = {                                                                                                                                                                                                                                                                       

  genres: ["rock","seenlive","alternative","indie","electronic","pop","metal","femalevocalists","classicrock","alternativerock","jazz","punk","indierock","folk","ambient","singer-songwriter","experimental","electronica","hardrock","hip-hop","80s","dance","hardcore","blackmetal","chillout","progressiverock","deathmetal","instrumental","heavymetal","british","punkrock","soundtrack","industrial","soul","blues","classical","emo","rap","90s","thrashmetal","metalcore","trance","japanese","favorites","reggae","acoustic","country","progressivemetal","trip-hop","hiphop","powermetal","funk","psychedelic","melodicdeathmetal","newwave","post-rock","electro","house","indiepop","techno","german","love","70s","rnb","britpop","american","gothicmetal","downtempo","piano","60s","00s","grunge","post-punk","albumsiown","beautiful","ska","gothic","screamo","mellow","chill","doommetal","french","guitar","oldies","idm","swedish","malevocalists","awesome","j-rock","numetal","symphonicmetal","finnish","lounge","polish","femalevocalist","grindcore","progressive","folkmetal","canadian","post-hardcore","world","drumandbass","synthpop","j-pop","newage","minimal","favourites","ebm","russian","poprock","cover","poppunk","latin","darkwave","favorite","female","darkambient","noise","industrialmetal","avant-garde","psychedelicrock","brutaldeathmetal","dub","disco","gothicrock","celtic","sexy","easylistening","alternativemetal","anime","christian","bluesrock","cool","favourite","classic","shoegaze","heardonpandora","folkrock","stonerrock","comedy","psytrance","christmas","sad","atmospheric","melancholy","fun","deathcore","jpop","deutsch","romantic","vikingmetal","fusion","femalefrontedmetal","irish","uk","visualkei","spanish","relax","hardcorepunk","acidjazz","relaxing","alt-country","amazing","covers","favoritesongs","italian","lo-fi","garagerock","happy","goth","melancholic","rockabilly","live","swing","ethereal","dark","norwegian","emocore","ballad","glamrock","australian","brazilian","malevocalist","good","americana","party","softrock","synthpop","political","melodicmetal","sludge","jrock","epic","hiphop","rocknroll","postrock","technicaldeathmetal","usa","favouritesongs","vocal","femalevocals","remix","speedmetal","club","electropop","contemporaryclassical","bossanova","funky","baroque","rhythmandblues","progressivetrance","electroclash","russianrock","brasil","neofolk","triphop","nu-metal","dancehall","industrialrock","rockandroll","guitarvirtuoso","worldmusic","drone","smoothjazz","dnb","breakbeat","catchy","rapcore","dubstep","artrock","loved","summer","thrash","drumnbass","darkelectro","psychobilly","mpb","undergroundhip-hop","skapunk","southernrock","medieval","vocaltrance","dreamy","christianrock","dreampop","paganmetal","minimaltechno","nujazz","breakcore","english"],
  
  currentTrack: 0,

  videos: [],
  
  direction: 'forward',

  sortThrottler: null,

  options: {
    search:               null,
    searchType:           null,
    customPlaylistOwner:  null,
    customPlaylistName:   null,
    persistentSorting:    false,
    videoID:              null
  },

  init: function (options) {
    Playlist.reset();
    $.extend(Playlist.options, options);
    
    Playlist.determineIfGenreSearch(); 
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

    $('.landing').fadeOut();
    $('#player').fadeOut();
    $('#empty-playlist').fadeOut();
    $('#loading-playlist').fadeIn();
  },

  report: function () {
    var url;

    if (Playlist.options.searchType == 'customPlaylist') {
      url = [Playlist.options.customPlaylistOwner.replace(/[ ]/g,"+"), "playlist", Playlist.options.customPlaylistName.replace(/[ ]/g,"+")];
    }
    else if (Playlist.options.searchType == 'video') {
      url = [Playlist.options.searchType, Playlist.options.videoID];
    }
    else {
      url = [Playlist.options.searchType, Playlist.options.search.replace(/[ ]/g,"+")];
    }

    _gaq.push(['_trackPageview', url.join('/')]);
  },

  determineIfGenreSearch: function () {
    var search = Playlist.options.search;

    if (Playlist.genres.indexOf(search.replace(/[ +]/g, '')) != -1) {
      Playlist.options.searchType = 'genre';
    }
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
                if (typeof data.feed.entry !== "undefined") {
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
            $.each(data.feed.entry, function (i, video) {  
              if (Video.isNotBlocked(video) && Video.isMusic(video) && Video.isNotCoverOrRemix(video) && Video.isNotUserBanned(video) && Video.isNotLive(video)) {
                Playlist.videos.push({ 
                  videoID: video.id.$t.split(":")[3], 
                  videoTitle: video.title.$t
                });
                
                return false;
              }
            });
          })
        );
      });
      
      $.when.apply($,ajaxs).then(Playlist.just);
    });
  },

  genre: function () {
    var search = Playlist.options.search;

    $.getJSON('http://developer.echonest.com/api/v4/artist/search?api_key=OYJRQNQMCGIOZLFIW&format=jsonp&callback=?&results=40&style=' + search, function(data) {
      var ajaxs = [];

      $.each(data.response.artists, function (i, artist) {
        ajaxs.push(
          $.getJSON('http://gdata.youtube.com/feeds/api/videos?q=' + artist.name + '&orderby=relevance&start-index=1&max-results=10&v=2&alt=json-in-script&callback=?', function (data) {
            $.each(data.feed.entry, function (i,video) {
              if (Video.isNotBlocked(video) && Video.isMusic(video) && Video.isNotLive(video)) {
                Playlist.videos.push({ 
                  videoID:    video.id.$t.split(":")[3], 
                  videoTitle: video.title.$t,
                  artistName: artist.name 
                });

                return false;
              }
            });
          })
        )
      });
      
      $.when.apply($, ajaxs).then(Playlist.resultsReady);
    });
  },

  youtube: function () {
    var search = Playlist.options.search;
    
    $.getJSON('http://gdata.youtube.com/feeds/api/videos?q='+escape(search)+'&orderby=relevance&start-index=1&max-results=20&v=2&alt=json-in-script&callback=?', function (data) {
      $.each(data.feed.entry, function (i, video) {
        if (Video.isNotBlocked(video) && Video.isNotUserBanned(video)) {
          Playlist.videos.push({ 
            videoID:    video.id.$t.split(":")[3], 
            videoTitle: video.title.$t 
          });
        }
      });
      
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

  togglePlayer: function () {
    $('#loading-playlist').hide();

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
    
    Player.self.loadVideoById(currentVideo.videoID, 0);
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
    var url     = "https://twitter.com/share?text=I%27m%20listening%20to%20";
    var search  = "";

    switch (Playlist.options.searchType) {
      case 'genre':
      case 'just':
        search = Playlist.options.search.replace(/[ +]/g,"%20");
        url += search + '%20on%20%40tubalr%21&url=http%3A%2F%2Ftubalr.com';
        url += '%2Fjust%2F' + search.replace(/%20/g, '%2B');
        break;
      case 'similar':
        search = Playlist.options.search.replace(/[ +]/g,"%20");
        url += 'artists%2Fbands%20similar%20to%20' + search + '%20on%20%40tubalr%21&url=http%3A%2F%2Ftubalr.com';
        url += '%2Fsimilar%2F' + search.replace(/%20/g,'%2B');
        break;
      case 'customPlaylist':
        search = Playlist.options.customPlaylistName.replace(/[ +]/g,'%2B');
        url += search + '%20on%20%40tubalr%21&url=http%3A%2F%2Ftubalr.com';
        url += '%2F' + Playlist.options.customPlaylistOwner.replace(/[ +]/g, '%2B') + '%2Fplaylist%2F' + search.replace(/%20/g, '%2B');
        break;
      case 'video':
        url += Playlist.videos[Playlist.currentTrack].videoTitle.replace(/[ +]/g,"%20") + '%20on%20%40tubalr%21&url=http%3A%2F%2Ftubalr.com';
        url += '%2Fvideo%2F' + Playlist.videos[Playlist.currentTrack].videoID;
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

    if (Playlist.options.search) {
      if (Playlist.options.searchType == "similar") {
        shareText += "Artists/Bands similar to ";
      }
      else {
        url += "just/"
      }

      url += Playlist.options.search.replace(/ /g,"+");
      shareText += unescape(Playlist.options.search.replace(/[+]/g," "));
    }
    else if (Playlist.options.videoID) {
      url += "video/" + Playlist.videos[Playlist.currentTrack].videoID
      shareText += unescape(Playlist.videos[Playlist.currentTrack].videoTitle.replace(/[+]/g," "));
    }
    else if (Playlist.options.customPlaylistOwner) {
      url += Playlist.options.customPlaylistOwner.replace(/ /g,"+") + "/playlist/" + Playlist.options.customPlaylistName.replace(/ /g,"+");
      shareText += unescape(Playlist.options.customPlaylistName.replace(/[+]/g," "));
    }

    shareText += ", brought to you by tubalr!";

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

  Mousetrap.bind('space', function(e) {
    Playlist.playPause();
    e.preventDefault();
  });

  Mousetrap.bind('left', function() {
    Playlist.previousSong();
  });

  Mousetrap.bind('right', function() {
    Playlist.nextSong();
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