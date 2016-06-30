(function() {
    'use strict';

    function DashboardCtrl($scope, $rootScope, $location) {
        var vm = this;
        vm.position = undefined;
        vm.temperature = "42°";
        vm.humidity = "61%";

        vm.getDatas = function () {

        };

        vm.refreshDatas = function () {
            console.log('refresh');
        };

        angular.extend($scope, {
            trotinettePlace: {
                lat: 48.9404504,
                lng: 2.3038093000000117,
                zoom: 12
            },
            markers: {
                trotinettePlace: {
                    lat: 48.9404504,
                    lng: 2.3038093000000117,
                    zoom: 12,
                    message: "Je suis la trotinette",
                    focus: true,
                    draggable: false,
                    doubleClickZoom: true
                }
            },
            defaults: {
                scrollWheelZoom: false
            }
        });

        $scope.addMarkers = function (marker) {
            angular.extend($scope, {
                markers: {
                    trotinettePlace: {
                        lat: 48.9404504,
                        lng: 2.3038093000000117,
                        zoom: 12
                    }
                }
            });
        };

        $scope.$on("leafletDirectiveMarker.dragend", function (event, args) {
            $scope.position.lat = args.model.lat;
            $scope.position.lng = args.model.lng;
        });

        /**
         * Point d'entrée du ctrler
         */
        (function () {
            console.log('$token',$rootScope.token);
            if($rootScope.token == undefined){
                $location.path('/home');
            }
            vm.currentUser = $rootScope.currentUser;
            vm.getDatas();
        })();
    }
    angular.module('dashboard').controller('DashboardCtrl', DashboardCtrl);
}());