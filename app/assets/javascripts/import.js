var Import = {

  youtubeUsername: null,

  youtubePlaylists: [],

  init: function (options) {
    Import.youtubePlaylists = [];
    $.extend(Import, options);

    if ($.trim(Import.youtubeUsername) != "") {
      Import.validYoutubeUsername();
    }
  },

  validYoutubeUsername: function () {
    $.getJSON('https://gdata.youtube.com/feeds/api/users/' + Import.youtubeUsername + '?v=2&alt=json-in-script&callback=?', function (data) {
      $('#import-youtube-playlists-form').hide();
      $('#import-youtube-playlists-importing').show();

      Import.getPlaylistNames();
    })
  },

  getPlaylistNames: function () {
    var ajax = $.getJSON('https://gdata.youtube.com/feeds/api/users/' + escape(Import.youtubeUsername) + '/playlists?v=2&alt=json-in-script&callback=?', function (data) {
      $.each(data.feed.entry, function () {
        console.log(this);
        Import.youtubePlaylists.push({
          id:     this.id["$t"].split(":")[5],
          name:   this.title["$t"].replace(/[^a-z\d ]/ig,""),
          videos: []
        });
      });
    });

    $.when(ajax).then(Import.getPlaylistVideos);
  },

  getPlaylistVideos: function () {
    var ajaxs = [];

    $.each(Import.youtubePlaylists, function (i, playlist) {
      ajaxs.push(
        $.getJSON('https://gdata.youtube.com/feeds/api/playlists/' + playlist.id + '?v=2&alt=json-in-script&callback=?', function (data) {
          $.each(data.feed.entry, function (i, video) {
            if (Video.isNotBlocked(video)) {
              var videoID = video.link[0]["href"].toString().split('v=')[1];
              var ampersandPosition = videoID.indexOf('&');
              if (ampersandPosition != -1) {
                videoID = videoID.substring(0, ampersandPosition);
              }

              playlist.videos.push({
                id:    videoID, 
                title: video.title.$t
              });
            }
          });
        })
      );
    });

    $.when.apply($, ajaxs).then(Import.savePlaylists);
  },

  removeEmptyPlaylists: function () {
    var playlists = Import.youtubePlaylists;

    for (var i = 0; i < playlists.length; i++) {
      if (playlists[i].videos.length == 0) {
        playlists.splice(i, 1);
        i--;
      }
    }
  },

  savePlaylists: function () {
    Import.removeEmptyPlaylists();

    $.ajax({
      type: 'POST',
      url: '/import_youtube_playlists',
      data: {
        playlists: Import.youtubePlaylists
      },
      dataType: 'json',
      success: function (data) {
        Import.done();
      }
    });
  },

  done: function () {
    Import.reloadPlaylistsUL();

    $('#import-youtube-playlists').dialog('close');

    $('#notices').append('<aside class="import-youtube-playlist-done-notice"><b>' + Import.youtubeUsername + '</b>\'s playlists successfully imported!</aside>');
    setTimeout(function () {
      $('.import-youtube-playlist-done-notice').slideUp(500, function () {
        $(this).remove();
      });
    }, 5000); 

    $('#import-youtube-playlists-form').show();
    $('#import-youtube-playlists-importing').hide();
    $('#import-youtube-playlists-username').val("");
  },

  reloadPlaylistsUL: function () {
    var playlistUL = $('#playlists-main ul');

    if (playlistUL.length == 0) {
      playlistUL = $("<ul>");
      $('#no-playlists').replaceWith(playlistUL);
    }
    
    $.each(Import.youtubePlaylists, function () {
      if (playlistUL.find('a:contains("' + this.name + '")').length == 0) {
        var newPlaylistLI   = $("<li>").text(this.name);
        var newPlaylistLink = $("<a>").attr('href', '/' + User.username + '/playlist/' + this.name)
                                      .text(this.name);

        newPlaylistLI.html(newPlaylistLink);

        playlistUL.append(newPlaylistLI);
      }
    });
    
  }

};

$(document).ready(function () {

  $('#import-youtube-playlists').dialog({
    modal:      true,
    autoOpen:   false,
    width:      400,
    draggable:  false,
    title:      'Import YouTube Playlists'
  });
  
  $('#import-youtube-playlists-open-dialog').click(function () { 
    $('#import-youtube-playlists').dialog('open'); 
  });

  $('#import-youtube-playlists-form').submit(function () {
    Import.init({
      youtubeUsername: $('#import-youtube-playlists-username').val()
    });

    return false;
  });

});