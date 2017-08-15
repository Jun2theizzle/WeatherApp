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

        /**
         * Return a friendly date
         */
        vm.displayDate = function(date) {
            return moment.unix(date).format('hh:mm a');
        }

        /**
         * Return the icon url
         */
        vm.getIconUrl = function(forecast) {
            var iconCode = forecast.weather[0].icon;
            return `http://openweathermap.org/img/w/${iconCode}.png`;
        }

        // function to run when page loads
        vm.startUp = function() {
            SpinnerService.createSpinner('spinner');
            // If the user refuses to share their location, use the zip and country code
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

        // Load the forecast data into the vm and init google maps
        function loadForecast(response) {
            vm.forecasts = groupWeatherByDay(response.data.list);
            vm.city = response.data.city;
            vm.downloadingWeatherData = false;
            initGoogleMaps(response.data.city.coord);            
        }

        // Callback for google maps
        // Update the forecast whenever a place is selected in the maps UI
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

        // Simple error logging
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

        // The response from openweather maps returns one list of all the forecasts
        // This will group them by day into an object { 'Day' : [forecasts, ...], ... }
        function groupWeatherByDay(forecasts) {
            var grouped = {};
            angular.forEach(forecasts, function(forecast) {
                var day = moment.unix(forecast.dt).startOf('day').format('dddd, MMMM Do YYYY')
                if(!grouped[day]) {
                    grouped[day] = [];
                }
                grouped[day].push(forecast)
            });
            
            return grouped;
        }
    }
})();