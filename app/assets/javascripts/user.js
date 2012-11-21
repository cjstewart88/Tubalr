var User = {

  id:           null,

  username:     [],

  bannedVideos: [],

  init: function (options) {
    $.extend(User, options);
  }

};