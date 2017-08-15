describe('GoogleMapsModule', function(){
    var GoogleMapsService;
    
    // Load the GoogleMapsModule
    beforeEach(angular.mock.module('GoogleMapsModule'));

    // Inject our service
    beforeEach(inject(function(_GoogleMapsService_) {
        GoogleMapsService = _GoogleMapsService_;
    }));

    // These test are simple 'defined' tests as the the underlying code is using as existing example
    it('GoogleMapsService should exist', function() {
        expect(GoogleMapsService).toBeDefined();
    });

    it('initGoogleMaps should exists', function() {
        expect(GoogleMapsService.initGoogleMaps).toBeDefined();
    });
});