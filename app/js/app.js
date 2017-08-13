(function() {
    'use strict';

    angular.module('WeatherApp', ['WeatherModule'])
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['$scope', 'WeatherService'];
    
    function WeatherController($scope, WeatherService) {
        // define scope variables
        $scope.zipCode = '60661',
        $scope.countryCode = 'us',
        $scope.downloadingWeatherData = true,
        $scope.forecasts,
        $scope.city;

        $scope.displayDate = function(date) {
            return moment.unix(date).format('hh:mm a');
        }

        $scope.getIconUrl = function(forecast) {
            var iconCode = forecast.weather[0].icon;
            return "http://openweathermap.org/img/w/" + iconCode + ".png";
        }

        // function to run when page loads
        function startUp() {
            var opts = {
                lines: 13 // The number of lines to draw
              , length: 28 // The length of each line
              , width: 14 // The line thickness
              , radius: 42 // The radius of the inner circle
              , scale: 1 // Scales overall size of the spinner
              , corners: 1 // Corner roundness (0..1)
              , color: '#000' // #rgb or #rrggbb or array of colors
              , opacity: 0.25 // Opacity of the lines
              , rotate: 0 // The rotation offset
              , direction: 1 // 1: clockwise, -1: counterclockwise
              , speed: 1 // Rounds per second
              , trail: 60 // Afterglow percentage
              , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
              , zIndex: 2e9 // The z-index (defaults to 2000000000)
              , className: 'spinner' // The CSS class to assign to the spinner
              , top: '50%' // Top position relative to parent
              , left: '50%' // Left position relative to parent
              , shadow: false // Whether to render a shadow
              , hwaccel: false // Whether to use hardware acceleration
              , position: 'absolute' // Element positioning
              }
            var target = document.getElementById('spinner')
            var spinner = new Spinner(opts).spin(target);

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
            $scope.downloadingWeatherData = false;
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