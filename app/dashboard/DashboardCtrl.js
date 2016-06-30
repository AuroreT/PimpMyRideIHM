(function() {
    'use strict';

    function DashboardCtrl($scope, $rootScope, $location, UserService, ScooterService) {
        var vm = this;
        vm.position = undefined;
        var spinner = new Spinner();

        /**
         * Get datas from sensors by API
         */
        vm.getDatas = function () {
            spinner.spin();
            UserService.me.get({token: $rootScope.token},function (d) {
                $rootScope.currentUser = d.user;
                $rootScope.currentUserCopy = angular.copy($rootScope.currentUser); //for dissociation modal view/page view
                //Get all his personal scooters
                ScooterService.scooterByOwner.get({idOwner: $rootScope.currentUser.id, token: $rootScope.token}, function (dt) {
                    vm.scootersList = dt.scooters;
                    //Get the actual scooter and its datas
                    for(var i = 0; i < vm.scootersList.length; i++){
                        if(vm.scootersList[i].isUsed){
                            vm.currentScooter = vm.scootersList[i];
                        }
                    }
                    vm.temperature = vm.currentScooter.temperature;
                    vm.humidity = vm.currentScooter.humidity;
                    vm.constructMap();
                });

            });
        };

        /**
         * Clean actual datas and get the new
         */
        vm.refreshDatas = function () {
            vm.temperature = undefined;
            vm.humidity = undefined;
            vm.scootersList = undefined;
            vm.currentScooter = undefined;
            vm.getDatas();
        };

        /**
         * Map gestion
         */

        vm.constructMap = function () {
            angular.extend($scope, {
                trotinettePlace: {
                    lat: vm.currentScooter.lat,
                    lng: vm.currentScooter.lng,
                    zoom: 12
                },
                markers: {
                    trotinettePlace: {
                        lat: vm.currentScooter.lat,
                        lng: vm.currentScooter.lng,
                        zoom: 12,
                        message: vm.currentScooter.name,
                        focus: true,
                        draggable: false,
                        doubleClickZoom: true
                    }
                },
                defaults: {
                    scrollWheelZoom: false
                }
            });
            spinner.stop();


/*            $scope.$on("leafletDirectiveMarker.dragend", function (event, args) {
                $scope.position.lat = args.model.lat;
                $scope.position.lng = args.model.lng;
            });*/
        };

        /**
         * Point d'entrée du ctrler
         */
        (function () {
            /**
             * Redirection if user is not logged
             */
            if($rootScope.token == undefined){
                $location.path('/home');
            }
            vm.currentUser = $rootScope.currentUser;
            vm.getDatas();
        })();
    }
    angular.module('dashboard').controller('DashboardCtrl', DashboardCtrl);
}());