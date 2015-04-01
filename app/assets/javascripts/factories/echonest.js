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
      },
      queryArtistSuggest: {
        url: 'http://developer.echonest.com/api/v4/artist/suggest',
        method: 'JSONP',
        params: {
          api_key: 'OYJRQNQMCGIOZLFIW',
          format: 'jsonp',
          callback: 'JSON_CALLBACK',
          results: 10
        }
      },
      queryArtistSongs: {
        url: 'http://developer.echonest.com/api/v4/artist/songs',
        method: 'JSONP',
        params: {
          api_key: 'OYJRQNQMCGIOZLFIW',
          format: 'jsonp',
          callback: 'JSON_CALLBACK',
          results: 40
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

    Echonest.artist = function(artist) {
      var deferred = $q.defer();

      this.queryArtistSongs({
        name: artist
      }, function(result) {
        parseResults({ artist: artist, songs: result.response.songs, deferred: deferred })
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
        search = (opts.artist || songs[i].artist_name) + ' ' + songs[i].title;
        searches.push(YouTube.search(search));
      }

      $q.all(searches).then(function(videos) {
        videos = videos.filter(function(n){ return n != undefined });
        opts.deferred.resolve(videos);
      });
    };

    Echonest.artistSuggest = function(artist) {
      var deferred = $q.defer();

      this.queryArtistSuggest({
        name: artist
      }, function(result) {
        var artists = [];
        for (var i = 1; i < result.response.artists.length; i++) {
          artists.push(result.response.artists[i].name);
        }

        deferred.resolve(artists);
      }, function(error) {
        deferred.reject();
      });

      return deferred.promise;
    };

    return Echonest;
  }]);
