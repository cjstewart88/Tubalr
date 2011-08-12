// variables to be used throughout
var videos = new Array();
var currenttrack = 0;
var search = "";
var search_type = "";

// just a certain artist/band
function just(who) {
  videos = [];
  currenttrack = 0;
  search = who;
  search_type = "just";
	$.getJSON('/just/'+who+'.json', function(data) {
	  videos = data;
		initPlaylist();
	});
}

// similar artist/bands
function similarTo(who) {
  videos = [];
  currenttrack = 0;
  search = who;
  search_type = "similar";
	$.getJSON('/similar/'+who+'.json', function(data) {
    videos = data;
		initPlaylist();
	});
}

// similar artist/bands
function playlist(id) {
  videos = [];
  currenttrack = 0;
  search = id;
  search_type = "playlist";
	$.getJSON('/playlist/'+id+'.json', function(data) {
    videos = data;
		initPlaylist();
	});
}

// start the playlist
function initPlaylist() {
  $('#player').show();
  $('#about').hide();
	$('#ytplayerid').load('/player/' + search_type + '/' + escape(search) + '/' + videos[currenttrack].VideoID);
	$('#currentVideoTitle').html(videos[currenttrack].VideoTitle);
	$('#currentVideoId').attr('alt',videos[currenttrack].VideoID);
	if ($('#playlist-stuff').find() && search_type != "playlist") {
	  $('#playlist-stuff').show();
	}
	else {
  	$('#playlist-stuff').hide();
	}
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
  $('#q').focus(function() {
    if ($(this).val() == "ENTER ARTIST'S NAME HERE") $(this).val("");
  });
  $('#q').blur(function() {
    if ($(this).val() == "") $(this).val("ENTER ARTIST'S NAME HERE");
  });

  $('.just').click(function() {
     just($('#q').val());
  });
  $('.similar').click(function() {
    similarTo($('#q').val());
  });
  $('.listen-to-playlist').click(function() {
    playlist($('.listen-to-playlist').attr('playlist-id'));
  });

  $('input#q').keypress(function(e) {
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { //Enter keycode  
      if ($('#q').val() != "") {
        just($('#q').val());
      }
    }
  });
  
  $('.add-to-playlist').click(function() {
    $.getJSON('/playlist/video/'+$(this).attr('playlist-id')+'/'+videos[currenttrack].VideoID+"/"+videos[currenttrack].VideoTitle);
  });
});