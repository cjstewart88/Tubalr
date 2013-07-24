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

  $('#open-about-tubalr').click(function () {
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

  // Tooltips
  $('.tooltip').tipsy({
    gravity: 'n'
  });

  // Dim the lights
  $('#toggle-dim-the-lights').click(function () {
    $(this).find('i').toggleClass('icon-moon icon-sun');
    $('html').toggleClass('dim-the-lights');

    if ($(this).find('i').hasClass('icon-sun')) {
      $(this).find('span').text('Hit The Lights');
    }
    else {
      $(this).find('span').text('Dim The Lights');
    }
  });
});