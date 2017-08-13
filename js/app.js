(function() {
    'use strict';

    angular.module('WeatherApp', ['WeatherModule'])
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['$scope', 'WeatherService'];
    
    function WeatherController($scope, WeatherService) {
        $scope.click = function() {
            WeatherService.getFiveDayForecast();
        }
    }
})();