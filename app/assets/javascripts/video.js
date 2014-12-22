var Video = {

  determineBestVideo: function (youTubeResults, videos) {
    if (youTubeResults) {
      for (var i = 0; youTubeResults.length >= i; i++) {
        var video = youTubeResults[i];

        if (video && Video.isNotBlocked(video) && Video.isMusic(video) && Video.isUnique(video, videos) && Video.excludesWords(video) && Video.hasTitle(video)) {
          return {
            videoID:    video.id.$t.split(":")[3],
            videoTitle: video.title.$t
          };
        }
      }
    }

    return false;
  },

  excludesWords: function (video) {
    var regex = new RegExp(/review|interview|cover|remix|alternate|preview|top albums|top songs|live|concert|camera|episode|acoustic/);
    var test  = null;

    test = video.media$group.media$description.$t.toLowerCase().search(regex);

    if (test === -1) {
      test = video.title.$t.toLowerCase().search(regex);
    }

    return (test === -1 ? true : false);
  },

  isNotBlocked: function (video) {
    return !video.hasOwnProperty("app$control");
  },

  isMusic: function (video) {
    return video.media$group.media$category[0].$t === "Music";
  },

  isUnique: function (video, videos) {
    videos = videos || Playlist.videos;
    var unique = true;

    for (var i = 0; i < videos.length; i++) {
      if (videos[i].videoID === video.id.$t.split(":")[3]) {
        unique = false;
        break;
      }

      var tmpTitle1 = videos[i].videoTitle.toLowerCase().replace(/ *\([^)]*\) */g, '').replace(/[^a-zA-Z ]/g, "");
      var tmpTitle2 = video.title.$t.toLowerCase().replace(/ *\([^)]*\) */g, '').replace(/[^a-zA-Z ]/g, "");

      if (tmpTitle1 === tmpTitle2) {
        unique = false;
        break;
      }
    }

    return unique;
  },

  hasTitle: function (video) {
    return video.title.$t.trim() != '';
  },

  getVideoID: function (videoLinks) {
    var videoID = "";

    $.each(videoLinks, function () {
      var hrefSplit         = this.href.split('v=')[1];
      var ampersandPosition = hrefSplit.indexOf('&');

      if (ampersandPosition != -1) {
        videoID = hrefSplit.substring(0, ampersandPosition);
      }

      if (videoID.length != 11) {
        hrefSplit = this.href.match(/\b([A-Za-z0-9_-]{11})\b/);
        if (hrefSplit != null) {
          videoID = hrefSplit[1];
        }
      }

      if (videoID.length == 11) {
        return false;
      }
    });

    return videoID;
  },

};