exports.defineAutoTests = function () {

    describe('(ACPPlaces.clear)', function () {
        beforeEach(function() {
          spyOn(console, 'log');
        })

        it('should print log to console stating success is not function', function(){
          ACPPlaces.clear("success", function() {})
          expect(console.log).toHaveBeenCalled();
        })

        it('should print log to console stating error is not function', function(){
          ACPPlaces.clear( function() {}, "error")
          expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPPlaces.extensionVersion)', function () {
        it('should exist', function () {
            expect(ACPPlaces.extensionVersion).toBeDefined();
        });
        it('should be a function', function () {
            expect(typeof ACPPlaces.extensionVersion === "function").toBe(true);
        });
        it('check if the result is a string', function (done) {
            ACPPlaces.extensionVersion(function(result) {
                expect(typeof result === "string").toBe(true);
                done();
            }, function() {});
        });
    });

    describe('(ACPPlaces.getCurrentPointsOfInterest)', function () {
        beforeEach(function() {
          spyOn(console, 'log');
        })

        it('should print log to console stating success is not function', function(){
          ACPPlaces.getCurrentPointsOfInterest("success", function() {})
          expect(console.log).toHaveBeenCalled();
        })

        it('should print log to console stating error is not function', function(){
          ACPPlaces.getCurrentPointsOfInterest( function() {}, "error")
          expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPPlaces.getLastKnownLocation)', function () {
        beforeEach(function() {
          spyOn(console, 'log');
        })

        it('should print log to console stating success is not function', function(){
          ACPPlaces.getLastKnownLocation("success", function() {})
          expect(console.log).toHaveBeenCalled();
        })

        it('should print log to console stating error is not function', function(){
          ACPPlaces.getLastKnownLocation( function() {}, "error")
          expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPPlaces.getNearbyPointsOfInterest)', function () {
        beforeEach(function() {
          spyOn(console, 'log');
        })

        var location = {latitude:37.3309422, longitude:-121.8939077};
        it('should print log to console stating success is not function', function(){
          ACPPlaces.getNearbyPointsOfInterest(location, 10, "success", function() {})
          expect(console.log).toHaveBeenCalled();
        })

        it('should print log to console stating error is not function', function(){
          ACPPlaces.getNearbyPointsOfInterest(location, 10, function() {}, "error")
          expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPPlaces.processGeofence)', function () {
        beforeEach(function() {
          spyOn(console, 'log');
        })

        var region = {latitude:37.3309422, longitude:-121.8939077, radius:1000};
        var geofence = {requestId:"requestId", circularRegion:region, expirationDuration:-1};
        it('should print log to console stating success is not function', function(){
          ACPPlaces.processGeofence(geofence, "success", function() {})
          expect(console.log).toHaveBeenCalled();
        })

        it('should print log to console stating error is not function', function(){
          ACPPlaces.processGeofence(geofence, function() {}, "error")
          expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPPlaces.setAuthorizationStatus)', function () {
        beforeEach(function(){
          spyOn(console, 'log');
        })

        it('should print log to console stating success is not function', function(){
          ACPPlaces.setAuthorizationStatus(1, "success", function() {})
          expect(console.log).toHaveBeenCalled();
        })

        it('should print log to console stating error is not function', function(){
          ACPPlaces.setAuthorizationStatus(1, function() {}, "error")
          expect(console.log).toHaveBeenCalled();
        })
    });
};