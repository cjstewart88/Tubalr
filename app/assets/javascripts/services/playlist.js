angular.module('tubalr.services')
  .service('Playlist', ['$q', '$rootScope', 'Echonest', 'Reddit', function($q, $rootScope, Echonest, Reddit) {

    var Playlist = {
      videos:            [],
      search:            null,
      type:              null,
      currentVideoIndex: null,
      direction:         'forward'
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
          playlist.currentVideoIndex = 0;
          $rootScope.$broadcast('playVideo', Playlist.videos[Playlist.currentVideoIndex]);
          deferred.resolve();
        }, function() {
          deferred.reject('Playlist could not be built');
        });
      }

      return deferred.promise;
    };

    Playlist.nextVideo = function() {
      this.direction = 'forward';

      if (this.currentVideoIndex == this.videos.length-1) {
        this.currentVideoIndex = 0;
      }
      else {
        this.currentVideoIndex += 1;
      }
    };

    Playlist.previousVideo = function() {
      this.direction = 'backward';

      if (this.currentVideoIndex == 0) {
        this.currentVideoIndex = Playlist.videos.length-1;
      }
      else {
        this.currentVideoIndex -= 1;
      }
    };

    return Playlist;

  }]);
