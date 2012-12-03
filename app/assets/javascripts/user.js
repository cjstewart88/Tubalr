var User = {

  id:           null,

  username:     null,

  bannedVideos: [],

  init: function (options) {
    $.extend(User, options);
  }

};