angular.module('tubalr.services')
  .service('Player', ['$q', '$window', '$rootScope', '$interval', function($q, $window, $rootScope, $interval) {

    var Player = {
      ytApi: null,
      state: 'playing',
      currentTime: 0,
      percentPlayed: 0
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
      else if (newState.data == 1) {
        Player.state = 'playing';
        $rootScope.$apply();
      }
      else if (newState.data == 2) {
        Player.state = 'paused';
        $rootScope.$apply();
      }
    };

    function onPlayerError(errorCode) {
      $rootScope.$broadcast('videoError');
    };

    var updatePlayerInfo;
    $rootScope.$on('playVideo', function(e, video) {
      Player.ytApi.loadVideoById(video.id);

      updatePlayerInfo = $interval(function() {
        elapsed = Player.ytApi.getCurrentTime();
        duration = Player.ytApi.getDuration();
        Player.currentTime = elapsed;
        Player.percentPlayed = (elapsed/duration)*100;

      }, 100);
    });

    return Player;

  }]);
