(function() {
    'use strict';

    function ScooterService($resource) {

        var apiPath = 'http://pimp-my-ride.herokuapp.com';

        var resource = $resource(apiPath+'/scooters/:arduinoID', {arduinoID: '@arduinoID', token: '@token' }, {
            update: {
                method: "PUT"
            }
        });

        var resource2 = $resource(apiPath+'/scooters/:id', { id: '@id', token: '@token'}, {
            post: {
                method: "POST"
            }
        });
        
        var scooterByOwner = $resource(apiPath + '/scooters/:idOwner', {idOwner: '@id', token: '@token'}, {
            update: {
                method: "PUT"
            }
        });

        return {
            resource: resource,
            scooterByOwner: scooterByOwner,
            resource2: resource2
        };}
    angular.module('home').factory('ScooterService', ScooterService);
}());