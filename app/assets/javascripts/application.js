//= require jquery-2.1.3.min
//= require angular
//= require angular-route
//= require angular-resource
//= require angular-rails-templates

//= require_tree ../templates
//= require factories
//= require services
//= require controllers
//= require directives
//= require filters

setInterval(function() {
  _gaq.push(['_trackEvent', 'ping', 'pong']);
}, 30000)

angular.module('tubalr', [
    'ngRoute',
    'templates',
    'tubalr.factories',
    'tubalr.services',
    'tubalr.controllers',
    'tubalr.directives',
    'tubalr.filters'
  ])

  .config(['$routeProvider', function($routeProvider) {

    $routeProvider
      .when('/', {
        controller:  'HomeCtrl',
        templateUrl: 'index.html'
      })
      .when('/:playlist_type/:playlist_search', {
        controller: 'ListenCtrl',
        templateUrl: 'listen.html'
      });

  }]);
