(function($){
  $.fn.topGenres = function (options) {
    var self = this;
    var number_of_genres = options.limit;
    
    $.getJSON("http://developer.echonest.com/api/v4/artist/top_terms?api_key=OYJRQNQMCGIOZLFIW&format=jsonp&callback=?&results=" + number_of_genres, function (data) {
      $.each(data.response.terms, function () {
        var genre = this;
        
        var genre_list_item = $("<li>");
        genre_list_item.text(genre.name);

        $(self).append(genre_list_item);
        
        genre_list_item.click(function () {    
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