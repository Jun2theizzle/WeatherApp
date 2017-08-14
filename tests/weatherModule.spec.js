describe('weatherModule', function(){
    var WeatherService;
    beforeEach(angular.mock.module('WeatherModule'));

    beforeEach(inject(function(_WeatherService_) {
        WeatherService = _WeatherService_;
    }));

    it('should exist', function() {
        expect(WeatherService).toBeDefined();
    });

    it('getFiveDayForecastByZipCode should exists', function() {
        expect(WeatherService.getFiveDayForecastByZipCode).toBeDefined();
    });

});