describe('weatherModule', function(){
    var WeatherService;
    
    // Load the WeatherModule
    beforeEach(angular.mock.module('WeatherModule'));

    // Inject our service
    beforeEach(inject(function(_WeatherService_) {
        WeatherService = _WeatherService_;
    }));

    // These test are simple 'defined' tests as the module does 0 logic and only make http requests
    it('should exist', function() {
        expect(WeatherService).toBeDefined();
    });

    it('getFiveDayForecastByZipCode should exists', function() {
        expect(WeatherService.getFiveDayForecastByZipCode).toBeDefined();
    });

    it('getFiveDayForecastByGeoLocation should exists', function() {
        expect(WeatherService.getFiveDayForecastByGeoLocation).toBeDefined();
    });
});