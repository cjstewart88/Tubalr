(function($){
  $.fn.trendingArtists = function(options) {
    var self = this;
    var number_of_artists = options.limit;

    $.getJSON("http://developer.echonest.com/api/v4/artist/top_hottt?api_key=OYJRQNQMCGIOZLFIW&format=jsonp&results=" + number_of_artists + "&start=0&bucket=hotttnesss&callback=?", function(data) {
      $.each(data.response.artists, function() {
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
            window.location = window.location.protocol+"//"+window.location.host+"/just/"+artist.name;
          }
        });
      });
      
      self.removeClass("loading-list");
    });
  };
})(jQuery);