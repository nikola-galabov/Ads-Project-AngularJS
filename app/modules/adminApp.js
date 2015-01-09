var adminApp = angular.module('adminApp',['ngRoute','ngResource','ngCookies']);

adminApp.config(function($routeProvider){
    $routeProvider.when('/admin/home',{
        templateUrl: 'templates/admin.index.html',
        controller:  'AdminController'
    })
})