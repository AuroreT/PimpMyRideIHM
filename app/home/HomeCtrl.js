(function() {
    'use strict';

    function HomeCtrl(localStorageService, $location, UserService) {
        var vm = this;

        vm.isLogginSpace = true;

        vm.switchToInscription = function () {
            vm.isLogginSpace = false;
        };

        vm.create = function (usr) {
            UserService.resource.post(usr, function (datas) {
                console.log(datas);
            });
        };

        vm.connect = function (u) {
            UserService.resource.query(function (datas) {
                console.log(datas);
            });

            //localStorageService.set('user',u);
            //window.location.reload();
            //$location.path("/dashboard");
        };
    }
    angular.module('home').controller('HomeCtrl', HomeCtrl);
}());