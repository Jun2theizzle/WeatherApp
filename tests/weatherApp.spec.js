describe('WeatherApp', function() {
    var WeatherService, $controller, WeatherController, httpBackend;

    beforeEach(angular.mock.module('ui.router'));

    // Load the WeatherModule
    beforeEach(angular.mock.module('WeatherModule'));
    beforeEach(angular.mock.module('WeatherApp'));

    beforeEach(inject(function(_WeatherService_, _$controller_, $httpBackend) {
        $controller     = _$controller_,
        WeatherService  = _WeatherService_,
        httpBackend     = $httpBackend;

        WeatherController = $controller('WeatherController', { WeatherService : WeatherService });
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

        var iconUrl = WeatherController.getIconUrl(forecast);
        expect(iconUrl).toEqual('http://openweathermap.org/img/w/test.png')
    });
});