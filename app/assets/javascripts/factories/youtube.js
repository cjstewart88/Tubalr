angular.module('tubalr.factories')
  .factory('YouTube', ['$resource', '$q', function($resource, $q) {
    var YouTube = $resource('https://www.googleapis.com/youtube/v3/search', { }, {
      query: {
        method: 'JSONP',
        params: {
          'order': 'relevance',
          'maxResults': 1,
          'callback': 'JSON_CALLBACK',
          'videoSyndicated': true,
          'type': 'video',
          'key': 'AIzaSyDoc0Z8XuE0og7YLzVPbf06Ju8-4dgC-j0',
          'part': 'snippet'
        }
      }
    });

    YouTube.search = function(q) {
      var deferred = $q.defer();

      this.query({
        q: q
      }, function(results) {
        if (results.items && results.items[0].id) {
          var video = results.items[0];

          deferred.resolve({
            id:    video.id.videoId,
            title: video.snippet.title
          });
        }
        else {
          deferred.resolve();
        }
      }, function(error) {
        deferred.reject();
      });

      return deferred.promise;
    };

    return YouTube;
  }]);
