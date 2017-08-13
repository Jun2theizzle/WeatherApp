(function() {
    'use strict';

    angular
        .module('WeatherModule', [])
        .service('WeatherService', WeatherService);

    WeatherService.$inject = ['$http'];
    
    function WeatherService($http) {

        var getFiveDayForecast = function(zipCode, country) {
            return $http({
                method : 'GET',
                url : 'http://api.openweathermap.org/data/2.5/forecast',
                params : {
                    zip : `${zipCode},${country}`,
                    units : 'imperial',
                    appid : 'c25086bc159b5768f6257df72935bef0'
                }
            })
        };

        return {
            getFiveDayForecast : getFiveDayForecast
        };

        }
})();