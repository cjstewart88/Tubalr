(function($){
  $.fn.topGenres = function(options) {
    var self = this;
    var number_of_genres = options.limit;
    
    $.getJSON("http://ws.audioscrobbler.com/2.0/?method=chart.gettoptags&api_key=b25b959554ed76058ac220b7b2e0a026&limit=" + number_of_genres + "&format=json&callback=?", function(data) {
      $.each(data.tags.tag, function() {
        var genre = this;
        
        var genre_list_item = $("<li>");
        genre_list_item.text(genre.name);

        $(self).append(genre_list_item);
        
        genre_list_item.click(function() {    
          if (options.font_page) {      
            $("#q").val(genre.name);
            genreSearch(genre.name);
            $("#explore").fadeOut();
          }
          else {
            window.location = window.location.protocol+"//"+window.location.host+"/genre/"+genre.name;
          }
        });
      });
      
      self.removeClass("loading-list");
    });
  };
})(jQuery);