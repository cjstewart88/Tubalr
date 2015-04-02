angular.module('tubalr.factories')
  .factory('Echonest', ['$resource', '$q', 'YouTube', function($resource, $q, YouTube) {
    var Echonest = $resource('', { }, {
      queryGenre: {
        url: 'http://developer.echonest.com/api/v4/playlist/basic',
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
      }, function(result) {
        parseResults({ songs: result.response.songs, deferred: deferred })
      }, function(error) {
        deferred.reject();
      });

      return deferred.promise;
    };

    var parseResults = function(opts) {
      var searches = [];

      var songs = opts.songs;
      var videos = [];

      for (var i = 1; i < songs.length; i++) {
        search = songs[i].artist_name + ' ' + songs[i].title;
        searches.push(YouTube.search(search));
      }

      $q.all(searches).then(function(videos) {
        videos = videos.filter(function(n){ return n != undefined });
        opts.deferred.resolve(videos);
      });
    };

    return Echonest;
  }]);
