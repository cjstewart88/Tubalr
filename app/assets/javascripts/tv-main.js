var videos            = new Array();
var current_video      = 0;

var tag               = null;
var firstScriptTag    = null;
var thePlayer;


function load_channel (channel) {
  $('.just').addClass('listen-active');
  videos        = [];
  current_video = 0;
  $.getJSON('http://gdata.youtube.com/feeds/api/videos?q=' + channel + '&orderby=relevance&start-index=1&max-results=50&v=2&alt=json-in-script&callback=?', function(data) {
    $.each(data.feed.entry, function(i, video) {
      videos[i] = { 
        VideoID: video.id.$t.split(":")[3], 
        VideoTitle: video.title.$t 
      };
    });
    init_channel();
  });
}

function init_channel () {
  $('button').show();
  
  videos.sort(function () { return (Math.round(Math.random())-0.5); });
  
  thePlayer.loadVideoById(videos[0].VideoID, 0);
}

function onYouTubePlayerAPIReady() {
  thePlayer = new YT.Player('youtube-player', {
    width: '100%',
    height: '100%',
    version: 3,
    playerVars: { 'autoplay': 1, 'rel': 0, 'theme': 'dark', 'showinfo': 0, 'autohide': 1, 'wmode': 'opaque', 'allowScriptAccess': 'always', 'version': 3, 'restriction': 'US' },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange,
      'onError': onPlayerError
    }
  });
}

function onPlayerStateChange (newState) {
	if (newState.data == 0) {
    next_video();
  }
}

function onPlayerError (errorCode) { }

function onPlayerReady () { }

function next_video () {
  if (current_video == videos.length-1) {
		current_video = 0;
		thePlayer.loadVideoById(videos[current_video].VideoID, 0);
	}
	else {
		current_video = current_video+=1;
		thePlayer.loadVideoById(videos[current_video].VideoID, 0);
	}
	return false;
}

function prev_video () {
	if (current_video == 0) {
		current_video = videos.length-1;
		thePlayer.loadVideoById(videos[current_video].VideoID, 0);
	}
	else {
		current_video = current_video-=1;
		thePlayer.loadVideoById(videos[current_video].VideoID, 0);
	}
	return false;
}

$(document).ready(function () { 
  var tag = document.createElement('script');
  tag.src = "http://www.youtube.com/player_api?version=3";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  $('#guide').dialog({
    modal: true,
    autoOpen: true,
    width: 790,
    height: 520,
    draggable: false,
    title: 'Tubalr TV - Guide'
  });
  
  $('#guide').dialog({
    beforeClose: function (event, ui) { 
      if (videos.length > 0) {
        $('button').show();
      }
      else {
        $('#open-guide').show();
      }
    },
    open: function (event, ui) {
      $('button').hide();
    }
  });
  
  $('#open-guide').click(function () { $('#guide').dialog('open'); });
  
  $('#prev-video').click(function () { prev_video(); });
  $('#next-video').click(function () { next_video(); });
    
  $('.channel').click(function () {
    load_channel($(this).text());
    $('#guide').dialog('close');
  });
});