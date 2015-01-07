var publicApp = angular.module('publicApp',['ngRoute', 'ngResource','ui.bootstrap','ngCookies']);

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
    $routeProvider.when('/user/ads',{
        templateUrl: 'templates/my-ads.html'
    });
    $routeProvider.when('/user/ads/publish',{
        templateUrl: 'templates/publish-ad.html'
    });

});