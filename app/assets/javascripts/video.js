var Video = {

  isNotBlocked: function (video) {
    return !video.hasOwnProperty("app$control");
  },

  isMusic: function (video) {
    return video.media$group.media$category[0].$t === "Music";
  },

  isUnique: function (video, videos) {
    videos = videos || Playlist.videos
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

  isNotCoverOrRemix: function (video) {
    var videoTitle = video.title.$t.toLowerCase();

    if (videoTitle.search('cover') >= 0 || videoTitle.search('remix') >= 0 || videoTitle.search('alternate') >= 0) {
      return false;
    }
    else {
      return true;
    }
  },

  isNotUserBanned: function (video) {
    return User.bannedVideos.indexOf(video.id.$t.split(":")[3]) == -1
  },

  isNotLive: function (video) {
    var videoDescription  = video.media$group.media$description.$t.toLowerCase();
    var videoTitle        = video.title.$t.toLowerCase();

    if (videoDescription.search('live') >= 0 || videoDescription.search('concert') >= 0 || videoTitle.search('live') >= 0 || videoTitle.search('concert') >= 0) {
      return false;
    }
    else {
      return true;
    }
  },

  hasTitle: function (video) {
    if (video.title.$t.trim() == '') {
      return false;
    }
    else {
      return true;
    }
  }

};