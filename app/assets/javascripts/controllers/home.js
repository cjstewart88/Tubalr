angular.module('tubalr.controllers')

  .controller('HomeCtrl', ['$scope', 'Player', function($scope, Player) {

    if (Player.ytApi) {
      Player.ytApi.stopVideo();
    }

  }]);