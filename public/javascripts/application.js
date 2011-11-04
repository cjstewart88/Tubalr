// this is true if a youtube video is loading
window.yt_loading = false;

window.fbAsyncInit = function() { FB.init({ 
    appId : '239275546125436', 
    status : true, 
    cookie : true, 
    xfbml : true 
  }); 
};

// variables to be used throughout
var videos = new Array();
var currenttrack = 0;
var search = "";
var search_type = "";
var videosCopy = "";
var ytplayer = null;
var playlistDirection = "forward";
var playlistLength = 0;

// just artist/band
function just (who) {
  $('.just').addClass('listen-active');
  videos = [];
  currenttrack = 0;
  search = who;
  search_type = "just";
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
  videos = [];
  currenttrack = 0;
  search = who;
  search_type = "similar";
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
function userFavorites(userID) {
  videos = [];
  currenttrack = 0;
  search = userID;
  search_type = "favorites";
	$.getJSON('/users/'+userID+'/favorites.json', function(data) {
	  if (data.length != 0) {
      videos = data;
		  initPlaylist();
	  } 
	  else {
      window.location = "/";
	  } 
	});
}

// start the playlist
function initPlaylist () {
  playlistLength = videos.length; 
  $('.listen-active').removeClass('listen-active');
  videos.sort(function () { return (Math.round(Math.random())-0.5); });
  $('#about').fadeOut(500, function(){
    $("#main").animate({
      marginTop: 100
    }, 500, function () {  
      videosCopy = "";
      $.each(videos, function(i) {
        videosCopy = videosCopy + '<a href="#" id="'+this.VideoID+'">'+this.VideoTitle+'</a>';
      });
    	$('#playlist').html(videosCopy);
    	$('#ytplayerid').load('/player/' + search_type + '/' + escape(search) + '/' + videos[currenttrack].VideoID);
    	$('#twitter').attr('href',"https://twitter.com/share?text=I%27m%20listening%20to%20"+(search_type == 'similar' ? 'artists%2Fbands%20similar%20to%20' : '')+search.replace(/ /g,"%20")+"%20on%20%40tubalr%21&url=http%3A%2F%2Ftubalr.com%2F"+search_type+"%2F"+search.replace(/[ +]/g,"%2B"));
  		$('#link-tooltip input').val("http://www.tubalr.com/"+search_type+"/"+search.replace(/ /g,"+"));
  		currentVideo(videos[currenttrack], true);
    	$('#player').fadeIn(1000);
    	$('#playlist').fadeIn(1000);
      $('body').keyup(function(e) {
        // if video is loading, stop
        if (window.yt_loading) return false;
        
        if (!$('#q').is(":focus")) {
          var code = (e.keyCode ? e.keyCode : e.which);
          if (code == 39) nextSong();
          if (code == 37) previousSong();
          if (code == 32) ytplayer.getPlayerState() == 2 ? ytplayer.playVideo() : ytplayer.pauseVideo();
        }
      });
      $('#playlist').slimScroll({
          height: '100%',
          width: '200px'
      });
    });
  });
}

// denote current song in the ui
function currentVideo (video, init) {
  if (!init) ytplayer.loadVideoById(video.VideoID, 0);
	$('#currentVideoTitle').html(video.VideoTitle);
	$('#playlist .active').removeClass('active');
	$('#'+video.VideoID).addClass('active');
}

// jump to a certain video
function jumpTo (VideoID) {
	currenttrack = VideoID;
	currentVideo(videos[currenttrack]);
}

// next
function nextSong () {
  direction = "forward";
	if (currenttrack == videos.length-1) {
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
		currenttrack = playlistLength;
		currentVideo(videos[currenttrack]);
	}
	else {
		currenttrack = currenttrack-=1;
		currentVideo(videos[currenttrack]);
	}
	return false;
}

// Getting youtube player ready
function onYouTubePlayerReady (playerId) {
	ytplayer = document.getElementById("ytplayerid");
	ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
	ytplayer.addEventListener("onError", "onPlayerError");
}

// YouTube player changes states
function onytplayerStateChange (newState) {
  // if track ended
	if (newState == 0) {
    nextSong();
  // if video is loading
  } else if (newState == 3) {
    window.yt_loading = true;
  // if video is ready
  } else if (newState ==1) {
    window.yt_loading = false;
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

function facebook () {
  FB.ui({
      method: 'stream.publish',
      attachment: {
        name: (search_type == 'similar' ? 'Artists/Bands similar to ' : '')+search.replace(/[+]/g," ")+", brought to you by tubalr!",
        href: "http://www.tubalr.com/"+search_type+"/"+search.replace(/ /g,"+"),
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
      type: 'PUT',
      url: '/users/'+user-id+'.json',
      data: {
        action:       "remove",
        video_id:     videos[currenttrack].VideoID,
        video_title:  videos[currenttrack].VideoTitle
      },
      dataType: 'json',
      success: function(data) {
        videos.splice(currenttrack, 1);
        $(star).removeClass('fav');
        nextSong();
      }
    });
  }
  else {
    $.ajax({
      type: 'PUT',
      url: '/users/'+user-id+'.json',
      data: {
        action:       "add",
        video_id:     videos[currenttrack].VideoID,
        video_title:  videos[currenttrack].VideoTitle
      },
      dataType: 'json',
      success: function(data) {
        $(star).addClass('fav');
      }
    });  
  }
}

$(document).ready(function(){
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
  
  $('#playlist').delegate('a', 'click', function () { jumpTo($(this).index('#playlist a')); return false; });   
    
  $('.link-tooltip').mouseenter(function(){
    $('#link-tooltip').show();
  }).mouseleave(function(){
    $('#link-tooltip').hide();
  });
  $('#link-tooltip input').focus(function(){$(this).select();}).mouseup(function(e){e.preventDefault();});
  
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