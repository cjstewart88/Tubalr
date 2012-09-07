(function($){
  // For prowsers that dont support .filter
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
      "use strict";

      if (this == null) throw new TypeError();

      var t = Object(this);
      var len = t.length >>> 0;
      if (typeof fun != "function") throw new TypeError();

      var res = [];
      var thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i];
          if (fun.call(thisp, val, i, t)) res.push(val);
        }
      }

      return res;
    };
  }
  // end support for dumb browsers
  
  $.fn.autoArtist = function () {
    var self  = this;
    
    self.el           = $(this);
    self.cache        = [];
    self.suggestions  = $("<ul>").attr("id", "auto-artists-suggestions");
    self.inputVal     = null;
    
    self.init();
    
    self.init = function () {
      self.typingListener();
    }
    
    self.setupTimeout = function () {
      if (self.timeout) {
        clearTimeout(self.timeout);
        delete self.timeout;
      }
    }
    
    self.typingListener = function () {
      self.el.keyup(function (e) {
        self.inputVal = self.el.val();
        
        switch (e.keyCode) {
          case 13:
            // press enter
            self.setupTimeout();
            self.suggestions.hide();
            break;
          case 8: 
            // backspace
            self.cache = [];
            
            if (self.inputVal.length > 2) {
              self.setupTimeout();
              self.timeout  = setTimeout(self.search, 1000);
            }
            else {
              self.render();
            }
            
            break;
          default:
            // typing normal
            if (self.inputVal.length > 2) {
              self.setupTimeout();
              self.timeout = setTimeout(self.search, 1000);
            }
            
            break;
        }
      });
    }
    
    self.search = function () {
      if (self.cache.length == 0) {
        self.echoNestSearch();
      }
      else {
        self.useCache();
      }
    }
    
    self.echoNestSearch = function () {
      var apiCall = $.getJSON("http://developer.echonest.com/api/v4/artist/suggest?api_key=OYJRQNQMCGIOZLFIW&format=jsonp&name=" + self.inputVal + "&results=10&callback=?", function (data) {
        $.each(data.response.artists, function () {
          self.cache.push(this.name);
        });
      });
      
      $.when(apiCall).done(self.render);      
    }
    
    self.useCache = function () {
      self.cache = self.cache.filter(function (element, index, array) {
        var pattern = new RegExp(self.inputVal, 'i');
        return element.match(pattern);
      });
      
      self.render();
    }
    
    self.render = function () {
      self.suggestions.html("");
      
      if (self.cache.length == 0) {
        self.suggestions.hide();
        return;
      }
      
      $.each(self.cache, function (i, artist) {
        var suggestion = $("<li>");
        
        suggestion.text(artist)
                  .addClass("auto-artists-suggestions-suggestion");
                  
        self.suggestions.append(suggestion);
      });
      
      self.el.after(self.suggestions);
      
      var lPadding = parseInt(self.el.css('paddingLeft'));
      var rPadding = parseInt(self.el.css('paddingRight'));
      var tPadding = parseInt(self.el.css('paddingTop'));
      var bPadding = parseInt(self.el.css('paddingBottom'));
      
      var height  = self.el.height()  + tPadding + bPadding;
      var width   = self.el.width()   + lPadding + rPadding;
      
      var offset  = self.el.offset();
      var top     = offset.top  + height + "px";
      var left    = offset.left + "px";
      
      self.suggestions.css({ "top" : top, "left" : left, "width" : width })
                      .show();
                      
      self.events();                
    }
    
    self.events = function () {
      $('html').click(function () {
        self.cache = [];
        self.suggestions.hide();
      });
      
      $(window).blur(function () { 
        self.cache = [];
        self.suggestions.hide();
      });
      
      $('.auto-artists-suggestions-suggestion').click(function (e) {
        e.stopPropagation();
        $("#q").val($(this).text());
        self.suggestions.hide();
      });
    }
    
    self.init();
  }
})(jQuery);