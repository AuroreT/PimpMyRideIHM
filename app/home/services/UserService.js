(function() {
    'use strict';

    function UserService($resource, localStorageService) {

        var apiPath = 'http://pimp-my-ride.herokuapp.com';

        var tokn = "";

        if (localStorageService.user){
            tokn =  localStorageService.user.token;
        };
        
        var token = $resource(apiPath+'/token', {}, {
            login:{
                method: 'POST'
            }
        });

        var resource = $resource(apiPath+'/users/:id', {id: '@id' }, {
            update: {
                method: "PUT"
            }
        });

        var me = $resource(apiPath+'/me', {token: tokn});

        return {
            resource: resource,
            token: token,
            me: me
        };}
    angular.module('home').factory('UserService', UserService);
}());