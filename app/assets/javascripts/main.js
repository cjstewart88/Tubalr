function detect_mobile () {
  if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)    || navigator.userAgent.match(/BlackBerry/i)) {
    $('.social').remove();
    $('#share').remove();
    $('#notices').remove();
    $('.about-tubalr').remove();
    $('.blog-link').remove();
    $('.settings-link').remove();
    $('aside#icons').remove();
    $('#s2id_add-to-playlist-dropdown').remove();
    $('#ytplayerid').addClass('mobile-ytplayerid');
    $('body').addClass('mobile-body');
    $('#listenForm input').addClass('mobile');
    $('.why-register').remove();
    $('#searching-info').hide();
  }
}

$(document).ready(function () { 
  detect_mobile();
  
  $('#about-tubalr').dialog({
    modal: true,
    autoOpen: false,
    width: 600,
    draggable: false,
    title: 'About Tubalr'
  });
  $('.about-tubalr').click(function () { $('#about-tubalr').dialog('open'); });

  if ($('.flash-msg')) {
    setTimeout(function () {
      $('.flash-msg').slideUp(500, function () {
        $(this).remove();
      });
    }, 5000);
  }   
  
  $('#main').delay(500).fadeIn(500, function () {
    if ($('#q').val() == "") $("#q").focus();
  });
  
  // Tooltips
  $('.tooltip').tipsy({gravity: 'n'});
  
  // Scroll to Top
  $('#to-top').topLink({
    min: 400
  });

  $('#to-top').click(function(e) {
    e.preventDefault();
    $.scrollTo(0,300);
  });
});