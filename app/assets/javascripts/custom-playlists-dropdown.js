var customPlaylistsDropdown = {
  init: function () {
    var originalSelect = $('#add-to-playlist-dropdown');
    
    originalSelect.select2({
      width: '170px'
    }).on('change', function changeEvent (e) {
      customPlaylistsDropdown.change(e);
    }).select2('val', null);
  },
  
  change: function (selectedOption) {
    if (selectedOption.val == 'new') {
      customPlaylistsDropdown.createNewPlaylist();
    }
    else {
      customPlaylistsDropdown.addToPlaylist(selectedOption.val);
    }
  },
  
  createNewPlaylist: function () {
    var dropdown  = $('#s2id_add-to-playlist-dropdown');
    
    var ui        = $('#create-new-playlist');
    var name      = $('#create-new-playlist-name');
    var submit    = $('#create-new-playlist-submit');
    var cancel    = $('#create-new-playlist-cancel');

    dropdown.hide();
    ui.show();
    name.val('').focus();
    
    submit.one('click', function () {
      var trimmedName = $.trim(name.val());
      if (trimmedName != "") customPlaylistsDropdown.saveNewPlaylist(trimmedName);
    });
    
    cancel.one('click', function () {
      ui.hide();
      dropdown.show().select2('val', null);
    });
  },
  
  saveNewPlaylist: function (playlistName) {
    $.ajax({
      type: 'POST',
      url: '/playlist/create',
      data: {
        user_id:        User.id,  
        playlist_name:  playlistName,
        video_id:       Playlist.videos[Playlist.currentTrack].videoID,  
        video_title:    Playlist.videos[Playlist.currentTrack].videoTitle
      },
      dataType: 'json',
      success: function (data) {
        var newPlaylistOption = $('<option></option>').val(data.id).text(data.name);
        $('#add-to-playlist-dropdown').append(newPlaylistOption);

        $('#create-new-playlist').hide();
        $('#s2id_add-to-playlist-dropdown').show().select2('val', null);

        $('#notices').append('<aside class="video-added-notice">' + '"<b>' + Playlist.videos[Playlist.currentTrack].videoTitle + '</b>" was added to your "<b>' + data.name + '</b>" playlist' + "</aside>"); 
        
        customPlaylistsDropdown.removeNotices();
      }
    });
  },
  
  addToPlaylist: function (playlistId) {
    var playlistName = $('#add-to-playlist-dropdown option[value=' + playlistId + ']').text();

    $.ajax({
      type: 'POST',
      url: '/playlist/add_video',
      data: {
        playlist_id:    playlistId,
        video_id:       Playlist.videos[Playlist.currentTrack].videoID,  
        video_title:    Playlist.videos[Playlist.currentTrack].videoTitle
      },
      dataType: 'json',
      success: function (data) {
        $('#notices').append('<aside class="video-added-notice">' + '"<b>' + Playlist.videos[Playlist.currentTrack].videoTitle + '</b>" was added to your "<b>' + playlistName + '</b>" playlist' + "</aside>"); 
        $('#add-to-playlist-dropdown').select2('val', null);
        customPlaylistsDropdown.removeNotices();
      }
    });
  },
  
  removeNotices: function () {
    setTimeout(function () {
      $('.video-added-notice').slideUp(500, function () {
        $(this).remove();
      });
    }, 5000);
  }
};

$(document).ready(function () {
  customPlaylistsDropdown.init();
});