(function() {
    'use strict';

    function UserService($resource, localStorageService, $rootScope) {

        var apiPath = 'http://pimp-my-ride.herokuapp.com';

        var tokn = "";

        if (localStorageService.get('token')){
            tokn =  localStorageService.get('token');
        };
        
        var token = $resource(apiPath+'/token', {}, {
            login:{
                method: 'POST'
            }
        });

        var resource = $resource(apiPath+'/users/:id', {
            id: '@id',
            token: '@token' }, {
            update: {
                method: "PUT"
            }
        });
        
        var me = $resource(apiPath+'/users/me', {token: '@token'},{
            update: {
                method: "PUT"
            }
        });
        return {
            resource: resource,
            token: token,
            me: me
        };
    }
    angular.module('home').factory('UserService', UserService);
}());