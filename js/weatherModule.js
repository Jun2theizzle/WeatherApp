(function() {
    'use strict';

    angular
        .module('WeatherModule', [])
        .service('WeatherService', WeatherService);

    WeatherService.$inject = ['$http'];
    
    function WeatherService($http) {

        var getFiveDayForecast = function() {
            console.log('get');
        };

        return {
            getFiveDayForecast : getFiveDayForecast
        };

        }
})();