var adminApp = angular.module('adminApp',['ngRoute','ngResource','ngCookies']);

adminApp.config(function($routeProvider){
    $routeProvider.when('/admin/home',{
        templateUrl: 'templates/admin.index.html',
        controller:  'AdminController'
    });
    $routeProvider.when('/admin/ads/edit/:id',{
        templateUrl: 'templates/admin-edit-ad.html',
        controller: 'AdminEditAdController'
    });
    $routeProvider.when('/admin/ads/delete/:id',{
        templateUrl: 'templates/admin-delete-ad.html',
        controller: 'AdminDeleteAdController'
    });
    $routeProvider.when('/admin/users/list/',{
        templateUrl: 'templates/list-users.html',
        controller: 'AdminController'
    });
    $routeProvider.when('/admin/users/delete/:username',{
        templateUrl: 'templates/admin-delete-user.html'
    });
    $routeProvider.when('/admin/users/edit/:username',{
        templateUrl: 'templates/admin-edit-user.html',
        controller: 'DeleteUserController'
    });
})