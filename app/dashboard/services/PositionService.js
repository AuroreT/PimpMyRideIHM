(function() {
    'use strict';

    function PositionService($resource) {

        var apiPath = 'http://pimp-my-ride.herokuapp.com';

        var resource = $resource(apiPath+'/positions');

        return {
            resource: resource
    };}
    angular.module('dashboard').factory('PositionService', PositionService);
}());