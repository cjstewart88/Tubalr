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
    else if (Playlist.options.searchType == 'reddit') {
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

  gaVideoView: function () {
    _gaq.push(['_trackEvent', 'video', 'watched in full', Playlist.videos[Playlist.currentTrack].videoID]);
  },

  gaPing: function () {
    _gaq.push(['_trackEvent', 'ping', 'pong']);
  },

  event: function (params) {
    if (User.id) {
      $.post('/api/event', { event: JSON.stringify(params) });
    }
  }

}