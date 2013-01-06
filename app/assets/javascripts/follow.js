var Follow = {

  follow: function (button, userID) {
    $.post('/follow/' + userID + '.json');
    button.addClass('unfollow').removeClass('follow');
  },

  unfollow: function (button, userID) {
    $.ajax('/follow/' + userID + '.json', {type: 'delete'});
    button.addClass('follow').removeClass('unfollow');
  }

}

$(document).ready(function () {

  $('button.follow').live('click', function (e) {
    if ($(this).hasClass('not-signed-in')) {
      return false;
    }

    Follow.follow($(this), $(this).data('user-id'));
  });

  $('button.unfollow').live('click', function (e) {
    Follow.unfollow($(this), $(this).data('user-id'));
  });

});