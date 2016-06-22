'use strict';

angular.module('myApp', [
  'ngRoute',
  'myApp.dashboard',
  'myApp.view2',
  'myApp.version',
    'leaflet-directive'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardCtrl as dashboard'
    }).otherwise({redirectTo: '/dashboard'});
}]);
