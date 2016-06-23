(function() {
    'use strict';

    function TemperatureService($resource) {

        var apiPath = 'http://pimp-my-ride.herokuapp.com';

        var resource = $resource(apiPath+'/temperatures');

        return {
            resource: resource
        };}
    angular.module('dashboard').factory('TemperatureService', TemperatureService);
}());