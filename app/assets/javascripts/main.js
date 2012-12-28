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
    width:      600,
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

  // Fade in and focus the search input field.
  $('#main').delay(500).fadeIn(500, function () {
    if ($('#q').val() == "") {
      $("#q").focus();
    }
  });

  // Tooltips
  $('.tooltip').tipsy({
    gravity: 'n'
  });

  // If Mobile do this shit, nasty
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)    || navigator.userAgent.match(/BlackBerry/i)) {
    $('.social').remove();
    $('#notices').remove();
    $('.about-tubalr').remove();
    $('.settings-link').remove();
    $('#s2id_add-to-playlist-dropdown').remove();
    $('#ytplayerid').addClass('mobile-ytplayerid');
    $('body').addClass('mobile-body');
    $('#listenForm input').addClass('mobile');
    $('.why-register').remove();
  }
});