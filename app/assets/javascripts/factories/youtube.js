angular.module('tubalr.factories')
  .factory('YouTube', ['$resource', '$q', function($resource, $q) {
    var YouTube = $resource('http://gdata.youtube.com/feeds/api/videos', { }, {
      query: {
        method: 'JSONP',
        params: {
          'orderby': 'relevance',
          'start-index': 1,
          'max-results': 10,
          'v': 2,
          'alt': 'json-in-script',
          'callback': 'JSON_CALLBACK'
        }
      }
    });

    YouTube.search = function(q) {
      var deferred = $q.defer();

      this.query({
        q: q
      }, function(results) {
        determineBestVideo(results.feed.entry, deferred);
      }, function(error) {
        deferred.reject();
      });

      return deferred.promise;
    };

    var determineBestVideo = function(videos, deferred) {
      if (!videos) {
        return deferred.resolve(bestVideo);
      }

      var bestVideo = null;

      for (var i = 0; i < videos.length; i++) {
        var video = videos[i];

        if (videoIsNotBlocked(video) && videoIsMusic(video) && videoHasTitle(video)) {
          bestVideo =  {
            id:    video.id.$t.split(":")[3],
            title: video.title.$t
          };

          return deferred.resolve(bestVideo);
        }

        if (i == videos.length-1) {
          return deferred.resolve(bestVideo);
        }
      }
    };

    var videoIsNotBlocked = function(video) {
      return video.yt$accessControl[4].permission != 'denied' && !video.hasOwnProperty('app$control');
    };

    var videoIsMusic = function(video) {
      return video.media$group.media$category[0].$t === "Music";
    };

    var videoHasTitle = function(video) {
      return video.title.$t.trim() != '';
    };

    return YouTube;
  }]);
