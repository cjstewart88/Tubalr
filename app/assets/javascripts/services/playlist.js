angular.module('tubalr.services')
  .service('Playlist', ['$q', '$rootScope', 'Reddit', function($q, $rootScope, Reddit) {

    var Playlist = {
      videos:            [],
      subreddit:         null,
      type:              null,
      currentVideoIndex: null,
      direction:         'forward'
    };

    Playlist.build = function(opts) {
      var deferred = $q.defer();

      Playlist.subreddit = opts.subreddit;
      Playlist.type      = opts.type;
      Playlist.videos    = [];

      Reddit.subreddit(this.subreddit).then(function(videos) {
        videosReady(videos, deferred);
      }, function() {
        deferred.reject('Playlist could not be built');
      });

      return deferred.promise;
    };

    var videosReady = function(videos, deferred) {
      Playlist.videos = videos;
      Playlist.currentVideoIndex = 0;
      $rootScope.$broadcast('playVideo', Playlist.videos[Playlist.currentVideoIndex]);
      deferred.resolve();
    };

    Playlist.jumpToVideo = function(index) {
      Playlist.currentVideoIndex = index;
      $rootScope.$broadcast('playVideo', this.videos[this.currentVideoIndex]);
    };

    Playlist.nextVideo = function(opts) {
      opts = opts || {};
      this.direction = 'forward';

      if (this.currentVideoIndex == this.videos.length-1) {
        this.currentVideoIndex = 0;
      }
      else {
        this.currentVideoIndex += 1;
      }

      if (opts.forceDigest)  $rootScope.$apply();
      $rootScope.$broadcast('playVideo', this.videos[this.currentVideoIndex]);
    };

    Playlist.previousVideo = function(opts) {
      opts = opts || {};
      this.direction = 'backward';

      if (this.currentVideoIndex == 0) {
        this.currentVideoIndex = Playlist.videos.length-1;
      }
      else {
        this.currentVideoIndex -= 1;
      }

      if (opts.forceDigest)  $rootScope.$apply();
      $rootScope.$broadcast('playVideo', this.videos[this.currentVideoIndex]);
    };

    $rootScope.$on('nextVideo', function(e, video) {
      Playlist.nextVideo({ forceDigest: true });
    });

    $rootScope.$on('videoError', function(e) {
      if (Playlist.direction == "backward") {
        Playlist.previousVideo({ forceDigest: true });
      }
      else {
        Playlist.nextVideo({ forceDigest: true });
      }
    });

    return Playlist;

  }]);
