angular.module('tubalr.controllers')

  .controller('ListenCtrl', ['$scope', '$routeParams', '$q', 'Playlist', 'Player',
    function($scope, $routeParams, $q, Playlist, Player) {

    $scope.loading  = true;

    $scope.playlist = Playlist;
    $scope.player   = Player;

    $scope.player.init().then(function() {
      $scope.playlist.build({
        type:   $routeParams.playlist_type,
        search: $routeParams.playlist_search
      }).then(function() {
        $scope.loading  = false;
      }, function(error) {
        $scope.loading = false;
        $scope.error   = error;
      });

    });

  }]);
