// variables to be used throughout
var videos = new Array();
var currenttrack = 0;
var search = "";
var search_type = "";
var videosCopy = "";
var ytplayer = null;

// just artist/band
function just(who) {
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
function similarTo(who) {
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

// start the playlist
function initPlaylist() {
  $("#main").animate({
    marginTop: 20
  }, 500, function () {
    $('#about').fadeOut(1000, function() {
      videosCopy = "&#8226;";
      $.each(videos, function(i) {
        videosCopy = videosCopy + '<a href="#" onClick="jumpTo('+i+')">'+this.VideoTitle+'</a>&#8226;';
      });
    	$('#playlist').html(videosCopy);
    	$('#ytplayerid').load('/player/' + search_type + '/' + escape(search) + '/' + videos[currenttrack].VideoID);
    	$('#currentVideoTitle').html(videos[currenttrack].VideoTitle);
    	$('#currentVideoId').attr('alt',videos[currenttrack].VideoID);
    	$('#player').fadeIn(1000);
    });
  });
}

// jump to a certain video
function jumpTo(VideoID) {
	currenttrack = VideoID;
	ytplayer.loadVideoById(videos[currenttrack].VideoID, 0);
	$('#currentVideoTitle').html(videos[currenttrack].VideoTitle);
}

// next
function nextSong() {
	if (currenttrack == videos.length-1) {
		alert("Woops, you're at the end of the playlist!");
	}
	else {
		currenttrack = currenttrack+=1;
		ytplayer.loadVideoById(videos[currenttrack].VideoID, 0);
		$('#currentVideoTitle').html(videos[currenttrack].VideoTitle);
		$('#currentVideoId').attr('alt',videos[currenttrack].VideoID);
	}
}

// previousSong
function previousSong() {
	if (currenttrack <= 0) {
		alert("Woops, you're at the beginning of the playlist, we cant go back any further!");
	}
	else {
		currenttrack = currenttrack-=1;
		ytplayer.loadVideoById(videos[currenttrack].VideoID, 0);
		$('#currentVideoTitle').html(videos[currenttrack].VideoTitle);
		$('#currentVideoId').attr('alt',videos[currenttrack].VideoID);
	}
}

// Getting youtube player ready
function onYouTubePlayerReady(playerId) {
	ytplayer = document.getElementById("ytplayerid");
	ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
	ytplayer.addEventListener("onError", "onPlayerError");
}

// YouTube player changes states
function onytplayerStateChange(newState) {
	if (newState == 0) nextSong(); // track ended
}

//YouTube player error
function onPlayerError(errorCode) {
	nextSong();
}

$(document).ready(function(){
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
    if(code == 13) { //Enter keycode  
      if ($('#q').val() != "") {
        just($('#q').val());
      }
    }
  });
});