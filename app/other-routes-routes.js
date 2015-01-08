var app = angular.module('public',['ngRoute', 'ngResource']);

app.config(function ($routeProvider) {
    $routeProvider.when('/login',{
        templateUrl: 'templates/login.html'
    });
    $routeProvider.when('/register',{
        templateUrl: 'templates/registration.html'
    });
    $routeProvider.when('/',{
        templateUrl: 'templates/index.html'
    });
    $routeProvider.when('/newAd',{
        templateUrl: 'templates/new-ad.html'
    });
    $routeProvider.when('/myAds',{
        templateUrl: 'templates/my-ads.html'
    });
    $routeProvider.when('/deleteAd',{
        templateUrl: 'templates/delete-ad.html'
    });
});