(function($){
  $.fn.randomPlaylists = function (options) {
    var self = this;
    var number_of_playlists = options.limit;

    $.getJSON("/get_random_playlists/" + number_of_playlists, function (playlists) {
      $.each(playlists, function(i, playlist) {
        console.log(playlist);
        var the_playlist = {
          url:  playlist["playlist_url"],
          name: playlist["playlist_name"]
        };
        
        var playlist_list_item = $("<li>");
        playlist_list_item.text(the_playlist.name);
        $(self).append(playlist_list_item);

        playlist_list_item.click(function () {    
          window.location = window.location.protocol+"//"+window.location.host+the_playlist.url;
        });     	
      });
      
      self.removeClass("loading-list");
    });
  };
})(jQuery);