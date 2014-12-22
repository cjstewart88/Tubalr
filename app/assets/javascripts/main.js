$(document).ready(function () {

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
    gravity: 'n',
    html: true
  });

});
