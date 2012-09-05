/**
 * jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 * bitwise:true, strict:true, undef:true, unused:true, curly:true,
 * browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket Model
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-09-03
 */
/** @namespace uAg project */
var uag = (function(parent, $, window, document, undefined) {
    'use strict';
    // namespace declaration
    var uAgBasket = parent.basket = parent.basket || {};

    /**
     * @class
     * @exports uAgBasket.Model as uag.basket.Model
     * @description Model of the Basket app (singleton pattern)
     */
    uAgBasket.Model = (function() {
        var instance = null;

        /** @ignore */
        function init() {
            // const vars
            var JSON_SCHEMA = {
                "$schema": "http://json-schema.org/draft-03/schema",
                "description": "JSON schema describing basket data for the uAg Basket app",
                "type": "object",
                "required": true,
                "properties": {
                    "distribDateTime": {
                        "description": "basket distribution date-time info in ISO 8601 format",
                        "type": "string",
                        "required": true,
                        "format": "date-time"
                    },
                    "products": {
                        "description": "list of products in the basket",
                        "type": "array",
                        "required": false,
                        "items": {
                            "description": "JSON schema describing product data",
                            "type": "object",
                            "required": true,
                            "properties": {
                                "name": {
                                    "description": "product simple name or full description",
                                    "type": "string",
                                    "required": true
                                },
                                "producerName": {
                                    "description": "product producer name",
                                    "type": "string",
                                    "required": false
                                },
                                "approxWeight": {
                                    "description": "product approximate weight in kilograms (in case of a single piece of vegetables, such as one salad, a best guess must be provided)",
                                    "type": "number",
                                    "required": true,
                                    "minimum": 0,
                                    "exclusiveMinimum": true
                                },
                                "isIn": {
                                    "description": "is the product already in the basket? (useful for a self-served distribution)",
                                    "type": "boolean",
                                    "required": true
                                },
                                "tag": {
                                    "description": "product info obtained from QR code scanning",
                                    "type": "string",
                                    "required": false
                                },
                                "images": {
                                    "description": "list of product images",
                                    "type": "array",
                                    "required": false,
                                    "items": {
                                        "description": "JSON schema describing image data",
                                        "type": "object",
                                        "required": true,
                                        "properties": {
                                            "data" : {
                                                "description": "image data as string",
                                                "type": "string",
                                                "required": true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            var KEY_PREFIX = 'uag-basket-'; // prefix to avoid key collision with other apps
            var JSV_ENVIRONMENT = JSV.createEnvironment("json-schema-draft-03"); // current default draft version

            // other vars
            var storedBasketKeys = [];
            var currentBasketObj = null;

            /**
             * @constructor
             * @description Product object constructor.
             * @property {string} name Product simple name or full description.
             * @property {string} producerName Product producer name.
             * @property {number} approxWeight Product approximate weight in kilograms (in case of a single piece of vegetables, such as one salad, a best guess must be provided).
             * @property {boolean} isIn Is the product already in the basket? (Useful for a self-served distribution.)
             * @property {string} tag Product info obtained from QR code scanning.
             * @property {array} images List of product images.
             */
            function Product() {
                // validate constructor with Model JSON SCHEMA
                // TODO TEST
                this.name = '';
                this.producerName = '';
                this.approxWeight = 0;
                this.inside = false;
                this.tag = '';
                this.images = []; // TODO storing data or filenames? check if what is the right idea

            }

            /**
             * @function
             * @description Using JSON stringification with pretty print (4 white spaces per indentation);
             */
            Product.prototype.toString = function() {
                // TODO TEST
                var indentation = '    '; // 4 white spaces
                JSON.stringify(this, null, indentation);
            }

            /**
             * @constructor
             * @description Basket object constructor.
             * @property {string} distribDateTime Basket distribution date-time info in ISO 8601 format.
             * @property {array} products List of products in the basket.
             * @param {date} basketDate Basket distribution date.
             */
            function Basket(basketDate) {
                // validate constructor with Model JSON SCHEMA
                // TODO TEST
                this.distribDateTime = basketDate.toISOString();
                this.products = [];
            }

            /**
             * @description Using JSON stringify method with pretty print (4 white spaces per indentation).
             */
            Basket.prototype.toString = function() {
                // TODO TEST
                var indentation = '    '; // 4 white spaces
                return JSON.stringify(this, null, indentation);

            }

            /** @description TODO */
            Basket.prototype.getKey = function() {
                return KEY_PREFIX + this.distribDateTime;
            }

            /**
             * @description Utility function to generate storage keys from dates.
             * @param {date} date Date object.
             * @returns {string} Key string.
             */
            Basket.getKeyFromDate = function(date) {
                return KEY_PREFIX + date.toISOString();
            }

            /**
             * @description Utility function to generate dates from storage keys.
             * @param {string} keyStr Key string.
             * @returns {string} Date object.
             */
            Basket.getDateFromKey = function(keyStr) {
                var isoDateStr = keyStr.slice(KEY_PREFIX.length); // removing initial prefix
                return new Date(isoDateStr);
            }

            /**
             * @public
             * @lends uag.basket.Model
             */
            return {
                /**
                 * @description TODO
                 */
                getStoredBasketDates: function() {
                    // tidying up: time-consuming?
                    // TODO
                    storedBasketKeys.sort(); // default: lexicographical sort (in dictionary order)
                    var dates = [];
                    for (var i = 0, len = storedBasketKeys.length; i < len; i++) {
                        var keyStr = storedBasketKeys[i];
                        dates.push(Basket.getDateFromKey(keyStr));
                    }
                    return dates;
                },

                /**
                 * @description Get current basket (or null if there is none).
                 * @returns {object} Basket object representation.
                 */
                getCurrentBasket: function() {
                    if (currentBasketObj === null) {
                        console.info('Info: no current basket available');
                    }
                    return currentBasketObj;
                },

                /**
                 * @description TODO
                 * @param {string} basketStr String representation of basket data in JSON format.
                 * @returns {boolean} Success.
                 */
                setCurrentBasketFromJson: function(basketStr) {
                    try {
                        // checking if basket string is valid JSON
                        var basketObj = JSON.parse(basketStr);
                        console.info('Info: basket string is valid JSON');

                        // checking if basket object follows basket JSON schema
                        var result = JSV_ENVIRONMENT.validate(basketObj, JSON_SCHEMA);
                        if (result.errors.length === 0) { // success JSON schema
                            console.info('Info: file object follows JSON schema for basket data');
                            currentBasketObj = basketObj;
                            return true;
                        } else { // failure JSON schema
                            var errorArr = result.errors;
                            console.error('Error: file object does not follow JSON schema for basket data\n' +
                                          'Error: > uri: ' + errorArr[0].uri + '\n' +
                                          'Error: > message: ' + errorArr[0].message);
                            return false;
                        }
                    } catch (e) { // failure JSON
                        console.error(e.message);
                        return false;
                    }
                },

                /**
                 * @description TODO
                 * @param {date} basketDate Basket distribution date.
                 * @returns {boolean} Success.
                 */
                setCurrentBasketFromDate: function(basketDate) {
                    console.log('SET BASKE FROM D');//////////TMP
                    var key = Basket.getKeyFromDate(basketDate);
                    var basketStr = window.localStorage.getItem(key);
                    if (basketStr !== null) {
                        // converting basket string to basket object
                        try { // sanity check
                            var basketObj = JSON.parse(basketStr);
                            currentBasketObj = basketObj;
                            return true;
                        } catch (e) {
                            console.error(e.message);
                            return false;
                        }
                    } else {
                        currentBasketObj = new Basket(basketDate);
                        return true;
                    }
                },

                /**
                 * @description Store basket in local storage: key is the distribution date string, value is the file string.
                 * @returns {boolean} Success.
                 */
                storeCurrentBasket: function() {
                    if (currentBasketObj !== null) {
                        // sanity check with key
                        var key = currentBasketObj.getKey();
                        if (window.localStorage.getItem(key) === null) { // success unique key
                            // sanity check with JSON schema
                            var result = JSV_ENVIRONMENT.validate(currentBasketObj, JSON_SCHEMA);
                            if (result.errors.length === 0) { // success JSON schema
                                // sanity check with JSON
                                try {
                                    var basketStr = JSON.stringify(currentBasketObj);
                                    window.localStorage.setItem(key, basketStr);
                                    storedBasketKeys.push(key);
                                    return true;
                                } catch (e) { // failure JSON
                                    console.error(e.message);
                                    return false;
                                }
                            } else { // failure JSON schema
                                var errorArr = result.errors;
                                console.error('Error: file object does not follow JSON schema for basket data\n' +
                                              'Error: > uri: ' + errorArr[0].uri + '\n' +
                                              'Error: > message: ' + errorArr[0].message);
                                return false;
                            }
                        } else { // failure unique key
                            console.error('Error: key already exists in localStorage');
                            return false;
                        }
                    } else { // failure current basket
                        console.error('Error: no basket available');
                        return false;
                    }
                },
            }; // return
        } // private function init()

        /**
         * @public
         * @lends uag.basket.Model
         */
        return {
            /**
             * @returns {object} Model singleton instance.
             * @description Get the Singleton instance if one exists or create one if it doesn't.
             */
            getInstance: function() {
                if (instance === null) {
                    instance = init();
                    Object.freeze(instance);
                }
                return instance;
            },
        }; // return
    }()); // immediately-invoked function expression (IIFE)

    return parent;
}(uag || {}, jQuery, this, this.document));
