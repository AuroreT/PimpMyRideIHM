'use strict';

/**
 * Configuration application
 * @type {angular.Module}
 */
var app = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'home',
    'dashboard',
    'myApp.version',
    'leaflet-directive',
    'ngStorage',
    'LocalStorageModule',
    'ngCookies'
]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider,$rootScope, localStorageService, $localStorage, $route, $location) {
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
        .otherwise({redirectTo: '/home'});
}]);
