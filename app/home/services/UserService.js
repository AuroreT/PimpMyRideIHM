(function() {
    'use strict';

    function UserService($resource) {

        var apiPath = 'http://pimp-my-ride.herokuapp.com';

        var resource = $resource(apiPath+'/users/:user', {user: '@usr' }, {
            post:{
                method:"POST"
               /* isArray:true,
                headers:{
                    Accept: 'text/html, application/json, text/plain, *!/!*' ,
                    Authorization: 'Bearer '+ token
                }*/
            }
        });

        return {
            resource: resource
        };}
    angular.module('home').factory('UserService', UserService);
}());