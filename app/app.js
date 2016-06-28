'use strict';

// App config
var app = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'home',
    'dashboard',
    'myApp.version',
    'leaflet-directive',
    'ngStorage',
    'LocalStorageModule'
]);

    app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider, localStorageService, $localStorage, $route, $location) {
        $locationProvider.hashPrefix('!');
    
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'dashboard/dashboard.html',
                controller: 'DashboardCtrl as dashboard'
            })
            .when('/home', {
                templateUrl: 'home/home.html',
                controller: 'HomeCtrl as home'
            })
            .otherwise({redirectTo: '/dashboard'});

        /*$scope.logout = function(){
            $localStorage.$reset();
            $route.reload();
            window.location.reload();
            $location.path("/home");
        }*/
}]);
