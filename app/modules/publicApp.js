var publicApp = angular.module('publicApp',['ngRoute', 'ngResource','ui.bootstrap','ngCookies', 'file-data-url']);

publicApp.config(function ($routeProvider) {
	$routeProvider.when('/login',{
		templateUrl: 'templates/login.html',
        controller:  'LoginController'
	});
	$routeProvider.when('/register',{
		templateUrl: 'templates/register.html',
        controller:  'RegisterController'
	});
	$routeProvider.when('/',{
		templateUrl: 'templates/index.html',
        controller:  'PublicController'
	});
    $routeProvider.when('/user/home',{
        templateUrl: 'templates/index.html',
        controller: 'UserController'
    });
    $routeProvider.when('/user/ads',{
        templateUrl: 'templates/my-ads.html',
        controller: 'UserController'
    });
    $routeProvider.when('/user/ads/publish',{
        templateUrl: 'templates/publish-ad.html',
        controller: 'UserController'
    });
    $routeProvider.when('/user/ads/delete/:id',{
        templateUrl: 'templates/delete-ad.html',
        controller: 'DeleteAdController'
    });
    $routeProvider.when('/user/ads/edit/:id',{
        templateUrl: 'templates/edit-ad.html',
        controller: 'EditAdController'
    });
    $routeProvider.when('/user/profile',{
        templateUrl: 'templates/edit-profile.html',
        controller: 'EditProfileController'
    });
});