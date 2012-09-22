/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket Model specifications (Jasmine test framework)
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-09-10
 */
describe('uAg Basket Model', function() {
    describe('global variables', function() {
        it('should be available', function() {
            expect(window).not.toEqual(null || undefined);
            expect(document).not.toEqual(null || undefined);
        });
    });
    describe('namespaces', function() {
        it('should be declared', function() {
            expect(uag).not.toEqual(null || undefined);
            expect(uag.basket).not.toEqual(null || undefined);
            expect(uag.utils).not.toEqual(null || undefined);
        });
    });
/*
    describe( "distance converter", function () {
        it("converts inches to centimeters", function () {
            expect(xConvert(12, "inches").to("cm")).toEqual(30.48);
        });

        it("converts centimeters to yards", function () {
            expect(xConvert(2000, "cm").to("yards")).toEqual(21.87);
        });
    });

    describe( "volume converter", function () {
        it("converts litres to gallons", function () {
            expect(xConvert(3, "liters").to("gallons")).toEqual(0.79);
        });

        it("converts gallons to cups", function () {
            expect(xConvert(2, "gallons").to("cups")).toEqual(32);
        });
    });
    it("throws an error when passed an unknown from-unit", function () {
        var testFn = function () {
            xConvert(1, "dollar").to("yens");
        };

        expect(testFn).toThrow(new Error("unrecognized from-unit"));
    });
    it("throws an error when passed an unknown to-unit", function () {
        var testFn = function () {
            xConvert(1, "cm").to("furlongs");
        }
        expect(testFn).toThrow(new Error("unrecognized to-unit"));
    });
*/
});
