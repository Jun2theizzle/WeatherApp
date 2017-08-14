(function() {
    'use strict';

    angular.module('WeatherApp', ['WeatherModule'])
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['WeatherService'];
    
    function WeatherController(WeatherService) {
        var vm = this;
        // define vm variables
        vm.zipCode                  = '60661',
        vm.countryCode              = 'us',
        vm.downloadingWeatherData   = true,
        vm.forecasts,
        vm.city;
        vm.test = function() {
                        navigator.geolocation.getCurrentPosition(function(response) {
                            vm.city = response.coords.latitude;
                        });

        }
        vm.displayDate = function(date) {
            return moment.unix(date).format('hh:mm a');
        }

        vm.getIconUrl = function(forecast) {
            var iconCode = forecast.weather[0].icon;
            return `http://openweathermap.org/img/w/${iconCode}.png`;
        }

        // function to run when page loads
        vm.startUp = function() {
            var opts = {
                lines: 13,
                length: 28,
                width: 14,
                radius: 42,
                scale: 1,
                corners: 1,
                color: '#000',
                opacity: 0.25,
                rotate: 0,
                direction: 1,
                speed: 1,
                trail: 60,
                fps: 20,
                zIndex: 2e9,
                className: 'spinner',
                top: '50%',
                left: '50%',
                shadow: false,
                hwaccel: false,
                position: 'absolute' 
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
                        .getFiveDayForecastByZipCode(vm.zipCode, vm.countryCode)
                        .then(loadTableData, defaultErrorHandler);
                });
        }

        function loadTableData(response) {
            vm.forecasts = groupWeatherByDay(response.data.list);
            vm.city = response.data.city;
            vm.downloadingWeatherData = false;
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
    }
})();