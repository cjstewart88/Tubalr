angular.module('tubalr.services')
  .service('Playlist', ['$q', 'Echonest', 'Reddit', function($q, Echonest, Reddit) {

    var Playlist = {
      videos: [],
      search: null,
      type:   null
    };

    Playlist.build = function(opts) {
      var deferred = $q.defer();

      var playlist    = this;

      playlist.search = opts.search;
      playlist.type   = opts.type;
      playlist.videos = [];

      if (this.type == 'r') {
        Reddit.subreddit(this.search).then(function(videos) {
          playlist.videos = videos;
          deferred.resolve();
        }, function() {
          deferred.reject('Playlist could not be built');
        });
      }

      return deferred.promise;
    }

    return Playlist;

  }]);
