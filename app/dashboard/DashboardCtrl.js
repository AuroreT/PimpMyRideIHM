/*
'use strict';

angular.module('dashboard', ['ngRoute'])
.controller('DashboardCtrl', ['$scope', function($scope) {
    var vm = this;
    vm.title = "Vue Dashboard";


    vm.test = function () {
        var retourService = PositionService.resource.get();
        console.log('retour service', retourService);
    };


/!*    var local_icons = {
        default_icon: {},
        leaf_icon: {
            iconUrl: 'assets/images/leaf-green.png',
            shadowUrl: 'assets/images/leaf-shadow.png',
            iconSize: [38, 95], // size of the icon
            shadowSize: [50, 64], // size of the shadow
            iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
            shadowAnchor: [4, 62],  // the same for the shadow
            popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
        },
        div_icon: {
            type: 'div',
            iconSize: [230, 0],
            html: 'Using <strong>Bold text as an icon</strong>: Lisbon',
            popupAnchor: [0, 0]
        },
        orange_leaf_icon: {
            iconUrl: 'assets/images/leaf-orange.png',
            shadowUrl: 'assets/images/leaf-shadow.png',
            iconSize: [38, 95],
            shadowSize: [50, 64],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62]
        }
    };

    angular.extend($scope, {
        icons: local_icons
    });*!/

/!*    var regions = {
        paris: {
            northEast: {
                lat: 49.15280224425956,
                lng: 2.21681556701660155
            },
            southWest: {
                lat: 48.50211782162702,
                lng: 2.24428138732910156
            }
        },
        markers: {}
    };

    $scope.setRegion = function (region) {
        if (!region) {
            $scope.maxbounds = {};
        } else {
            $scope.maxbounds = regions[region];
        }
    };*!/

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

/!*    $scope.addMarkers = function (marker) {
        angular.extend($scope, {
            markers: {
                trotinettePlace: {
                    lat: 48.9404504,
                    lng: 2.3038093000000117,
                    zoom: 12
                }
            }
        });
    };*!/

    $scope.$on("leafletDirectiveMarker.dragend", function (event, args) {
        $scope.position.lat = args.model.lat;
        $scope.position.lng = args.model.lng;
    });

}]);
*/


(function() {
    'use strict';

    function DashboardCtrl(PositionService, TemperatureService, SpeedService) {
        var vm = this;
        vm.positions = undefined;

        vm.test = function () {
            SpeedService.resource.get({}, function (datas) {
                vm.positions = datas;
            });
            console.log('test ok', vm.positions);
        };

    }
    angular.module('dashboard').controller('DashboardCtrl', DashboardCtrl);
}());