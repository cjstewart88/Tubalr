angular.module('tubalr.factories')
  .factory('Echonest', ['$resource', function($resource) {
    return $resource('http://developer.echonest.com/api/v4/playlist/basic', { }, {
      genre: {
        method: 'JSONP',
        params: {
          api_key: 'OYJRQNQMCGIOZLFIW',
          format: 'jsonp',
          callback: 'JSON_CALLBACK',
          results: 40,
          type: 'genre-radio'
        }
      }
    });
  }]);
