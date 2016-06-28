(function() {
    'use strict';

    function HomeCtrl(localStorageService, $location, UserService, ScooterService) {
        var vm = this;

        vm.currentUser = undefined;
        vm.currentUserCopy = undefined;
        vm.scootersList = [];
        vm.isLogginSpace = false;
        vm.isLogged = true;

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

        $(document).ready(function(){
            $('.modal-trigger').leanModal();
        });

        vm.updateUser = function () {
            console.log(vm.currentUser);
            vm.currentUser = vm.currentUserCopy;
            UserService.resource.update(vm.currentUser, function (datas) {
                console.log('vérif maj', datas);
            });
        };

        /**
         * Entry point
         */
        (function () {
             UserService.resource.get({id: '576d46c095269a1100b5d6ae'}, function (datas) {
                 vm.currentUser = datas.user;
                 vm.currentUserCopy = angular.copy(vm.currentUser);
                console.log(vm.currentUser);
            });

            ScooterService.resource.get(function (datas) {
                console.log('retour scooter service', datas);
                for(var i = 0; i < datas.scooters.length; i++){
                    if(datas.scooters[i].owner_id === '576d46c095269a1100b5d6ae'){
                        vm.scootersList.push(datas.scooters[i]);
                    }
                }
            });
        })();
    }
    angular.module('home').controller('HomeCtrl', HomeCtrl);
}());