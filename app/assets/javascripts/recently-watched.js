(function($){
  $.fn.recentlyWatched = function (options) {
    var self = this;
    var number_of_videos = options.limit;
    var ajaxs = [];
    
    $.getJSON("/recently_watched/" + number_of_videos, function (videos) {
      $.each(videos, function(i, video_id) {
        var the_video = {
          id: video_id
        };
        
        ajaxs.push($.getJSON('https://gdata.youtube.com/feeds/api/videos/' + the_video.id + '?v=2&alt=json-in-script&callback=?', function (data) {
      		var single_vid = data.entry;
    		
          if (typeof single_vid !== "undefined") {      
            the_video.title = single_vid.title.$t;
            
            var video_list_item = $("<li>");
            video_list_item.text(the_video.title);
            $(self).append(video_list_item);

            video_list_item.click(function () {    
              if (options.font_page) {   
                video(the_video.id);
                $("#explore").fadeOut();
              }
              else {
                window.location = window.location.protocol+"//"+window.location.host+"/video/"+the_video.id;
              }
            });
      		}
      	}))      	
      });
      
      $.when.apply($,ajaxs).then(function () {
        self.removeClass("loading-list");
      });
    });
  };
})(jQuery);