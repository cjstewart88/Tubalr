$(document).ready(function () {
  if (typeof FB !== "undefined") {
    FB.init({
      appId   : '239275546125436',
      status  : true,
      cookie  : true,
      xfbml   : true
    });
  }

  // About Tubalr Dialog
  $('#about-tubalr').dialog({
    modal:      true,
    autoOpen:   false,
    width:      800,
    draggable:  false,
    title:      'About Tubalr'
  });

  $('.about-tubalr').click(function () {
    $('#about-tubalr').dialog('open');
  });

  // If there's rails invoked flash messages, fade them out.
  if ($('.flash-msg')) {
    setTimeout(function () {
      $('.flash-msg').slideUp(500, function () {
        $(this).remove();
      });
    }, 5000);
  }

  // focus the search input field.
  if ($('#q').val() == "") {
    $("#q").focus();
  }

  // popup search
  $('#popup-search').dialog({
    width:        '350px',
    dialogClass:  'popup-search-dialog',
    autoOpen:     false,
    draggable:    true,
    title:        'Mix in Videos',
    position:     [($(window).width() / 2) - (350 / 2), 150]
  });

  $("#add-songs").click(function (e) {
    $('#popup-search').dialog('open');
    $('#popup-search-query').focus();
    $('#popup-search-results').sortable({
      zIndex: 999999,
      connectWith: '#playlist',
      stop: function (event, ui) {
        event.stopImmediatePropagation();
      }
    });
  });

  $('#popup-search-query').keyup(function (e) {
    if (e.which == '13') { //enter key pressed
      Playlist.popupSearch();
    }
  });

  $('#search-popup-btn').click(Playlist.popupSearch);

  // Tooltips
  $('.tooltip').tipsy({
    gravity: 'n'
  });
});