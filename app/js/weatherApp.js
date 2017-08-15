(function() {
    'use strict';

    angular.module('WeatherApp', ['WeatherModule', 'SpinnerModule', 'GoogleMapsModule'])
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['WeatherService', 'SpinnerService', 'GoogleMapsService'];
    
    function WeatherController(WeatherService, SpinnerService, GoogleMapsService) {
        var vm                      = this;
        // define vm variables
        vm.zipCode                  = '60661',
        vm.countryCode              = 'us',
        vm.downloadingWeatherData   = true,
        vm.forecasts,
        vm.city;

        vm.displayDate = function(date) {
            return moment.unix(date).format('hh:mm a');
        }

        vm.getIconUrl = function(forecast) {
            var iconCode = forecast.weather[0].icon;
            return `http://openweathermap.org/img/w/${iconCode}.png`;
        }

        // function to run when page loads
        vm.startUp = function() {
            SpinnerService.createSpinner('spinner');

            navigator.geolocation.getCurrentPosition(
                function(geoResponse) {
                    WeatherService
                        .getFiveDayForecastByGeoLocation(geoResponse.coords.latitude, geoResponse.coords.longitude)
                        .then(loadForecast, defaultErrorHandler);
                },
                function(geoError) {
                    console.log('Using default location');
                    WeatherService
                        .getFiveDayForecastByZipCode(vm.zipCode, vm.countryCode)
                        .then(loadForecast, defaultErrorHandler);
                });
                
        }

        function loadForecast(response) {
            vm.forecasts = groupWeatherByDay(response.data.list);
            vm.city = response.data.city;
            vm.downloadingWeatherData = false;
            initGoogleMaps(response.data.city.coord);            
        }

        function updateForecast(coords) {
            vm.downloadingWeatherData = true;            
            WeatherService
                .getFiveDayForecastByGeoLocation(coords.lat(), coords.lng())
                .then(function(response) {
                    vm.forecasts = groupWeatherByDay(response.data.list);
                    vm.city = response.data.city;
                    vm.downloadingWeatherData = false;
                }, defaultErrorHandler);
        }

        function defaultErrorHandler(error) {
            console.log(error);
        }
        
        function initGoogleMaps(coords) {
            var googleCoords = {
                lat: coords.lat,
                lng: coords.lon
            };

            GoogleMapsService.initGoogleMaps('map', googleCoords, updateForecast);
          }


        function groupWeatherByDay(forecasts) {
            var grouped = {};
            angular.forEach(forecasts, function(forecast) {
                var day = moment.unix(forecast.dt).startOf('day').format('dddd, MMMM Do YYYY')
                if(!grouped[day]) {
                    grouped[day] = [];
                }
                grouped[day].push(forecast)
            })
            return grouped;
        }
    }
})();