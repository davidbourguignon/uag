/**
 * jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 * bitwise:true, strict:true, undef:true, unused:true, curly:true,
 * browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket Model
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-08-31
 */
/** @namespace uAg project */
var uag = (function(parent, $, window, document) {
    'use strict'; // enforcing strict JS
    var uAgBasket = parent.Basket = parent.Basket || {};

    /**
     * @class
     * @exports uAgBasket.model as uag.basket.model
     * @description Model module of the Basket app (implements the module pattern).
     */
    uAgBasket.model = (function() {
        /**
         * @private
         */
        // sth?

        /**
         * @public
         * @lends uag.basket.model
         */
        return {
            jsonSchema: {
                // TODO
            },
            //other things?
        };
    }());

    return parent;
}(uag || {}, jQuery, this, this.document));
