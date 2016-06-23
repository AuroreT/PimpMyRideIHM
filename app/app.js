'use strict';

// App config
var app = angular.module('myApp', [
    'ngRoute',
    'ngResource',
    'myApp.view2',
    'dashboard',
    'myApp.version',
    'leaflet-directive'
]);

    app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');
    
        $routeProvider
            .when('/dashboard', {
                templateUrl: 'dashboard/dashboard.html',
                controller: 'DashboardCtrl as dashboard'
            })
            .when('/view2', {
                templateUrl: 'view2/view2.html',
                controller: 'View2Ctrl'
            })
            .otherwise({redirectTo: '/dashboard'});
}]);
