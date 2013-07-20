var Tabs = {

  activeTab: null,

  init: function (options) {
    $.extend(Tabs, options);

    Tabs.activateTab(Tabs.activeTab);
  },

  activateTab: function (tabToActivate) {
    Tabs.activeTab = tabToActivate;

    $('.tab-content').removeClass('active');
    $('.' + Tabs.activeTab + '-tab-content').addClass('active');
    
    $('.tab').removeClass('active')
    $('.' + Tabs.activeTab + '-tab').addClass('active');
  }

};

$(document).ready(function () {
  
  Tabs.init({
    activeTab: $($('#tabs ul').children()[0]).data('tab-name')
  });

  $('#tabs .tab').click(function () { 
    Tabs.activateTab($(this).data('tab-name'));
  });

});