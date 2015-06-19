angular.module('tubalr.controllers')

  .controller('LeftSectionCtrl', ['$scope', '$location', function($scope, $location) {

    $scope.onKey = function(event) {
      switch(event.keyCode) {
      case 27: /* esc */
        $scope.playlistsSearch = null;
        break;
      case 13: /* enter */
        event.preventDefault();
        break;
      case 38: /* up */
        event.preventDefault();
        break;
      case 40: /* down */
        event.preventDefault();
        break;
      default:
        break;
      }
    };

  }]);