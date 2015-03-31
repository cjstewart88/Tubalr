angular.module('tubalr.factories')
  .factory('Reddit', ['$resource', '$q', function($resource, $q) {

    var Reddit = $resource('http://www.reddit.com/r/:subreddit/hot.json', { }, {
      query: {
        method: 'JSONP',
        params: {
          jsonp: 'JSON_CALLBACK',
          limit: 100
        }
      }
    });

    Reddit.subreddit = function(subreddit) {
      var deferred = $q.defer();

      this.query({
        subreddit: subreddit
      }, function(results) {
        deferred.resolve(parsePostsForVideos(results));
      }, function(error) {
        deferred.reject();
      });

      return deferred.promise;
    };

    var parsePostsForVideos = function(results) {
      var videos = [];
      var posts = results.data.children;
      for (var i = 0; i < posts.length; i++) {
        var post = posts[i].data;

        if (post.domain == "youtube.com" && post.media != null && typeof post.media === 'object'
          && post.media.hasOwnProperty("oembed") && post.media.oembed.url !== undefined) {
          var videoId = youtubeVideo(post.media.oembed.url);

          if (videoId) {
            videos.push({
              id:    videoId,
              title: post.media.oembed.title.replace(/&amp;/g, '&')
            });
          }
        }
      }

      return videos;
    };

    function youtubeVideo(url) {
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = url.match(regExp);
      if (match&&match[7].length==11) {
        return match[7];
      }
    }

    return Reddit;

  }]);
