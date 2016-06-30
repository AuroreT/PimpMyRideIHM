(function() {
    'use strict';

    function toTrusted($sce) {
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }
    angular.module('dashboard').filter('toTrusted', toTrusted);
}());