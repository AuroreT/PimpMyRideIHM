(function() {

    angular.module('myApp').directive('navbar', function () {

        var navCtrl = function ($route, $location, $scope, localStorageService, $rootScope) {

            var vm = this;
            vm.isLogged = false;

            /**
             * Check if user is logged for update navbar
             */
            $scope.$watch('isLogged', function() {
                vm.isLogged = $rootScope.isLogged;
            });

            vm.toHome = function(){
                $location.path('/home');
            };

            /**
             * Deconnexion
             */
            vm.logout = function(){
                localStorageService.clearAll();
                window.location.reload();
                $location.path("/home");
            };
        };

        var template = '<nav>' +
            '   <div class="nav-wrapper">' +
            '       <img class="logo" src="components/img/LOGO.png">' +
            '       <ul  id="navBar" class="right">' +
            '           <li ng-show="vm.isLogged"><a href="#!/dashboard"><i class="material-icons left">dashboard</i>Dasboard</a></li> '+
            '           <li><a href="#/home/true"><i class="material-icons left">perm_identity</i></a></li> '+
            '           <li ng-show="vm.isLogged"><a href ng-click="vm.logout()"><i class="fa fa-power-off" aria-hidden="true"></i></a></li>' +
            '       </ul>' +
            '   </div>'+
            '</nav>';

        return {
            restrict: 'EA',
            controller: navCtrl,
            controllerAs: 'vm',
            bindToController: true,
            template: template
        };
    });
}());




    
    
    
    
