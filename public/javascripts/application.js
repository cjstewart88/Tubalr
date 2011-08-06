// Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-16656461-3']);
_gaq.push(['_trackPageview']);

(function() {
var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

// load jquery library and swfobject through google
google.load("swfobject", "2.1");
google.load("jquery", "1.5");

// variables to be used throughout
var videos = new Array();
var currenttrack = 0;

// just a certain artist/band
function just(who) {
  videos = [];
  currenttrack = 0;
	$.getJSON('http://gdata.youtube.com/feeds/api/videos?q='+who+'&orderby=relevance&start-index=1&max-results=20&v=2&alt=json-in-script&callback=?', function(data) {
		$.each(data.feed.entry, function(i,video) {
			videos[i] = { 
				id: video.id.$t.split(":")[3], 
				title: video.title.$t 
			};
		});
		initPlaylist();
	});
}

// similar artist/bands
function similarTo(who) {
  videos = [];
  currenttrack = 0;
	$.getJSON('http://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist='+who+'&limit=20&api_key=b25b959554ed76058ac220b7b2e0a026&format=json&callback=?', function(data) {
		$.each(data, function(i,similars) {
			var ajaxs = $.map(similars.artist, function(artist) {
				return $.getJSON('http://gdata.youtube.com/feeds/api/videos?q='+artist.name+'&orderby=relevance&start-index=1&max-results=1&v=2&alt=json-in-script&callback=?', function(data) {
					$.each(data.feed.entry, function(i,video) {
						videos.push({ 
							id: video.id.$t.split(":")[3], 
							title: video.title.$t 
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
  console.log(videos);
	$('#ytplayerid').load('/player/' + videos[currenttrack].id);
	$('#currentVideoTitle').html(videos[currenttrack].title);
	$('#currentVideoId').attr('alt',videos[currenttrack].id);
}

// next
function nextSong() {
	if (currenttrack == videos.length-1) {
		alert("Woops, you're at the end of the playlist!");
	}
	else {
		currenttrack = currenttrack+=1;
		ytplayer.loadVideoById(videos[currenttrack].id, 0);
		$('#currentVideoTitle').html(videos[currenttrack].title);
		$('#currentVideoId').attr('alt',videos[currenttrack].id);
	}
}

// previousSong
function previousSong() {
	if (currenttrack <= 0) {
		alert("Woops, you're at the beginning of the playlist, we cant go back any further!");
	}
	else {
		currenttrack = currenttrack-=1;
		ytplayer.loadVideoById(videos[currenttrack].id, 0);
		$('#currentVideoTitle').html(videos[currenttrack].title);
		$('#currentVideoId').attr('alt',videos[currenttrack].id);
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