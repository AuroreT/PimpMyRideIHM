(function() {
    'use strict';

    function HomeCtrl(localStorageService, $rootScope, UserService, ScooterService, $scope) {
        var vm = this;

        vm.currentUser = undefined;
        vm.currentUserCopy = undefined;
        vm.scootersList = [];
        vm.isLogginSpace = true;
        $rootScope.isLogged = false;

        vm.switchToInscription = function () {
            vm.isLogginSpace = false;
        };

        

        vm.create = function (usr) {
            UserService.resource.post(usr, function (datas) {
                console.log(datas);
            });
        };
        

        vm.connect = function (u) {
            if(!localStorageService.user){
                UserService.token.login({
                    username: u.username,
                    password: u.password
                }, function (data) {
                    localStorageService.user = {
                        token: data.token
                    };
                    $rootScope.isLogged = true;
                    console.log('test user id', localStorageService.user);
                    /*UserService.resource.get({id: localStorageService.user.id}, function (datas) {
                     vm.currentUser = datas.user;
                     vm.currentUserCopy = angular.copy(vm.currentUser);
                     console.log(vm.currentUser);
                     });*/

                    UserService.me.get(function (d) {
                        vm.currentUser = d;
                        console.log('currentUser', vm.currentUser);
                    });


                    //window.location.reload();
                    //$location.path("/home");
                });
            }
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