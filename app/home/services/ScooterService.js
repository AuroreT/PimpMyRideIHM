(function() {
    'use strict';

    function ScooterService($resource) {

        var apiPath = 'http://pimp-my-ride.herokuapp.com';

        var resource = $resource(apiPath+'/scooters/:id', {id: '@id' }, {
            update: {
                method: "PUT"
            }
        });

        return {
            resource: resource
        };}
    angular.module('home').factory('ScooterService', ScooterService);
}());