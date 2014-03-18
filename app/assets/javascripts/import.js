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
      $('#import-youtube-playlists-error').hide();
      $('#import-youtube-playlists-importing').show();

      Import.getPlaylistNames();
    })
  },

  importError: function () {
    $('#import-youtube-playlists-form').show();
    $('#import-youtube-playlists-importing').hide();
    $('#import-youtube-playlists-error').show();
  },

  getPlaylistNames: function () {
    var ajax = $.getJSON('https://gdata.youtube.com/feeds/api/users/' + escape(Import.youtubeUsername) + '/playlists?v=2&alt=json-in-script&callback=?', function (data) {
      if (data.feed.entry === undefined) { return false; }

      $.each(data.feed.entry, function () {
        Import.youtubePlaylists.push({
          id:           this.id["$t"].split(":")[5],
          name:         this.title["$t"].replace(/[^a-z\d ]/ig,""),
          videosCount:  this["yt$countHint"]["$t"],
          videos:       []
        });
      });
    });

    $.when(ajax).then(Import.getPlaylistVideos);
  },

  importSinglePlaylist: function(playlistId, withPlaylistName) {
    var ajax = $.getJSON('https://gdata.youtube.com/feeds/api/playlists/' + playlistId + '?v=2&alt=json-in-script&callback=?', function (data) {
      if (data.feed === undefined) { return false; }

      Import.youtubePlaylists.push({
        id:           playlistId,
        name:         withPlaylistName || data.feed.title["$t"].replace(/[^a-z\d ]/ig,""),
        videosCount:  data.feed.entry.length,
        videos:       []
      });
    });

    $.when(ajax).then(Import.getPlaylistVideos);
  },

  getPlaylistVideos: function () {
    if (Import.youtubePlaylists.length == 0) {
      Import.importError();
      return false;
    }

    var ajaxs = [];

    $.each(Import.youtubePlaylists, function (i, playlist) {
      var startIndex  = 1;
      var pages       = Math.ceil(playlist.videosCount/50);

      for (var i = 0; pages > i; i++) {
        ajaxs.push(
          $.getJSON('https://gdata.youtube.com/feeds/api/playlists/' + playlist.id + '?v=2&alt=json-in-script&callback=?&start-index=' + startIndex + '&max-results=50', function (data) {
            if (data.feed.entry === undefined) {
              return false;
            }

            $.each(data.feed.entry, function (i, video) {
              if (Video.isNotBlocked(video)) {
                playlist.videos.push({
                  id:    video.content.src.split('/')[4].split('?')[0],
                  title: video.title.$t
                });
              }
            });
          })
        );

        startIndex += 50;
      }
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
        location.reload();
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