(function($){
  $.fn.trendingArtists = function(options) {
    var self = this;
    var number_of_artists = options.limit;

    $.getJSON("http://ws.audioscrobbler.com/2.0/?method=chart.gethypedartists&api_key=b25b959554ed76058ac220b7b2e0a026&limit=" + number_of_artists + "&format=json&callback=?", function(data) {
      $.each(data.artists.artist, function() {
        var artist = this;
        
        var artist_list_item = $("<li>");
        artist_list_item.text(artist.name);

        $(self).append(artist_list_item);
        
        artist_list_item.click(function() {          
          if (options.font_page) {      
            $("#q").val(artist.name);
            just(artist.name);
            $("#explore").fadeOut();
          }
          else {
            window.open(window.location.protocol+"//"+window.location.host+"/just/"+artist.name);
          }
        });
      });
      
      self.removeClass("loading-list");
    });
  };
})(jQuery);