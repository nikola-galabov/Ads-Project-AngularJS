var publicApp = angular.module('publicApp',['userApp','adminApp','ngRoute','ngCookies','ngResource','ui.bootstrap']);

publicApp.config(function($routeProvider){
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
});