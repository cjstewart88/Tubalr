angular.module('tubalr.controllers')

  .controller('LeftSectionCtrl', ['$scope', '$location', 'Echonest', function($scope, $location, Echonest) {

    $scope.expandSubreddits = false;
    $scope.expandGenres = false;

    $scope.$watch('playlistsSearch', function(newVal, oldVal) {
      // ignore initial update
      if (newVal === oldVal) { return; }

      $scope.expandSubreddits = true;
      $scope.expandGenres = true;
    });

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