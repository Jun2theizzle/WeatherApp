describe('WeatherApp', function() {
    var WeatherService, $controller, WeatherController, httpBackend;
    var sampleApiLatLongResponse = {
        'city': {
            'id': 100,
            'name': 'Chicago',
            'coord': {
                'lat': 100,
                'lon': 100
            },
                'country': 'US'
            },
        'cod':'200',
        'message':0.0045,
        'cnt':1,
        'list':[{
            'dt':1406106000,
            'main':{
                'temp':298.77,
                'temp_min':298.77,
                'temp_max':298.774,
                'pressure':1005.93,
                'sea_level':1018.18,
                'grnd_level':1005.93,
                'humidity':87,
                'temp_kf':0.26},
            'weather':[{'id':804,'main':'Clouds','description':'overcast clouds','icon':'04d'}],
            'clouds':{'all':88},
            'wind':{'speed':5.71,'deg':229.501},
            'sys':{'pod':'d'},
            'dt_txt':'2014-07-23 09:00:00'}
        ]
    };

    beforeEach(angular.mock.module('ui.router'));

    // Load the WeatherModule
    beforeEach(angular.mock.module('WeatherModule'));
    beforeEach(angular.mock.module('WeatherApp'));

    beforeEach(inject(function(_WeatherService_, _$controller_, $httpBackend) {
        $controller     = _$controller_,
        WeatherService  = _WeatherService_,
        httpBackend     = $httpBackend;
        // example
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

    it('displayDate should return hour minute format', function() {
        var unixTime = 1502772476918;
        var displayDate = WeatherController.displayDate(unixTime);
        expect(displayDate).toEqual('05:08 pm');
    });

    it('user allowed location flow', function() {
        spyOn(navigator.geolocation,'getCurrentPosition').and.callFake(function() {
            var position = { coords: { latitude: 100, longitude: 100 } };
            arguments[0](position);
        });
        httpBackend.when('GET', 'http://api.openweathermap.org/data/2.5/forecast?appid=c25086bc159b5768f6257df72935bef0&lat=100&lon=100&units=imperial').respond(200, sampleApiLatLongResponse);
        WeatherController.startUp();
        httpBackend.flush();
    });

    it('user reject location flow', function() {

    });

    // example
    // it('testing http backend', function() {
    // WeatherController.testMethod();
    //             httpBackend.flush();

    //     expect(WeatherController.tester).toEqual('herro');
    // });
});