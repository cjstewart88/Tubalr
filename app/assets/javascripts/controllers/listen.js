angular.module('tubalr.controllers')

  .controller('ListenCtrl', ['$rootScope', '$scope', '$routeParams', '$q', 'Playlist', 'Player',
    function($rootScope, $scope, $routeParams, $q, Playlist, Player) {

    $rootScope.loading  = true;

    $scope.playlist = Playlist;
    $scope.player   = Player;

    $scope.player.init().then(function() {
      $scope.playlist.build({
        type:   $routeParams.playlist_type,
        search: $routeParams.playlist_search
      }).then(function() {
        $rootScope.loading  = false;
        $rootScope.error    = null;
      }, function(error) {
        $rootScope.loading = false;
        $rootScope.error   = error;
      });
    });

  }]);
