describe('SpinnerModule', function(){
    var SpinnerService;
    
    // Load the SpinnerModule
    beforeEach(angular.mock.module('SpinnerModule'));

    // Inject our service
    beforeEach(inject(function(_SpinnerService_) {
        SpinnerService = _SpinnerService_;
    }));

    // These test are simple 'defined' tests as the module does 0 logic and only make http requests
    it('SpinnerService should exist', function() {
        expect(SpinnerService).toBeDefined();
    });

    it('createSpinner should exists', function() {
        expect(SpinnerService.createSpinner).toBeDefined();
    });
});