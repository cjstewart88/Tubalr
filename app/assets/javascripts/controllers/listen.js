angular.module('tubalr.controllers')

  .controller('ListenCtrl', ['$rootScope', '$scope', '$routeParams', '$q', 'Playlist', 'Player',
    function($rootScope, $scope, $routeParams, $q, Playlist, Player) {

    $rootScope.loading  = true;

    $scope.playlist = Playlist;
    $scope.player   = Player;

    $rootScope.playlist_type   = $routeParams.playlist_type;
    $rootScope.playlist_search = $routeParams.playlist_search;

    $scope.yourListeningTo = function() {
      if ($rootScope.playlist_type == 'r') {
        return '/r/' + $routeParams.playlist_search;
      }
      else if($rootScope.playlist_type == 'genres') {
        return $routeParams.playlist_search;
      }
    };

    $scope.player.init().then(function() {
      $scope.playlist.build({
        type:   $scope.playlist_type,
        search: $scope.playlist_search
      }).then(function() {
        $rootScope.loading  = false;
        $rootScope.error    = null;
      }, function(error) {
        $rootScope.loading = false;
        $rootScope.error   = error;
      });
    });

  }]);
