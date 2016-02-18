'use strict';

var app = angular.module('myApp.messageFeed', ['ngRoute'])

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/feed', {
    templateUrl: 'app/web_components/message-feed.html',
    controller: 'feedCtrl'
  });
}]);

app.controller('feedCtrl', ['$scope', '$http', function($scope,$http) {
	$scope.messages = {};
	

	$scope.getMessages = function (){
		var request = {
	            method:  'GET',
	            url:     restUrl + 'service/' + serviceName,
	            headers: {'Content-Type' : 'application/json'}
	        };
        $http(request).success(function (data) {
        	$scope.messages = data;
        }).error(function(data){
            console.log('Error retrieving messages');
            console.log(data);
        });
	}
	$scope.getMessages();
	
	$scope.getPictures = function(binaryMap){
		var paths = [];
		for(var k in binaryMap) {
			if (k !== "main") {
				paths.push(binaryMap[k])
			};
		};
		return paths;
	}

	$scope.getPath = function (binaryName, message){
		var path = message.binaryMap[ binaryName ];
		return "http://myliberouter.org/" + path;
	}

}]);