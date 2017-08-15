(function() {
    'use strict';

    angular
        .module('SpinnerModule', [])
        .factory('SpinnerService', SpinnerService);

    function SpinnerService() {
        // Wrapper to abstract away any dependencies on Spin.js
        // Use the example here, http://spin.js.org/
        /**
         * 
         * @param {String} id - DOM id to create the spinner on
         */
        function createSpinner(id) {
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
            var target  = document.getElementById(id),
                spinner = new Spinner(opts).spin(target);
        }
        return {
            createSpinner : createSpinner
        }
    }
})();