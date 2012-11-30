var Playlist = {                                                                                                                                                                                                                                                                       
  genres: ["rock","seenlive","alternative","indie","electronic","pop","metal","femalevocalists","classicrock","alternativerock","jazz","punk","indierock","folk","ambient","singer-songwriter","experimental","electronica","hardrock","hip-hop","80s","dance","hardcore","blackmetal","chillout","progressiverock","deathmetal","instrumental","heavymetal","british","punkrock","soundtrack","industrial","soul","blues","classical","emo","rap","90s","thrashmetal","metalcore","trance","japanese","favorites","reggae","acoustic","country","progressivemetal","trip-hop","hiphop","powermetal","funk","psychedelic","melodicdeathmetal","newwave","post-rock","electro","house","indiepop","techno","german","love","70s","rnb","britpop","american","gothicmetal","downtempo","piano","60s","00s","grunge","post-punk","albumsiown","beautiful","ska","gothic","screamo","mellow","chill","doommetal","french","guitar","oldies","idm","swedish","malevocalists","awesome","j-rock","numetal","symphonicmetal","finnish","lounge","polish","femalevocalist","grindcore","progressive","folkmetal","canadian","post-hardcore","world","drumandbass","synthpop","j-pop","newage","minimal","favourites","ebm","russian","poprock","cover","poppunk","latin","darkwave","favorite","female","darkambient","noise","industrialmetal","avant-garde","psychedelicrock","brutaldeathmetal","dub","disco","gothicrock","celtic","sexy","easylistening","alternativemetal","anime","christian","bluesrock","cool","favourite","classic","shoegaze","heardonpandora","folkrock","stonerrock","comedy","psytrance","christmas","sad","atmospheric","melancholy","fun","deathcore","jpop","deutsch","romantic","vikingmetal","fusion","femalefrontedmetal","irish","uk","visualkei","spanish","relax","hardcorepunk","acidjazz","relaxing","alt-country","amazing","covers","favoritesongs","italian","lo-fi","garagerock","happy","goth","melancholic","rockabilly","live","swing","ethereal","dark","norwegian","emocore","ballad","glamrock","australian","brazilian","malevocalist","good","americana","party","softrock","synthpop","political","melodicmetal","sludge","jrock","epic","hiphop","rocknroll","postrock","technicaldeathmetal","usa","favouritesongs","vocal","femalevocals","remix","speedmetal","club","electropop","contemporaryclassical","bossanova","funky","baroque","rhythmandblues","progressivetrance","electroclash","russianrock","brasil","neofolk","triphop","nu-metal","dancehall","industrialrock","rockandroll","guitarvirtuoso","worldmusic","drone","smoothjazz","dnb","breakbeat","catchy","rapcore","dubstep","artrock","loved","summer","thrash","drumnbass","darkelectro","psychobilly","mpb","undergroundhip-hop","skapunk","southernrock","medieval","vocaltrance","dreamy","christianrock","dreampop","paganmetal","minimaltechno","nujazz","breakcore","english"],
  
  currentTrack: 0,

  videos: [],
  
  direction: 'forward',

  options: {
    search:               null,
    searchType:           null,
    customPlaylistOwner:  null,
    customPlaylistName:   null,
    videoID:              null,
  },

  init: function (options) {
    Playlist.reset();
    $.extend(Playlist.options, options);
    
    if (Player.self) {
      Player.self.stopVideo();
      Playlist.playerReady();
    }
    else {
      Player.init();
    }

    Playlist.determineIfGenreSearch(); 
    Playlist.report();
  },

  playerReady: function () {
    Playlist[Playlist.options.searchType]();
  },

  reset: function () {
    Playlist.videos                       = [];
    Playlist.currentTrack                 = 0;
    Playlist.direction                    = 'forward';
    Playlist.options.customPlaylistOwner  = null;
    Playlist.options.customPlaylistName   = null;
    Playlist.options.videoID              = null;

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

    $.getJSON('http://developer.echonest.com/api/v4/artist/songs?api_key=OYJRQNQMCGIOZLFIW&name='+escape(search)+'&format=jsonp&callback=?&start=0&results=40' , function(data) {
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
                    if (Video.isNotBlocked(video) && Video.isMusic(video) && Video.isUnique(video) && Video.isNotCoverOrRemix(video) && Video.isNotUserBanned(video)) {
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
        
        $.when.apply($, ajaxs).then(Playlist.start);
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
              if (Video.isNotBlocked(video) && Video.isMusic(video) && Video.isNotCoverOrRemix(video) && Video.isNotUserBanned(video)) {
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
      
      $.when.apply($,ajaxs).then(Playlist.start);
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
              if (Video.isNotBlocked(video) && Video.isMusic(video)) {
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
      
      $.when.apply($, ajaxs).then(Playlist.start);
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
      
      Playlist.start();
    });
  },

  customPlaylist: function () {
    var url = "/" + Playlist.options.customPlaylistOwner + "/playlist/" + Playlist.options.customPlaylistName + ".json";

    $.getJSON(url, function (data) {
      Playlist.videos = data;
      Playlist.start(); 
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

      Playlist.start();
    });
  },

  start: function () {
    $('#loading-playlist').hide();

    if (Playlist.videos.length == 0) {
      $('#empty-playlist').fadeIn();
    }
    else {
      Playlist.videos.sort(function () { return (Math.round(Math.random())-0.5); });
      
      videosCopy = "";
      $.each(Playlist.videos, function(i) {
        videosCopy = videosCopy + '<a href="#" id="'+this.videoID+'">'+this.videoTitle+'</a>';
      });
      $('#playlist').html(videosCopy);
    
      Playlist.currentVideo();
      
      if (Playlist.options.searchType == 'video') {
        $('#player-controls').hide();
      }
      else {
        $('#player-controls').show();
      }
      
      $('#player').fadeIn(1000);
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

});