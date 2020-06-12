exports.defineAutoTests = function () {

    describe('(ACPUserProfile.extensionVersion)', function () {
        it('should exist', function () {
            expect(ACPUserProfile.extensionVersion).toBeDefined();
        });
        it('should be a function', function () {
            expect(typeof ACPUserProfile.extensionVersion === "function").toBe(true);
        });
        it('check if the result is a string', function (done) {
            ACPUserProfile.extensionVersion(function(result) {
                expect(typeof result === "string").toBe(true);
                done();
            }, function() {});
        });
    });

    describe('(ACPUserProfile.getUserAttributes)', function () {
        beforeEach(function() {
          spyOn(console, 'log');
        })

        var attributeNames = new Array();
        attributeNames.push("attr1");
        attributeNames.push("attr2");
        attributeNames.push("attr3");

        it('should print log to console stating success is not function', function(){
          ACPUserProfile.getUserAttributes(attributeNames, "success", function() {})
          expect(console.log).toHaveBeenCalled();
        })

        it('should print log to console stating error is not function', function(){
          ACPUserProfile.getUserAttributes(attributeNames, function() {}, "error")
          expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPUserProfile.removeUserAttribute)', function () {
        beforeEach(function() {
          spyOn(console, 'log');
        })

        it('should print log to console stating success is not function', function(){
          ACPUserProfile.removeUserAttribute("attribute", "success", function() {})
          expect(console.log).toHaveBeenCalled();
        })

        it('should print log to console stating error is not function', function(){
          ACPUserProfile.removeUserAttribute("attribute", function() {}, "error")
          expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPUserProfile.removeUserAttributes)', function () {
        beforeEach(function() {
          spyOn(console, 'log');
        })

        var attributeNames = new Array();
        attributeNames.push("attr1");
        attributeNames.push("attr2");
        attributeNames.push("attr3");

        it('should print log to console stating success is not function', function(){
          ACPUserProfile.removeUserAttributes(attributeNames, "success", function() {})
          expect(console.log).toHaveBeenCalled();
        })

        it('should print log to console stating error is not function', function(){
          ACPUserProfile.removeUserAttributes(attributeNames, function() {}, "error")
          expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPUserProfile.updateUserAttribute)', function () {
        beforeEach(function() {
          spyOn(console, 'log');
        })
        it('should print log to console stating success is not function', function(){
          ACPUserProfile.updateUserAttribute("attribute", "value", "success", function() {})
          expect(console.log).toHaveBeenCalled();
        })

        it('should print log to console stating error is not function', function(){
          ACPUserProfile.updateUserAttribute("attributs", "value", function() {}, "error")
          expect(console.log).toHaveBeenCalled();
        })
    });

    describe('(ACPUserProfile.updateUserAttributes)', function () {
        beforeEach(function(){
          spyOn(console, 'log');
        })

        var testString = "test";
        var testNumber = 40;
        var attributes = new Array();
        attributes.push("attr1");
        attributes.push(30);
        var testMap = {"color1":"red", "color2":"blue", "color3":"green"}
        var attributeMap = {"test string":testString, "test number":testNumber, "attributes":attributes, "test map":testMap};
        it('should print log to console stating success is not function', function(){
          ACPUserProfile.updateUserAttributes(attributeMap, "success", function() {})
          expect(console.log).toHaveBeenCalled();
        })

        it('should print log to console stating error is not function', function(){
          ACPUserProfile.updateUserAttributes(attributeMap, function() {}, "error")
          expect(console.log).toHaveBeenCalled();
        })
    });
};