var isGood = {
  isBlocked: function (video) {
    return video.hasOwnProperty("app$control");
  },

  isMusic: function (video) {
    return video.media$group.media$category[0].$t === "Music";
  },

  isUnique: function (video) {
    var unique = true;
    
    for (var i = 0; i < listen.videos.length; i++) {
      if (videos[i].VideoID === video.id.$t.split(":")[3]) {
        unique = false;
        break;
      }

      var tmpTitle1 = videos[i].VideoTitle.toLowerCase().replace(/ *\([^)]*\) */g, '').replace(/[^a-zA-Z ]/g, "");
      var tmpTitle2 = video.title.$t.toLowerCase().replace(/ *\([^)]*\) */g, '').replace(/[^a-zA-Z ]/g, "");
      
      if (tmpTitle1 === tmpTitle2) {
        unique = false;
        break;
      }
    }
     
    return unique;
  },

  isCoverOrRemix: function (video) {
    var videoTitle = video.title.$t.toLowerCase();

    return (videoTitle.search("cover") >= 0 || videoTitle.search("remix") >= 0 || videoTitle.search("alternate") >= 0);
  }
};