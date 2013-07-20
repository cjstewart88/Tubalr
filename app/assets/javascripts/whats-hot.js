var WhatsHot = {

  // Simply render the list of artists

  render: function (options) {
    for (var artist in options.artists) {
      var li          = $("<li>");
      var a           = $("<a>").attr("href", "/just/" + encodeURIComponent(artist));
      var cover       = $("<div>").addClass("cover").css('background-image', 'url(' + options.artists[artist] + ')');
      var artistName  = $("<span>").text(artist);

      a.append(cover).append(artistName);
      li.append(a);
      options.el.append(li);
    }
  },

  // Fetch new artists
  
  fetchArtists: function () {
    WhatsHot.artists = {};

    var genres = ["rock", "electronic", "hip hop", "indie rock", "techno", "hard rock", "indie folk", "indie pop", "electro", "trance", "alternative rock", "reggae", "dub"];
    var ajaxs = [];

    for (var i = 0; i < genres.length; i++) {
      ajaxs.push($.getJSON("http://developer.echonest.com/api/v4/artist/top_hottt?api_key=OYJRQNQMCGIOZLFIW&format=json&results=10&genre=" + genres[i] + "&start=0&bucket=hotttnesss&bucket=id:7digital-US", function (data) {
        $.each(data.response.artists, function (i, artist) {
          if (!WhatsHot.artists[artist.name]) {
            WhatsHot.artists[artist.name] = {
              "sevenDigitalId": artist.foreign_ids[0].foreign_id.split(":")[2],
              "image": null
            }
          }
        });
      }));
    }

    $.when.apply($, ajaxs).then(WhatsHot.fetchArtistsImage);
  },

  fetchArtistsImage: function () {
    var ajaxs = [];

    $.each(WhatsHot.artists, function (artist, properties) {
      ajaxs.push($.getJSON("http://api.7digital.com/1.2/artist/releases?oauth_consumer_key=7danrkm5dhc8&pageSize=1&imageSize=175&artistId=" + this.sevenDigitalId, function (data) {
        if (data.releases.release.length == 1) {
          WhatsHot.artists[artist] = data.releases.release[0].image;
        }
        else {
          delete WhatsHot.artists[artist];
        }
      }));
    });

    $.when.apply($, ajaxs).then(function () {
      console.log("Finished! Now use, copy(JSON.stringify(WhatsHot.artists).replace(/\":\"/g,'\"=>\"')), to copy what's hot results to your clipboard.");
    });
  }

};
