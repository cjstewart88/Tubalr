var History = {

  max_length: 16,

  // flag, whether localstorage is available
  // Method taken from modernizr framework
  available: (function() {
    try {
      localStorage.setItem('__mod', '__mod');
      localStorage.removeItem('__mod');
      return true;
    } catch(e) {
      return false;
    }
  })(),

  playlists: function() {
    var playlists = localStorage.getItem('playlists') || "{}";
    playlists = JSON.parse(playlists);
    window.playlists = playlists;
    return playlists;
  },

  playlistCount: function() {
    return Object.keys(this.playlists()).length;
  },

  set: function(playlists) {
    return localStorage.setItem('playlists', JSON.stringify(playlists));
  },

  sortedKeys: function() {
    var keys = Object.keys(this.playlists());
    // later date is earlier in array
    keys.sort(function(a, b) {
      var date_a = playlists[a].visitTime,
          date_b = playlists[b].visitTime;
      return date_b - date_a;
    });
    return keys;
  },

  // tries to save the current playlist
  update: function() {
    if (!this.available) return;

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
    jQuery.extend(Playlist, playlists[name]);
    Playlist.resultsReady();
  }
};

$(document).ready(function () {
  if (!History.available || History.playlistCount() == 0) {
    $('.history-tab').hide();
  } else {
    var playlists = History.playlists();

    $.each(History.sortedKeys(), function(i, key) {
      var list = playlists[key];
      var date = new Date(list.visitTime);
      var text = list._name + ' ' + date;
      var link = $('<li><a href="#">'+text+'</a></li>');
      link.click(function() {
        History.loadPlaylist(list._name);
      });
      $('.history-tab-content .list').append(link);
    });
  }
});