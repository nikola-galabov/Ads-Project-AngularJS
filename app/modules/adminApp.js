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
        templateUrl: 'templates/admin-delete-user.html',
        controller: 'DeleteUserController'
    });
    $routeProvider.when('/admin/users/edit/:username',{
        templateUrl: 'templates/admin-edit-user.html',
        controller: 'AdminEditUserController'
    });
    $routeProvider.when('/admin/categories/list',{
        templateUrl: 'templates/admin.categories.html',
        controller: 'AdminController'
    });
    $routeProvider.when('/admin/towns/list/',{
        templateUrl: 'templates/list-towns.html',
        controller: 'AdminController'
    });
    $routeProvider.when('/admin/categories/delete/:username',{
        templateUrl: 'templates/admin.category-delete.html',
        controller: 'AdminController'
    });
    $routeProvider.when('/admin/town/delete/:username',{
        templateUrl: 'templates/admin.town-delete.html',
        controller: 'AdminController'
    });


})