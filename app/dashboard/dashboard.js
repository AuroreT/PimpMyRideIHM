(function() {
    'use strict';

    angular.module('dashboard', ['ngRoute', 'ngResource'])
    /**
     * Stop spamming messages in console from the map
     */
    .config(function($logProvider){
        $logProvider.debugEnabled(false);
    });
}());