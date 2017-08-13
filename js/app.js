(function() {
    'use strict';

    angular.module('WeatherApp', ['WeatherModule'])
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['$scope', 'WeatherService'];
    
    function WeatherController($scope, WeatherService) {
        $scope.forecasts;
        // function to run when page loads
        function startUp() {
            WeatherService.getFiveDayForecast('60601', 'us')
                .then(function(response) { 
                    $scope.forecasts = groupWeatherByDay(response.data.list);
                }, function(error){
                    console.log(error);
                });
        }

        function groupWeatherByDay(forecasts) {
            var grouped = _.groupBy(forecasts, function(forecast) {
                return moment.unix(forecast.dt).startOf('day').format('dddd, MMMM Do YYYY');                
            });
            return grouped;
        }

        startUp();
    }
})();