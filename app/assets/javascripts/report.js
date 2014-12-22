var Report = {

  gaPageview: function () {
    var url;

    if (Playlist.options.searchType == 'video') {
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
  }

};
