var Video = {

  isNotBlocked: function (video) {
    return !video.hasOwnProperty("app$control");
  },

  isMusic: function (video) {
    return video.media$group.media$category[0].$t === "Music";
  },

  isUnique: function (video) {
    var unique = true;
    
    for (var i = 0; i < Playlist.videos.length; i++) {
      if (Playlist.videos[i].videoID === video.id.$t.split(":")[3]) {
        unique = false;
        break;
      }

      var tmpTitle1 = Playlist.videos[i].videoTitle.toLowerCase().replace(/ *\([^)]*\) */g, '').replace(/[^a-zA-Z ]/g, "");
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

    return (videoTitle.search("cover") == -1 && videoTitle.search("remix") && -1 || videoTitle.search("alternate") && -1);
  },

  isNotUserBanned: function (video) {
    return User.bannedVideos.indexOf(video.id.$t.split(":")[3]) == -1
  }

};