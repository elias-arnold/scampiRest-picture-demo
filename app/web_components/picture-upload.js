'use strict';

var app = angular.module('myApp.pictureUpload', [ 'ngRoute', 'ngFileUpload' ])

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/picture', {
		templateUrl : 'app/web_components/picture-upload.html',
		controller : 'pictureCtrl'
	});
} ]);

app.controller('pictureCtrl', ['$scope','$http','Upload',
		function($scope, $http, Upload) {

			$scope.emptyMessage = {};

			$scope.getEmptyMessage = function() {
				var request = {
					method : 'GET',
					url : restUrl + 'message/empty',
					headers : {
						'Content-Type' : 'application/json'
					}
				};
				$http(request).success(function(data) {
					$scope.emptyMessage = data;
					$scope.emptyMessage.service = serviceName;
				}).error(function(data) {
					console.log('Error retrieving messages');
					console.log(data);
				});
			};

			$scope.getEmptyMessage();

			$scope.myUpload = {
				id : '',
				key : ''
			};

			$scope.submit = function() {
				if ($scope.file) {
					$scope.upload($scope.file);
				}
			};

			// upload on file select or drop
			$scope.upload = function(file) {
				Upload.upload({
					url : restUrl + 'upload',
					data : {
						file : $scope.file,
						'id' : $scope.myUpload.id,
						'key' : $scope.myUpload.key
					}
				}).then(
						function(resp) {
							console.log(resp);
						},
						function(resp) {
							console.log('Error status: ' + resp.status);
						},
						function(evt) {
							var progressPercentage = parseInt(100.0
									* evt.loaded / evt.total);
							console.log('progress: ' + progressPercentage
									+ '% ' + evt.config.data.file.name);
						});
			};
			
			$scope.stage = function(){
				var request = {
						method : 'POST',
						url : restUrl + 'message/stage',
						headers : {
							'Content-Type' : 'application/json'
						},
						data : $scope.emptyMessage
					};
					$http(request).success(function(data) {
						console.log('Sucess stageing message');
						$scope.myUpload.id = data.id;
					}).error(function(data) {
						console.log('Error retrieving messages');
						console.log(data);
					});
			};
			
			$scope.publish = function(){
				var request = {
						method : 'GET',
						url : restUrl + 'message/publish/' + $scope.myUpload.id,
						headers : {
							'Content-Type' : 'application/json'
						},
					};
					$http(request).success(function(data) {
						console.log('Sucess publishing message');
					}).error(function(data) {
						console.log('Error retrieving messages');
						console.log(data);
					});
			}

		} ]);