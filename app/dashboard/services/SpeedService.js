(function() {
    'use strict';

    function SpeedService($resource) {

        var apiPath = 'http://pimp-my-ride.herokuapp.com';

        var resource = $resource(apiPath+'/speeds');

        return {
            resource: resource
        };}
    angular.module('dashboard').factory('SpeedService', SpeedService);
}());