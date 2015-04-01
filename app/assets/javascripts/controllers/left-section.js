angular.module('tubalr.controllers')

  .controller('LeftSectionCtrl', ['$scope', '$location', 'Echonest', function($scope, $location, Echonest) {

    $scope.expandSubreddits = false;
    $scope.expandGenres = false;

    $scope.$watch('playlistsSearch', function(newVal, oldVal) {
      // ignore initial update
      if (newVal === oldVal) { return; }

      $scope.expandSubreddits = true;
      $scope.expandGenres = true;

      Echonest.artistSuggest($scope.playlistsSearch).then(function(artists) {
        $scope.artists = artists;
      });
    });

    $scope.onKey = function(event) {
      switch(event.keyCode) {
      case 27: /* esc */
        $scope.playlistsSearch = null;
        break;
      case 13: /* enter */
        if ($scope.playlistsSearch) {
          $location.path('/artists/' + $scope.playlistsSearch);
        }
        break;
      case 38: /* up */
        event.preventDefault();
        console.log('up')
        break;
      case 40: /* down */
        event.preventDefault();
        console.log('down')
        break;
      default:
        break;
      }
    };

  }]);