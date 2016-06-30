(function() {
    'use strict';

    function HomeCtrl(localStorageService, $rootScope, UserService, ScooterService, $location, $cookies) {
        var vm = this;

        $rootScope.currentUser = undefined;
        $rootScope.currentUserCopy = undefined;
        vm.register = false;
        vm.scooterToEdit = undefined;
        var spinner = new Spinner();

        /**
         * Redirection if cancel register
         */
        vm.cancel = function () {
            vm.register = false;
            $location.path('/home');
        };

        /**
         * Get scooters for the a user
         */
        vm.getScooterListByOwner = function () {
            vm.scootersList = [];
            ScooterService.scooterByOwner.get({idOwner: $rootScope.currentUser.id, token: $rootScope.token}, function (dt) {
                vm.scootersList = dt.scooters;
                spinner.stop();
            });
        };
        /**
         * Connection user, get datas
         * @param u
         */
        vm.connect = function (u) {
            if(!localStorageService.user){
                spinner.spin();
                document.getElementById('spinner').appendChild(spinner.el);
                UserService.token.login({
                    username: u.username,
                    password: u.password
                }, function (data) {
                    $rootScope.token = data.token;
                    UserService.me.get({token: $rootScope.token},function (d) {
                        $rootScope.currentUser = d.user;
                        $cookies.putObject('currentUser', d.user);
                        $rootScope.currentUserCopy = angular.copy($rootScope.currentUser); //for dissociation modal view/page view
                        vm.getScooterListByOwner();
                    });
                    $rootScope.isLogged = true;
                });
            }
        };

        /**
         * Gestion modales
         */
        vm.openModal = function (mode) {
            vm.isEditUser = false;
            vm.isConfirmation = false;
            vm.isCreateMode = false;
            if(mode == 'editUser'){
                vm.isEditUser = true;
            }else if(mode == 'createScooter'){
                vm.isCreateMode = true;

            }else{
                vm.scooterToEdit = mode;
                vm.copyScooterToEdit = angular.copy(vm.scooterToEdit); //Work with copy for page vew and modal view dissociation
            }
            $('#modal1').openModal();
        };
        
        vm.close = function () {
            $('#modal1').closeModal();
            vm.reinitModalMode();
        };

        vm.reinitModalMode = function () {
            vm.isEditUser = false;
            vm.isCreateMode = false;
            vm.isConfirmation = false;
        };

        /**
         * Ask confirmation before remove scooter
         * @param scooter
         */
        vm.confirmBeforeDelete = function (scooter) {
            vm.reinitModalMode();
            vm.scooterToDelete = scooter;
            vm.isConfirmation = true;
            $('#modal1').openModal();
        };

        /**
         * CRUD scooter
         * update
         */
        vm.updateScooter = function () {
            var arduinoIDTemp = vm.scooterToEdit.arduinoID;
            vm.scooterToEdit = vm.copyScooterToEdit;
            ScooterService.resource.update({token: $rootScope.token, arduinoID: arduinoIDTemp}, vm.scooterToEdit,  function (dts) {
                vm.scooterToEdit = dts;
                vm.copyScooterToEdit = vm.scooterToEdit;
                vm.getScooterListByOwner();
                vm.close();
                Materialize.toast('Trotinette mise à jour', 4000);
            });
        };

        /**
         * Creation
         */
        vm.newScooter = function(scooter){
            ScooterService.resource2.post({token: $rootScope.token}, scooter, function (scoot) {
                vm.getScooterListByOwner();
                vm.close();
                Materialize.toast('Trotinette créée', 4000);
            })
        };

        /**
         * Delete
         */
        vm.deleteScooter = function () {
            ScooterService.resource2.delete({token: $rootScope.token, id: vm.scooterToDelete._id}, function (scoot) {
                vm.getScooterListByOwner();
                vm.close();
                Materialize.toast('Trotinette ajoutée', 4000);
            })
        };

        /**
         * CRUD user
         * Creation
         */
        vm.create = function (usr) {
            UserService.resource2.post(usr, function () {
                Materialize.toast('Utilisateur créé', 4000);
                vm.register = false;
                $rootScope.isLogged = false;
            });
        };

        /**
         * Updata 
         */
        vm.updateUser = function () {
            $rootScope.currentUser = $rootScope.currentUserCopy;
            UserService.resource.update($rootScope.currentUser, function (datas) {
                $rootScope.currentUser = datas;
                vm.close();
                Materialize.toast('Utilisateur mis à jour', 4000);
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

            var temp = $cookies.get('currentUser');
            $rootScope.currentUser = JSON.parse(temp);
            vm.getScooterListByOwner();

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