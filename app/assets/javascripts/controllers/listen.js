angular.module('tubalr.controllers')

  .controller('ListenCtrl', ['$rootScope', '$scope', '$route', '$routeParams', '$q', 'Playlist', 'Player',
    function($rootScope, $scope, $route, $routeParams, $q, Playlist, Player) {

    $rootScope.loading  = true;

    $scope.playlist = Playlist;
    $scope.player   = Player;

    $rootScope.subreddit = $routeParams.subreddit;

    // report to google analytics as pageview
    _gaq.push(['_trackPageview', '/r/'+$rootScope.subreddit]);

    $scope.player.init().then(function() {
      $scope.playlist.build({
        subreddit: $scope.subreddit
      }).then(function() {
        $rootScope.loading  = false;
        $rootScope.error    = null;
      }, function(error) {
        $rootScope.loading = false;
        $rootScope.error   = error;
      });
    });

  }]);
