// variables to be used throughout
var videos = new Array();
var currenttrack = 0;
var search = "";
var search_type = "";
var videosCopy = "";

// 'https://graph.facebook.com/me/tubalrr:listen?access_token=AAADZAnq3uJHwBAPPkGNDRt8AWeD29a731w5xWvQgFqyllsEneIqny0qnoOETnSZBghV6TVANDOE0AlZAZBIwrB9TtlaKMPkC1Yc9ckZC4CNACXAPN2gQP&song=http://samples.ogp.me/239287459457578'
// just a certain artist/band
function just(who) {
  // $("meta[property='og:title']").attr('url','www.tubalr.com/just/'+who);
  //  $("meta[property='og:title']").attr('content',who+' on Tubalr');
  //  $("meta[property='og:url']").attr('description','Listen to ' + who + ' on Tubalr! Tubalr lets you watch your favorite band or artists YouTube videos.');
  //  
  //  
   $.post('https://graph.facebook.com/me/tubalrr:listen?access_token=AAADZAnq3uJHwBAPPkGNDRt8AWeD29a731w5xWvQgFqyllsEneIqny0qnoOETnSZBghV6TVANDOE0AlZAZBIwrB9TtlaKMPkC1Yc9ckZC4CNACXAPN2gQP&song=http://www.tubalr.com/just/'+who, function (data) {
     console.log(data);
   });
  

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

// similar artist/bands
function playlist(id) {
  videos = [];
  currenttrack = 0;
  search = id;
  search_type = "playlist";
  videosCopy = "";
  
	$.getJSON('/playlist/'+id+'.json', function(data) {
	  if (data.length != 0) {
      videos = data;
		  initPlaylist();
	  } 
	  else {
      $('#about').show();
      $('#player').hide();
      $('#playlist-stuff').hide();
	    $('#about span').html("Oh No!")
	    $('#about p').html("You have 0 songs in your playlist, start using Tubalr and add some songs! Dont forget you can share your playlist by sending the URL to your friends!")
	    $('#about span.create-playlist-header').hide().next().hide();
	  } 
	});
}

// start the playlist
function initPlaylist() {
  $('#player').show();
  $('#about').hide();
  $('#no_playlist').hide();
  videosCopy = "";
  $.each(videos, function(i) {
    videosCopy = videosCopy + '<span class="'+i+'"><a href="#" class="delete" onClick="deleteVideo('+i+')">x</a><a href="#" onClick="jumpTo('+i+')">'+this.VideoTitle+'</a><br/></span>';
  });
	$('#playlist div').html(videosCopy);
  // $('#playlist span,#playlist span a.delete').mouseenter(function(){
  //  $(this).find('.delete').show();
  // }).mouseleave(function(){
  //  $(this).find('.delete').hide();
  // });
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
    $.getJSON('/playlist/video/'+$(this).attr('playlist-id')+'/'+videos[currenttrack].VideoID+"/"+videos[currenttrack].VideoTitle, function(){
      $('.video-added').show();
      setTimeout(function(){$('.video-added').hide()}, 2000)
    });
  });
});