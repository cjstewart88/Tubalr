angular.module('tubalr.factories')
  .factory('Echonest', ['$resource', '$q', 'YouTube', function($resource, $q, YouTube) {
    var Echonest = $resource('http://developer.echonest.com/api/v4/playlist/basic', { }, {
      queryGenre: {
        method: 'JSONP',
        params: {
          api_key: 'OYJRQNQMCGIOZLFIW',
          format: 'jsonp',
          callback: 'JSON_CALLBACK',
          results: 40,
          type: 'genre-radio'
        }
      }
    });

    Echonest.genre = function(genre) {
      var deferred = $q.defer();

      this.queryGenre({
        genre: genre
      }, function(results) {
        parseResults(results.response, deferred)
      }, function(error) {
        deferred.reject();
      });

      return deferred.promise;
    };

    var parseResults = function(results, deferred) {
      var searches = [];

      var songs = results.songs;
      var videos = [];

      for (var i = 1; i < songs.length; i++) {
        searches.push(YouTube.search(songs[i].artist_name + ' ' + songs[i].title));
      }

      $q.all(searches).then(function(videos) {
        videos = videos.filter(function(n){ return n != undefined });
        deferred.resolve(videos);
      });
    };

    return Echonest;
  }]);
