angular.module('tubalr.filters')
  .filter('hhmmss', function() {
    return function(number) {
      /* handle null/undefined input */
      if (!number) { return '00:00'; }

      var sec_num = parseInt(number, 10);
      var hours   = Math.floor(sec_num / 3600);
      var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
      var seconds = sec_num - (hours * 3600) - (minutes * 60);

      /* add a leading zero if the number is a single digit */
      function lpad(n) {
        var str = n.toString();
        return str.length < 2 ? '0' + str : str;
      }

      var result = [lpad(minutes), lpad(seconds)];

      if (hours) {
        result.unshift(lpad(hours));
      }

      return result.join(':');
    };
  });