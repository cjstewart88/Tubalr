window.fbAsyncInit = function() { FB.init({ 
    appId   : '239275546125436', 
    status  : true, 
    cookie  : true, 
    xfbml   : true 
  }); 
};

// variables to be used throughout
var genres            = ["rock","seenlive","alternative","indie","electronic","pop","metal","femalevocalists","classicrock","alternativerock","jazz","punk","indierock","folk","ambient","singer-songwriter","experimental","electronica","hardrock","hip-hop","80s","dance","hardcore","blackmetal","chillout","progressiverock","deathmetal","instrumental","heavymetal","british","punkrock","soundtrack","industrial","soul","blues","classical","emo","rap","90s","thrashmetal","metalcore","trance","japanese","favorites","reggae","acoustic","country","progressivemetal","trip-hop","hiphop","powermetal","funk","psychedelic","melodicdeathmetal","newwave","post-rock","electro","house","indiepop","techno","german","love","70s","rnb","britpop","american","gothicmetal","downtempo","piano","60s","00s","grunge","post-punk","albumsiown","beautiful","ska","gothic","screamo","mellow","chill","doommetal","french","guitar","oldies","idm","swedish","malevocalists","awesome","j-rock","numetal","symphonicmetal","finnish","lounge","polish","femalevocalist","grindcore","progressive","folkmetal","canadian","post-hardcore","world","drumandbass","synthpop","j-pop","newage","minimal","favourites","ebm","russian","poprock","cover","poppunk","latin","darkwave","favorite","female","darkambient","noise","industrialmetal","avant-garde","psychedelicrock","brutaldeathmetal","dub","disco","gothicrock","celtic","sexy","easylistening","alternativemetal","anime","christian","bluesrock","cool","favourite","classic","shoegaze","heardonpandora","folkrock","stonerrock","comedy","psytrance","christmas","sad","atmospheric","melancholy","fun","deathcore","jpop","deutsch","romantic","vikingmetal","fusion","femalefrontedmetal","irish","uk","visualkei","spanish","relax","hardcorepunk","acidjazz","relaxing","alt-country","amazing","covers","favoritesongs","italian","lo-fi","garagerock","happy","goth","melancholic","rockabilly","live","swing","ethereal","dark","norwegian","emocore","ballad","glamrock","australian","brazilian","malevocalist","good","americana","party","softrock","synthpop","political","melodicmetal","sludge","jrock","epic","hiphop","rocknroll","postrock","technicaldeathmetal","usa","favouritesongs","vocal","femalevocals","remix","speedmetal","club","electropop","contemporaryclassical","bossanova","funky","baroque","rhythmandblues","progressivetrance","electroclash","russianrock","brasil","neofolk","triphop","nu-metal","dancehall","industrialrock","rockandroll","guitarvirtuoso","worldmusic","drone","smoothjazz","dnb","breakbeat","catchy","rapcore","dubstep","artrock","loved","summer","thrash","drumnbass","darkelectro","psychobilly","mpb","undergroundhip-hop","skapunk","southernrock","medieval","vocaltrance","dreamy","christianrock","dreampop","paganmetal","minimaltechno","nujazz","breakcore","english"];
var videos            = new Array();
var currenttrack      = 0;
var search            = "";
var prev_search       = "";
var search_type       = "";
var videosCopy        = "";
var direction         = "forward";

var userId            = 0;
var userUsername      = null;
var alreadyFavorites  = [];

var tag               = null;
var firstScriptTag    = null;
var thePlayer;

var firstSearch       = true;

// set user id
function setUserInfo (id, username) {
  userId        = id;
  userUsername  = username;
}

// genre search
function genreSearch (who) {
  $('.just').addClass('listen-active');
  videos        = [];
  currenttrack  = 0;
  search        = who;
  search_type   = "genre";
	$.getJSON('http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag='+who+'&api_key=b25b959554ed76058ac220b7b2e0a026&limit=20&api_key=b25b959554ed76058ac220b7b2e0a026&format=json&callback=?', function(data) {
		$.each(data, function(i,artists) {
			var ajaxs = $.map(artists.artist, function(artist) {
				return $.getJSON('http://gdata.youtube.com/feeds/api/videos?q='+artist.name+'&orderby=relevance&start-index=1&max-results=1&v=2&alt=json-in-script&callback=?', function(data) {
					$.each(data.feed.entry, function(i,video) {
						videos.push({ 
							VideoID: video.id.$t.split(":")[3], 
							VideoTitle: video.title.$t,
							ArtistName: artist.name 
						});
					});
				});
			});
			$.when.apply($,ajaxs).then(initPlaylist);
		});
	});  
}

function not_lastfm_artist (who) {
  $('.just').addClass('listen-active');
  videos        = [];
  currenttrack  = 0;
  search        = who;
  search_type   = "just";
  $.getJSON('http://gdata.youtube.com/feeds/api/videos?q='+escape(who)+'&orderby=relevance&start-index=1&max-results=20&v=2&alt=json-in-script&callback=?', function(data) {
    $.each(data.feed.entry, function(i,video) {
      videos[i] = { 
        VideoID: video.id.$t.split(":")[3], 
        VideoTitle: video.title.$t 
      };
    });
    initPlaylist();
  });
}

// just artist/band
function just (who) {
  // check if the users input is a last.fm top tag
  if ($.inArray(who.replace(/[ +]/g, ""), genres) > -1) {
    genreSearch(who);
  }
  else {
  	$('.just').addClass('listen-active');
    videos        = [];
    currenttrack  = 0;
    search        = who;
    search_type   = "just";
  	$.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist='+escape(who)+'&api_key=b25b959554ed76058ac220b7b2e0a026&format=json&callback=?', function(data) {
  		if (data.error == 6 || data.toptracks.total == 0) {
  		  not_lastfm_artist(who);
  		}
  		else {
  		  $.each(data, function(i, tracks) {
    			var ajaxs = $.map(tracks.track, function(track) {
    				return $.getJSON('http://gdata.youtube.com/feeds/api/videos?q='+escape(who)+'%20%2D$20'+escape(track.name)+'&orderby=relevance&start-index=1&max-results=1&v=2&alt=json-in-script&callback=?', function(data) {
    					if (typeof data.feed.entry !== "undefined") {
    					  $.each(data.feed.entry, function(i,video) {
    					    if (video.yt$accessControl[4].permission != "denied" && video.media$group.media$category[0].$t == "Music" && unescape(who.toLowerCase().replace(/[ ]/g, "").replace(/[+]/g, "").replace(/["%20"]/g, "")) == video.title.$t.toLowerCase().split("-")[0].replace(/[ ]/g, "").replace(/[+]/g, "").replace(/["%20"]/g, "")) {
      					    var not_in_array = true;
      					    $.each(videos, function () {
      					      if (this.VideoID == video.id.$t.split(":")[3] || this.VideoTitle.toLowerCase().replace('/"'+who+'"/g', '').replace(/ *\([^)]*\) */g, "").replace(/ *\([^]]*\) */g, "").replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"") == video.title.$t.toLowerCase().replace('/"'+who+'"/g', '').replace(/ *\([^)]*\) */g, "").replace(/ *\([^]]*\) */g, "").replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"") || video.title.$t.toLowerCase().search("remix") != -1) {
      					        not_in_array = false;
      					      }
      					    });
      					    if (not_in_array) {
        						  videos.push({ 
          							VideoID: video.id.$t.split(":")[3], 
          							VideoTitle: video.title.$t
          						});
        						}
        					}
      					});
    					}
    				});
    			});
    			$.when.apply($,ajaxs).then(initPlaylist);
    		});
    	}
  	});
  } 
}

// similar artist/bands
function similarTo (who) {
  $('.similar').addClass('listen-active');
  videos        = [];
  currenttrack  = 0;
  search        = who;
  search_type   = "similar";
	$.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist='+escape(who)+'&limit=20&api_key=b25b959554ed76058ac220b7b2e0a026&format=json&callback=?', function(data) {
		$.each(data, function(i,similars) {
			var ajaxs = $.map(similars.artist, function(artist) {
				return $.getJSON('http://gdata.youtube.com/feeds/api/videos?q='+escape(artist.name)+'&orderby=relevance&start-index=1&max-results=1&v=2&alt=json-in-script&callback=?', function(data) {
					$.each(data.feed.entry, function(i,video) {
						videos.push({ 
							VideoID: video.id.$t.split(":")[3], 
							VideoTitle: video.title.$t,
							ArtistName: artist.name 
						});
					});
				});
			});
			$.when.apply($,ajaxs).then(initPlaylist);
		});
	});
}

// user favorites
function userFavorites(un, srch) {
  videos        = [];
  currenttrack  = 0;
  search        = (srch != '' ? un + ' : ' + srch : un);
  search_type   = "favorites";
  url           = (srch != '' ? '/'+un+'/favorites/'+srch+'.json' : '/'+un+'/favorites.json');
	$.getJSON(url, function(data) {
	  if (data.length != 0) {
      videos = data;
		  initPlaylist();
	  } 
	  else {
      if (search == userUsername) {
        $('#empty-playlist .bystander').remove();
        $('#empty-playlist').fadeIn();
      }
      else {
        $('#empty-playlist .users-favorites').remove();
        $('#empty-playlist').fadeIn();      
      }
	  } 
	});
}

function onYouTubePlayerAPIReady() {
  thePlayer = new YT.Player('ytplayerid', {
    videoId: videos[currenttrack].VideoID,
    width: 498,
    height: 280,
    version: 3,
    playerVars: { 'autoplay': 1, 'rel': 0, 'theme': 'dark', 'showinfo': 0, 'autohide': 1, 'wmode': 'opaque', 'allowScriptAccess': 'always', 'version': 3, 'restriction': 'US' },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}

// start the playlist
function initPlaylist () {  
  _gaq.push(['_trackPageview', (search_type == 'favorites' ? search.replace(/[ ]/g,"+")+"/favorites" : search_type+"/"+search.replace(/[ ]/g,"+"))]);
  
  videos.sort(function () { return (Math.round(Math.random())-0.5); });
  
  if (firstSearch) {
    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/player_api?version=3";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }
  
  // check to see if any of the video ids are already marked as a favorite for the user
  if (userId > 0) {
    $.ajax({
      type: 'POST',
      url: '/check-favorites',
      data: {
        user_id:  userId,
        videos:   videos
      },
      dataType: 'json',
      success: function(data) {
        alreadyFavorites = data;
      }
    });
  }

  $('.listen-active').removeClass('listen-active');
  $('#empty-playlist').fadeOut();
  $('#about').fadeOut(500, function(){
    $("#main").animate({
      marginTop: ($('#main').css('marginTop') == '20px' ? 20 : 100)
    }, 500, function () {  
      videosCopy = "";
      $.each(videos, function(i) {
        videosCopy = videosCopy + '<a href="#" id="'+this.VideoID+'">'+this.VideoTitle+'</a>';
      });
    	$('#the-list').html(videosCopy);

     if (prev_search != search) {  
      	$.post('/insert_search/' + search_type + '/' + escape(search));
    	  prev_search = search;
    	}
    	
    	if (search_type == 'favorites') {
    	  $('#info-icon').hide();
    	}
    	else {
    	  $('#info-icon').show();
    	} 
    	
    	$('#twitter').attr('href',"https://twitter.com/share?text=I%27m%20listening%20to%20"+(search_type == 'similar' ? 'artists%2Fbands%20similar%20to%20' : '')+search.replace(/ /g,"%20")+(search_type == 'favorites' ? "%27s%20favorites": '')+"%20on%20%40tubalr%21&url=http%3A%2F%2Ftubalr.com%2F"+(search_type == 'favorites' ? search.replace(/[ +]/g,"%2B")+"%2Ffavorites" : search_type+"%2F"+search.replace(/[ +]/g,"%2B")));
		
    	currentVideo(videos[currenttrack]);
		  firstSearch = false;
		  
		  if (search_type == 'just') {
		    getInfo();
	    }
		  
    	$('#player').fadeIn(1000);
    	$('nav').animate({ right: 220 }, 500, function() {
    	  $('#playlist').fadeIn(1000);
      	$('.slimScrollDiv').fadeIn(1000);

        $('#playlist').slimScroll({
          height: '100%',
          width: '200px'
        });
    	});
    });
  });
}

// denote current song in the ui
function currentVideo (video) {
  if (search_type == 'similar' || search_type == 'genre') {
    getInfo();
  }
  
  if ($.inArray(video.VideoID, alreadyFavorites) != -1) {
    $('#favorite-star').addClass('fav');
  }
  else {
    $('#favorite-star').removeClass('fav');    
  }
  
  if (!firstSearch) {
    firstSearch = false;
    thePlayer.loadVideoById(video.VideoID, 0);
  }
	
	$('#the-list .active').removeClass('active');
	$('#'+video.VideoID).addClass('active');
}

// jump to a certain video
function jumpTo (VideoID) {
	currenttrack = VideoID;
	currentVideo(videos[currenttrack]);
}

// next
function nextSong (removedFromFavorites) {
  direction = "forward";
  if (removedFromFavorites) {
    if (currenttrack == videos.length) {
      currenttrack = 0;
	    currentVideo(videos[currenttrack]);
	  }
	  else {
	    currentVideo(videos[currenttrack]);
	  }
  }
	else if (currenttrack == videos.length-1) {
		currenttrack = 0;
		currentVideo(videos[currenttrack]);
	}
	else {
		currenttrack = currenttrack+=1;
		currentVideo(videos[currenttrack]);
	}
	return false;
}

// previousSong
function previousSong () {
  direction = "backward";
	if (currenttrack == 0) {
		currenttrack = videos.length-1;
		currentVideo(videos[currenttrack]);
	}
	else {
		currenttrack = currenttrack-=1;
		currentVideo(videos[currenttrack]);
	}
	return false;
}

// YouTube player changes states
function onPlayerStateChange (newState) {
  // if track ended
	if (newState.data == 0) {
    nextSong();
  }
}

//YouTube player error
function onPlayerError (errorCode) {
	if (direction == "backward") {
	  previousSong();
	} 
	else {
	  nextSong();
	}
}

function onPlayerReady () { }

function facebook () {
  FB.ui({
      method: 'stream.publish',
      attachment: {
        name: (search_type == 'similar' ? 'Artists/Bands similar to ' : '')+search.replace(/[+]/g," ")+(search_type == 'favorites' ? "'s favorites": '')+", brought to you by tubalr!",
        href: "http://www.tubalr.com/"+(search_type == 'favorites' ? search.replace(/ /g,"+")+'/favorites' : search_type+"/"+search.replace(/ /g,"+")),
        description: ("Tubalr allows you to effortlessly listen to a band's or artist's top YouTube videos without all the clutter YouTube brings.")
      },
      display: 'popup'
    },
    function (response) {
    }
  );
  return false;
}

function favorite (star) {
  if ($(star).hasClass('fav')) {
    $.ajax({
      type: 'POST',
      url: '/favorites/remove',
      data: {
        user_id:  userId,  
        video_id: videos[currenttrack].VideoID
      },
      dataType: 'json',
      success: function(data) {
        $(star).removeClass('fav');
        alreadyFavorites.splice(alreadyFavorites.indexOf(videos[currenttrack].VideoID), 1);
        if (search == userUsername) {
          $("#the-list #"+videos[currenttrack].VideoID).remove();
          videos.splice(currenttrack, 1);
          if (videos.length == 0) {
            $('#player').fadeOut();
            $('.slimScrollDiv').fadeOut(500, function() {
              $('#main').animate({ marginTop: 200 }, 500);
            });
            $('#empty-playlist .bystander').remove();
            $('#empty-playlist').fadeIn();
          }
          else {
            nextSong("removedFromFavorites");
          }
        }
      }
    });
  }
  else {
    $.ajax({
      type: 'POST',
      url: '/favorites/add',
      data: {
        user_id:      userId,  
        video_id:     videos[currenttrack].VideoID,
        video_title:  videos[currenttrack].VideoTitle
      },
      dataType: 'json',
      success: function(data) {
        alreadyFavorites.push(videos[currenttrack].VideoID);
        $(star).addClass('fav');
      }
    });  
  }
}

function getGenreInfo (clickedGenre) {
  var genre = clickedGenre.parent().find('a').text();
  $('.ui-dialog-title').html('About ' + genre);
  $('.ui-dialog-content').html("");
  $.getJSON('http://ws.audioscrobbler.com/2.0/?method=tag.getinfo&tag='+genre+'&api_key=b25b959554ed76058ac220b7b2e0a026&format=json&callback=?', function(data) {
		if (data.error == 6 || data.tag.wiki == "") {
		  $('.ui-dialog-content').html('No information could be found for this genre.');
		}
		else {
		  $('.ui-dialog-content').html(data.tag.wiki.content.replace(/[\n]/g,"<br/>"));
		}
    $('#about-genre').dialog('open');
	});
}

function getInfo () {
  var tmpWho = "";
  if (search_type == 'similar' || search_type == 'genre') {
    tmpWho = videos[currenttrack].ArtistName;
  }
  else {
   tmpWho = search; 
  }
  
  $.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.getInfo&artist='+tmpWho+'&api_key=b25b959554ed76058ac220b7b2e0a026&format=json&callback=?', function(data) {
		if (data.error == 6 || data.artist.bio.content == "") {
		  $('#info').html('No information could be found for the artist/band you supplied.');
		}
		else {
		  $('#info').html(data.artist.bio.content.replace(/[\n]/g,"<br/>"));
		  $('#info').prepend("<h3>"+tmpWho.replace(/[+]/g,' ')+"</h3>")
		}
	});
}

$(document).ready(function () { 
  $('#next').click(function () { 
    nextSong();
    return false;
  });
  $('#previous').click(function () {
    previousSong();
    return false;
  });
  
  $('#about-tubalr').dialog({
    modal: true,
    autoOpen: false,
    width: 600,
    draggable: false,
    title: 'About Tubalr'
  });
  $('.about-tubalr').click(function () { $('#about-tubalr').dialog('open'); });
    
  $('#about-genre').dialog({
    modal: true,
    autoOpen: false,
    width: 600,
    draggable: false
  });
  $('#genres-main ul li i').click(function () {
    getGenreInfo($(this));
  });
   
  $('#info-icon').click(function(){
    if ($('#main').css('marginTop') == '20px') {
      $('#info').slideToggle(function(){
        $("#main").animate({ marginTop: 100 }, 500);
      });
    }
    else {
      $("#main").animate({
        marginTop: 20
      }, 500, function () {
        $('#info').slideToggle();
      });
    }
  });
  
  if ($('.flash-msg')) {
    setTimeout(function () {
      $('.flash-msg').slideUp(500, function () {
        $(this).remove();
      });
    }, 5000);
  }
  
  $('#player').delegate('#favorite-star', 'click', function() {
    favorite(this);
  });
  
  $('#the-list').delegate('a', 'click', function () { jumpTo($(this).index('#the-list a')); return false; });   
  
  $('table tbody tr').click(function() {
    if ($(this).parent().parent().attr("id") != 'general') {
      window.open(window.location.protocol+"//"+window.location.host+$(this).attr('url'));
    }
  });
  
  $('#main').delay(500).fadeIn();
  $('#footer').delay(500).fadeIn();
  
  $('#q').focus(function() {
    if ($(this).val() == "Enter Artist or Band Here") $(this).val("");
  });
  $('#q').blur(function() {
    if ($(this).val() == "") $(this).val("Enter Artist or Band Here");
  });

  $('.just').click(function() {
     just($('#q').val());
  });
  $('.similar').click(function() {
    similarTo($('#q').val());
  });

  $('input#q').keypress(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode  
      if ($('#q').val() != "") {
        just($('#q').val());
      }
    }
  });
  
  $('#twitter').click(function(event) {
    var width  = 575,
        height = 400,
        left   = ($(window).width()  - width)  / 2,
        top    = ($(window).height() - height) / 2,
        url    = this.href,
        opts   = 'status=1' +
                 ',width='  + width  +
                 ',height=' + height +
                 ',top='    + top    +
                 ',left='   + left;
    
    window.open(url, 'twitter', opts);
 
    return false;
  });
});