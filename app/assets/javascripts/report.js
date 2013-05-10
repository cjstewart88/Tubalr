var Report = {

  gaPageview: function () {
    var url;

    if (Playlist.options.djUsername) {
      return;
    }
    else if (Playlist.options.searchType == 'customPlaylist') {
      url = [Playlist.options.customPlaylistOwner.replace(/[ ]/g,"+"), "playlist", Playlist.options.customPlaylistName.replace(/[ ]/g,"+")];
    }
    else if (Playlist.options.searchType == 'video') {
      url = [Playlist.options.searchType, Playlist.options.videoID];
    }
    else if (Playlist.options.searchType == 'subreddit') {
      url = ['r', Playlist.options.subReddit];
    }
    else {
      url = [Playlist.options.searchType, Playlist.options.search.replace(/[ ]/g,"+")];
    }

    // check to make sure the pageview we are trying to report is not a direct path
    // that's already been reported
    if ('/' + url.join('/') != decodeURIComponent(location.pathname)) {
      _gaq.push(['_trackPageview', url.join('/')]);
    }
  },

  gaPing: function () {
    _gaq.push(['_trackEvent', 'ping', 'pong']);
  },

  reportWatchedVideo: function () {
    var params = {
      video_id:     Playlist.videos[Playlist.currentTrack].videoID,
      video_title:  Playlist.videos[Playlist.currentTrack].videoTitle,
      user_agent:   'web'
    }

    if (User.id != null) {
      params["user_id"] = User.id;
    }

    $.ajax({
      type:     'POST',
      url:      '/api/analytics/report_watched_video',
      dataType: 'json',
      data:     params
    });
  }

}