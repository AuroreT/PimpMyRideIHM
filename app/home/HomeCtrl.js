(function() {
    'use strict';

    function HomeCtrl(localStorageService, $rootScope, UserService, ScooterService, $location) {
        var vm = this;

        $rootScope.currentUser = undefined;
        $rootScope.currentUserCopy = undefined;
        vm.scootersList = [];
        vm.register = false;

        /**
         * User creation
         * @param usr
         */
        vm.create = function (usr) {
            UserService.resource.post(usr, function (datas) {
                console.log(datas);
            });
        };

        /**
         * Redirection if cancel register
         */
        vm.cancel = function () {
            vm.register = false;
            $location.path('/home');
        };

        /**
         * Connection user, get datas
         * @param u
         */
        vm.connect = function (u) {
            if(!localStorageService.user){
                var spinner = new Spinner().spin();
                document.getElementById('spinner').appendChild(spinner.el);
                UserService.token.login({
                    username: u.username,
                    password: u.password
                }, function (data) {
                    $rootScope.token = data.token;
                    spinner.stop();
                    UserService.me.get({token: $rootScope.token},function (d) {
                        $rootScope.currentUser = d.user;
                        $rootScope.currentUserCopy = angular.copy($rootScope.currentUser); //for dissociation modal view/page view
                        $rootScope.scootersList = $rootScope.currentUser.scooters;
                    });
                    $rootScope.isLogged = true;
                    //window.location.reload();
                    //$location.path("/home");
                });
            }
        };

        /**
         * Gestion modal
         */
        vm.openModal = function () {
            $('#modal1').openModal();
        };

        /**
         * Modification user
         */
        vm.updateUser = function () {
            $rootScope.currentUser = $rootScope.currentUserCopy;
            UserService.resource.update($rootScope.currentUser, function (datas) {
                console.log('vérif maj', datas);
            });
        };

        /**
         * If creation user
         */
        vm.needRegister = function () {
            vm.register = true;
        };

        /**
         * Entry point of controller
         */
        (function () {
            console.log('currentUser', $rootScope.currentUser);

            //Check if user is already logged
            if($rootScope.token == null){
                $rootScope.isLogged = false;
            }else if($rootScope.token != null){
                $rootScope.isLogged = true;
            }

        })();
    }
    angular.module('home').controller('HomeCtrl', HomeCtrl);
}());