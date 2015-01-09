var adminApp = angular.module('adminApp',['ngRoute']);

adminApp.config(function($routeProvider){
    $routeProvider.when('/admin/home',{
        templateUrl: 'templates/admin.index.html',
        //controller:  'PublicController'
    })
})