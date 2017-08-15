(function() {
    'use strict';

    angular
        .module('GoogleMapsModule', [])
        .service('GoogleMapsService', GoogleMapsService);

    function GoogleMapsService() {
        // Wrapper to abstract away any google maps calls
        // I used the example here, https://developers.google.com/maps/documentation/javascript/examples/places-searchbox
        // And added only minor modifications for this use case
        /**
         * 
         * @param {String}    id              - DOM Id to create the map
         * @param {Object}    coords          - Lat Long coords for the initial placement
         * @param {Function}  updateForecast  - Function passed in to act whenever a place is selected
         */
        function initGoogleMaps(id, coords, updateForecast) {
            var map = new google.maps.Map(document.getElementById(id), {
              center: coords,
              zoom: 13,
              mapTypeId: 'roadmap'
            });

            initGoogleMarker(map, coords);

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
              updateForecast(places[0].geometry.location);
            }); 
        }
        
        function initGoogleMarker(map, coords) {
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
                title: 'Hi',
                position: coords
            })
        }

        return {
            initGoogleMaps : initGoogleMaps
        }
    }
})();