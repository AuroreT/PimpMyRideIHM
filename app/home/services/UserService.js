(function() {
    'use strict';

    function UserService($resource) {

        var apiPath = 'http://pimp-my-ride.herokuapp.com';

        var resource = $resource(apiPath+'/users/:id', {id: '@id' }, {
            post:{
                method:"POST"
               /* isArray:true,
                headers:{
                    Accept: 'text/html, application/json, text/plain, *!/!*' ,
                    Authorization: 'Bearer '+ token
                }*/
            },
            update: {
                method: "PUT"
            }
        });

        return {
            resource: resource
        };}
    angular.module('home').factory('UserService', UserService);
}());