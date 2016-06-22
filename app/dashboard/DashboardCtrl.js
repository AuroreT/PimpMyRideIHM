'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl as dashboard'
  });
}])

.controller('DashboardCtrl', [function() {
    var vm = this;
    
    vm.title = "Vue Dashboard";
}]);