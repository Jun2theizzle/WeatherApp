(function() {
    'use strict';

    angular.module('WeatherApp', ['WeatherModule'])
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['$scope', 'WeatherService'];
    
    function WeatherController($scope, WeatherService) {

        // function to run when page loads
        function startUp() {
            WeatherService.getFiveDayForecast('60601', 'us')
                .then(function(response) { 
                    console.log(response.data);
                }, function(error){
                    console.log(error);
                });
        }

        function groupBy

        startUp();
    }
})();