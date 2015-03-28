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

angular.module('tubalr', [
    'ngRoute',
    'templates',
    'tubalr.factories',
    'tubalr.services',
    'tubalr.controllers',
    'tubalr.directives'
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
