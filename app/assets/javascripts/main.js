window.fbAsyncInit = function() { FB.init({ 
    appId   : '239275546125436', 
    status  : true, 
    cookie  : true, 
    xfbml   : true 
  }); 
};

// variables to be used throughout
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

// just artist/band
function just (who) {
  $('.just').addClass('listen-active');
  videos        = [];
  currenttrack  = 0;
  search        = who;
  search_type   = "just";
  $.getJSON('http://gdata.youtube.com/feeds/api/videos?q='+who+'&orderby=relevance&start-index=1&max-results=20&v=2&alt=json-in-script&callback=?', function(data) {
		$.each(data.feed.entry, function(i,video) {
			videos[i] = { 
				VideoID: video.id.$t.split(":")[3], 
				VideoTitle: video.title.$t 
			};
		});
		initPlaylist();
	});
}

// similar artist/bands
function similarTo (who) {
  $('.similar').addClass('listen-active');
  videos        = [];
  currenttrack  = 0;
  search        = who;
  search_type   = "similar";
	$.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist='+who+'&limit=20&api_key=b25b959554ed76058ac220b7b2e0a026&format=json&callback=?', function(data) {
		$.each(data, function(i,similars) {
			var ajaxs = $.map(similars.artist, function(artist) {
				return $.getJSON('http://gdata.youtube.com/feeds/api/videos?q='+artist.name+'&orderby=relevance&start-index=1&max-results=1&v=2&alt=json-in-script&callback=?', function(data) {
					$.each(data.feed.entry, function(i,video) {
						videos.push({ 
							VideoID: video.id.$t.split(":")[3], 
							VideoTitle: video.title.$t 
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

function updatePlayerInfo () {
  if (thePlayer && thePlayer.getDuration) {
    $('#progress-bar div').css('width',Math.floor((thePlayer.getCurrentTime()/thePlayer.getDuration())*100)+'%');
  }
}

function onYouTubePlayerAPIReady() {
  thePlayer = new YT.Player('ytplayerid', {
    videoId: videos[currenttrack].VideoID,
    width: 498,
    height: 250,
    playerVars: { 'autoplay': 1, 'rel': 0, 'theme': 'light', 'showinfo': 0, 'controls': 0 },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}

// start the playlist
function initPlaylist () {  
  videos.sort(function () { return (Math.round(Math.random())-0.5); });
  
  if (firstSearch) {
    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/player_api";
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
      marginTop: 100
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
    	
    	$('#twitter').attr('href',"https://twitter.com/share?text=I%27m%20listening%20to%20"+(search_type == 'similar' ? 'artists%2Fbands%20similar%20to%20' : '')+search.replace(/ /g,"%20")+(search_type == 'favorites' ? "%27s%20favorites": '')+"%20on%20%40tubalr%21&url=http%3A%2F%2Ftubalr.com%2F"+(search_type == 'favorites' ? search.replace(/[ +]/g,"%2B")+"%2Ffavorites" : search_type+"%2F"+search.replace(/[ +]/g,"%2B")));
		
    	currentVideo(videos[currenttrack]);
		  firstSearch = false;
		  
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
  else if (newState.data == 2) {
    $("#play-or-pause").removeClass('playing');
    $("#play-or-pause").addClass('paused');
  }
  else if (newState.data == 1) {
    $("#play-or-pause").removeClass('paused');
    $("#play-or-pause").addClass('playing');
  }
}

// play or pause
function playOrPause () {
  if (thePlayer.getPlayerState() == 2) {
    thePlayer.playVideo();
  }
  else {
    thePlayer.pauseVideo();
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

function onPlayerReady () {
  setInterval(updatePlayerInfo, 250);
}

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

$(document).ready(function () {
  $("#volume").slider({
    value: 100,
    range: "min",
    min: 0,
    max: 100,
    step: 5,
    slide: function(event, ui) {
      if (ui.value == 0) {
        $("#volume-text").addClass('volume-text-mute');
      }
      else {
        $("#volume-text").removeClass('volume-text-mute');
      }
      thePlayer.setVolume(ui.value);
    }
  });
  
  $("#volume").click(function(){
    $(this).removeClass('volume-text-mute');
  });
  
  $("#volume-text").click(function () {
    if ($(this).hasClass('volume-text-mute')) {
      thePlayer.setVolume(100);
      $(this).removeClass('volume-text-mute');
      $("#volume").slider({value: 100});
    }
    else {
      thePlayer.setVolume(0);
      $(this).addClass('volume-text-mute');
      $("#volume").slider({value: 0});
    }
  });
  
  $('#video-progress #progress-bar').click(function (e) {
		var ratio = (e.pageX-$(this).offset().left)/$(this).outerWidth();
		
		$(this).find('div').width(ratio*100+'%');
		thePlayer.seekTo(Math.round(thePlayer.getDuration()*ratio), true);
		return false;
	});
  
  $('#play-or-pause').click(function () {
    playOrPause("fromClickingTheButton");
  });
  
  $('.prev').click(function () {
    previousSong();
  });
  
  $('.next').click(function () {
    nextSong();
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
    window.open(window.location.protocol+"//"+window.location.host+$(this).attr('url'));
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