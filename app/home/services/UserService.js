(function() {
    'use strict';

    function UserService($resource, localStorageService, $cookies) {

        var apiPath = 'http://pimp-my-ride.herokuapp.com';
        
        var token = $resource(apiPath+'/token', {}, {
            login:{
                method: 'POST'
            }
        });

        var resource2 = $resource(apiPath+'/users', {}, {
            post: {
                method: "POST"
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
            me: me,
            resource2: resource2
        };
    }
    angular.module('home').factory('UserService', UserService);
}());