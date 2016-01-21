'use strict';

var restUrl = "http://localhost/dyn/";
var serviceName = "test-3-1";

// Declare app level module which depends on views, and components
var app = angular.module('scampiRestPictureDemo', [
  'ngRoute',
  'myApp.messageFeed',
  'myApp.pictureUpload'
]);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/feed'});
}]);
