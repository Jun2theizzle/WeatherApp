(function() {
    'use strict';

    angular
        .module('WeatherModule', [])
        .service('WeatherService', WeatherService);

    WeatherService.$inject = ['$http'];
    
    function WeatherService($http) {
        /**
         * API method to call the openweathermap 5 day forecast using zip code and country code
         * 
         * @param {String} zipCode 
         * @param {String} country 
         * 
         * @return {Promise} A Promise that resolves into the http response
         */
        var getFiveDayForecastByZipCode = function(zipCode, country) {
            return $http({
                method : 'GET',
                url : 'http://api.openweathermap.org/data/2.5/forecast',
                params : {
                    zip : `${zipCode},${country}`,
                    units : 'imperial',
                    appid : 'c25086bc159b5768f6257df72935bef0'
                }
            });
        };

        /**
         * API method to call the openweathermap 5 day forecast using lat long
         * 
         * @param {String} lat 
         * @param {String} long 
         *          
         * @return {Promise} A Promise that resolves into the http response
         */
        var getFiveDayForecastByGeoLocation = function(lat, long) {
            return $http({
                method : 'GET',
                url : 'http://api.openweathermap.org/data/2.5/forecast',
                params : {
                    lat: lat,
                    lon: long,
                    units : 'imperial',
                    appid : 'c25086bc159b5768f6257df72935bef0'
                }
            });
        };

        return {
            getFiveDayForecastByZipCode : getFiveDayForecastByZipCode,
            getFiveDayForecastByGeoLocation : getFiveDayForecastByGeoLocation
        };

        }
})();