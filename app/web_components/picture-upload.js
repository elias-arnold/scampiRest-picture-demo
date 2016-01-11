'use strict';

var app = angular.module('myApp.pictureUpload', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/picture', {
    templateUrl: 'app/web_components/picture-upload.html',
    controller: 'pictureCtrl'
  });
}]);

app.controller('pictureCtrl', ['$scope', function($scope) {

}]);