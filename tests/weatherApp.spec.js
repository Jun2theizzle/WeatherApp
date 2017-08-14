describe('WeatherApp', function() {
    var WeatherService, $controller, WeatherController, scope, httpBackend;

    beforeEach(angular.mock.module('ui.router'));

    // Load the WeatherModule
    beforeEach(angular.mock.module('WeatherModule'));
    beforeEach(angular.mock.module('WeatherApp'));

    beforeEach(inject(function($rootScope, _WeatherService_, _$controller_, $httpBackend) {
        scope           = $rootScope.$new(),
        $controller     = _$controller_,
        WeatherService  = _WeatherService_,
        httpBackend     = $httpBackend;

        WeatherController = $controller('WeatherController', { $scope : scope, WeatherService : WeatherService });
    }));

    it('controller should be defined', function() {
        expect(WeatherController).toBeDefined();
    });

    it('getIconUrl should return formatted url', function() {
        var forecast = {
            weather: [{
                icon: 'test'
            }]
        };

        
    });
});