var publicApp = angular.module('publicApp',['ngRoute', 'ngResource','ui.bootstrap']);

publicApp.config(function ($routeProvider) {
	$routeProvider.when('/login',{
		templateUrl: 'templates/login.html'
	});
	$routeProvider.when('/register',{
		templateUrl: 'templates/register.html'
	});
	$routeProvider.when('/',{
		templateUrl: 'templates/index.html'
	});
});