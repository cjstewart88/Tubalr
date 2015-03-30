angular.module('tubalr.services')
  .service('Player', ['$q', '$window', '$rootScope', function($q, $window, $rootScope) {

    var Player = {
      ytApi: null
    };

    Player.init = function(opts) {
      var deferred = $q.defer();

      if (Player.ytApi) {
        Player.ytApi.stopVideo();
        deferred.resolve();
      }
      else {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        $window.onYouTubeIframeAPIReady = function() {
          Player.ytApi = new YT.Player('player', {
            playerVars: {
              autoplay: 1, rel: 0, theme: 'dark', showinfo: 1, iv_load_policy: 3, autohide: 1,
              wmode: 'opaque', allowScriptAccess: 'always', version: 3, restriction: 'US'
            },
            width: 200, height: 100,
            events: {
              onReady: function() {
                deferred.resolve();
              },
              onStateChange: onPlayerStateChange,
              onError: onPlayerError
            }
          });
        };
      }

      return deferred.promise;
    };

    function onPlayerStateChange(newState) {
      if (newState.data == 0) {
        $rootScope.$broadcast('nextVideo');
      }
    };

    function onPlayerError(errorCode) {
      $rootScope.$broadcast('videoError');
    };

    $rootScope.$on('playVideo', function(e, video) {
      Player.ytApi.loadVideoById(video.id)
    });

    return Player;

  }]);
