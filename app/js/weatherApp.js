(function() {
    'use strict';

    angular.module('WeatherApp', ['WeatherModule'])
        .controller('WeatherController', WeatherController);

    WeatherController.$inject = ['WeatherService'];
    
    function WeatherController(WeatherService) {
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
                    console.log(response.data)
                }, defaultErrorHandler);
        }

        function defaultErrorHandler(error) {
            console.log(error);
        }

        function initGoogleMarker(map, googleCoords) {
            var icon = {
                url: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
              };

            new google.maps.Marker({
                map: map,
                icon: icon,
                title: 'RocketMiles',
                position: googleCoords
            })
        }
        
        function initGoogleMaps(coords) {
            var googleCoords = {
                lat: coords.lat,
                lng: coords.lon
            };

            var map = new google.maps.Map(document.getElementById('map'), {
              center: googleCoords,
              zoom: 13,
              mapTypeId: 'roadmap'
            });

            initGoogleMarker(map, googleCoords);
          
            // Create the search box and link it to the UI element.
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
          
            // Bias the SearchBox results towards current map's viewport.
            map.addListener('bounds_changed', function() {
              searchBox.setBounds(map.getBounds());
            });
          
            var markers = [];
            // Listen for the event fired when the user selects a prediction and retrieve
            // more details for that place.
            searchBox.addListener('places_changed', function() {
              var places = searchBox.getPlaces();
          
              if (places.length == 0) {
                return;
              }
          
              // Clear out the old markers.
              markers.forEach(function(marker) {
                marker.setMap(null);
              });
              markers = [];
          
              // For each place, get the icon, name and location.
              var bounds = new google.maps.LatLngBounds();
              places.forEach(function(place) {
                if (!place.geometry) {
                  console.log("Returned place contains no geometry");
                  return;
                }
                var icon = {
                  url: place.icon,
                  size: new google.maps.Size(71, 71),
                  origin: new google.maps.Point(0, 0),
                  anchor: new google.maps.Point(17, 34),
                  scaledSize: new google.maps.Size(25, 25)
                };
          
                // Create a marker for each place.
                markers.push(new google.maps.Marker({
                  map: map,
                  icon: icon,
                  title: place.name,
                  position: place.geometry.location
                }));
          
                if (place.geometry.viewport) {
                  // Only geocodes have viewport.
                  bounds.union(place.geometry.viewport);
                } else {
                  bounds.extend(place.geometry.location);
                }
              });
              map.fitBounds(bounds);
              updateForecast(map.getCenter());
            });            
          }


        function groupWeatherByDay(forecasts) {
            var grouped = _.groupBy(forecasts, function(forecast) {
                return moment.unix(forecast.dt).startOf('day').format('dddd, MMMM Do YYYY');                
            });
            return grouped;
        }
    }
})();