describe('weatherModule', function(){
    var weatherService;
    beforeEach(angular.mock.module('WeatherModule'));

    beforeEach(inject(function(_weatherService_) {
        weatherService = _weatherService_;
    }));

    it('should exist', function() {
        expect(weatherService).toBeDefined();
    });
    
    it('getFiveDayForecastByZipCode should exists', function() {
        expect(weatherService.getFiveDayForecastByZipCode).toBeDefined();
    })

});