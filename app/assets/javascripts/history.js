var History = {

  max_length: 16,

  // flag, whether localstorage is available
  // Method taken from modernizr framework
  available: function() {
    try {
      localStorage.setItem('__mod', '__mod');
      localStorage.removeItem('__mod');
      return true;
    } catch(e) {
      return false;
    }
  },

  playlists: function() {
    var playlists = localStorage.getItem('playlists') || "{}";
    playlists = JSON.parse(playlists);
    return playlists;
  },

  playlistCount: function() {
    return Object.keys(this.playlists()).length;
  },

  set: function(playlists) {
    return localStorage.setItem('playlists', JSON.stringify(playlists));
  },

  sortedKeys: function() {
    var playlists = this.playlists();
    var keys = Object.keys(playlists);
    // later date is earlier in array
    keys.sort(function(a, b) {
      var date_a = playlists[a].visitTime,
          date_b = playlists[b].visitTime;
      return date_b - date_a;
    });
    return keys;
  },

  sortedPlaylists: function() {
    var lists = this.playlists();
    return $.map(this.sortedKeys(), function(key) {
      return lists[key];
    });
  },

  // tries to save the current playlist
  update: function() {
    if (!this.available()) return;

    var playlistCopy = jQuery.extend(true, {}, Playlist);
    playlistCopy.visitTime = (new Date()).getTime();
    playlistCopy._name = playlistCopy.name();

    var playlists = this.playlists();
    playlists[playlistCopy._name] = playlistCopy;
    this.set(playlists);
    if (playlists.length > this.max_length) {
      this.removeOldest();
    }
  },

  removeOldest: function() {
    var playlists = this.playlists();
    var keys = this.sortedKeys();
    delete playlists[keys[playlists.length-1]];
    this.set(playlists);
  },

  loadPlaylist: function(name) {
    var playlists = this.playlists();
    Playlist.reset();
    jQuery.extend(Playlist, playlists[name]);
    setTimeout(function () { Playlist.resultsReady() }, 2000);
  },

  latest: function() {
    return this.sortedKeys()[0];
  }
};

$(document).ready(function () {
  if (History.available() && History.playlistCount() > 0) {
    $.each(History.sortedPlaylists(), function(i, list) {
      var date = new Date(list.visitTime);
      var text = list._name; // + ' ' + date;
      var link = $('<li><a href="#">'+unescape(text)+'</a></li>');
      link.click(function() {
        History.loadPlaylist(list._name);
      });
      $('#history-list').append(link);
    });

    // check if we're on the main page and this is the first page
    // in this visit. If so and user wishes to resume last
    // playlist, do exactly that.
    var restore_last_playlist = User.resume_last_playlist &&
                                location.pathname == "/" &&
                                document.referrer.indexOf(location.hostname) == -1;
    if (restore_last_playlist) {
      History.loadPlaylist(History.latest());
    }
  } else {
    $('.history-tab').hide();
  }
});