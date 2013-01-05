var Explore = {

  activeTab: null,

  tabs: $('#tabs ul'),

  init: function (options) {
    Explore.youtubePlaylists = [];
    $.extend(Explore, options);

    Explore.activateTab(Explore.activeTab);
  },

  activateTab: function (tabToActivate) {
    Explore.activeTab = tabToActivate;

    $('.tab-content').removeClass('active');
    $('.' + Explore.activeTab + '-tab-content').addClass('active');
    
    $('.tab').removeClass('active')
    $('.' + Explore.activeTab + '-tab').addClass('active');
  }

};

$(document).ready(function () {
  
  Explore.init({
    activeTab: $($('#tabs ul').children()[0]).data('tab-name')
  })

  $('#tabs .tab').click(function () { 
    Explore.activateTab($(this).data('tab-name'));
  });

});