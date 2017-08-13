(function() {
    'use strict';

    angular.module('WeatherApp', ['WeatherModule'])
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['$scope', 'WeatherService'];
    
    function WeatherController($scope, WeatherService) {
        $scope.forecasts,
        $scope.city,

        $scope.zipCode = '60661';
        $scope.countryCode = 'us';
        $scope.displayDate = function(date) {
            return moment.unix(date).format('hh:mm a');
        }

        $scope.getIconUrl = function(forecast) {
            var iconCode = forecast.weather[0].icon;
            return "http://openweathermap.org/img/w/" + iconCode + ".png";
        }

        // function to run when page loads
        function startUp() {
            navigator.geolocation.getCurrentPosition(
                function(geoResponse) {
                    WeatherService
                        .getFiveDayForecastByGeoLocation(geoResponse.coords.latitude, geoResponse.coords.longitude)
                        .then(loadTableData, defaultErrorHandler);
                },
                function(geoError) {
                    console.log('Using default location');
                    WeatherService
                        .getFiveDayForecastByZipCode($scope.zipCode, $scope.countryCode)
                        .then(loadTableData, defaultErrorHandler);
                });
        }

        function loadTableData(response) {
            $scope.forecasts = groupWeatherByDay(response.data.list);
            $scope.city = response.data.city;
        }

        function defaultErrorHandler(error) {
            console.log(error);
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