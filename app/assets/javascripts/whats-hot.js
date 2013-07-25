var WhatsHot = {

  init: function (options) {
    if (options.el) {
      options.el.parent().append('<div class="loading"><i class="icon-refresh icon-spin icon-3x"></i></div>');
    }

    if (options.artists) {
      WhatsHot.render(options);
    }
    else {
      WhatsHot.fetchArtists(options);
    }
  },

  // Simply render the list of artists

  render: function (options) {
    var numberOfImages  = Object.keys(options.artists).length;
    var loadedImages    = 0;

    var checkForLoadingImages = setInterval(function () {
      if (loadedImages == numberOfImages) {
        window.clearInterval(checkForLoadingImages);

        if (options.el.parent().is(":visible")) {
          options.el.parent().find('.loading').fadeOut(function () {
            $(this).remove();
            options.el.fadeIn();
          });
        }
        else {
          options.el.parent().find('.loading').remove()
          options.el.show();
        }
      }
    }, 100);

    for (var artist in options.artists) {
      var li  = $("<li>");
      var a   = $("<a>").attr("href", "/just/" + encodeURIComponent(artist));
      
      $('<img/>').attr('src', options.artists[artist]).load(function() {
        loadedImages++;
      });

      var cover       = $("<div>").addClass("cover").css('background-image', 'url(' + options.artists[artist] + ')');
      var artistName  = $("<span>").text(artist);

      a.append(cover).append(artistName);
      li.append(a);
      options.el.append(li);
    }
  },

  // Fetch new artists
  
  fetchArtists: function (options) {
    var genres  = options.genres || ["rock", "electronic", "hip hop", "indie rock", "techno", "hard rock", "indie folk", "indie pop", "electro", "trance", "alternative rock", "reggae", "dub"];
    var ajaxs   = [];

    options.artists = {};

    for (var i = 0; i < genres.length; i++) {
      ajaxs.push($.getJSON("http://developer.echonest.com/api/v4/artist/top_hottt?api_key=OYJRQNQMCGIOZLFIW&format=json&results=" + options.count + "&genre=" + genres[i] + "&start=0&bucket=hotttnesss&bucket=id:7digital-US", function (data) {
        $.each(data.response.artists, function (i, artist) {
          if (!options.artists[artist.name] && artist.foreign_ids) {
            options.artists[artist.name] = {
              "sevenDigitalId": artist.foreign_ids[0].foreign_id.split(":")[2],
              "image": null
            }
          }
        });
      }));
    }

    $.when.apply($, ajaxs).then(function () { 
      WhatsHot.fetchArtistsImage(options) 
    });
  },

  fetchArtistsImage: function (options) {
    var ajaxs = [];

    $.each(options.artists, function (artist, properties) {
      ajaxs.push($.getJSON("http://api.7digital.com/1.2/artist/releases?oauth_consumer_key=7danrkm5dhc8&pageSize=1&imageSize=175&artistId=" + this.sevenDigitalId, function (data) {
        if (data.releases.release.length == 1) {
          options.artists[artist] = data.releases.release[0].image;
        }
        else {
          delete options.artists[artist];
        }
      }));
    });

    $.when.apply($, ajaxs).then(function () {
      if (options.el) {
        WhatsHot.render(options);
      }
      else {
        WhatsHot.copyToLibrary = options.artists;
        console.log("Finished! Now use, copy(JSON.stringify(WhatsHot.copyToLibrary).replace(/\":\"/g,'\"=>\"')), to copy what's hot results to your clipboard.");  
      }
    });
  }

};
