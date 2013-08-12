var User = {

  id:               null,

  username:         null,

  bannedVideos:     [],

  hd:               null,

  lastfmConnected:  null,

  resume_last_playlist: null,

  init: function (options) {
    window.o = options
    $.extend(User, options);
  },

  validateUsername: function () {
    var usernameElement = $('#user_username');
    var username        = usernameElement.val();

    if (username.match(/[^a-z\d]/ig) != null || username == "") {
      var error = $('<span>').addClass('error').text('only characters a-z & 0-9');
      error.insertAfter(usernameElement.parent().find('label'));
      return false;
    }
  }

};

$(document).ready(function () {

  $('#user_new').submit(function () {
    return User.validateUsername();
  });

});
