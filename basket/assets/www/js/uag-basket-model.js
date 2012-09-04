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
            // basket JSON Schema
            var JSON_SCHEMA = {
                "$schema": "http://json-schema.org/draft-03/schema",
                "description": "JSON schema describing basket data for the uAg Basket app",
                "type": "object",
                "required": true,
                "properties": {
                    "distribDate": {
                        "description": "basket distribution date in ISO 8601 format",
                        "type": "string",
                        "required": true,
                        "format": "date-time"
                    },
                    "products": {
                        "description": "list of products in the basket",
                        "type": "array",
                        "required": true,
                        "items": {
                            "description": "JSON schema describing product data",
                            "type": "object",
                            "required": true,
                            "properties": {
                                "name": {
                                    "description": "product simple name or full description",
                                    "type": "string",
                                    "required": true,
                                    "minimumLength": 1
                                },
                                "producerName": {
                                    "description": "product producer name",
                                    "type": "string",
                                    "required": false,
                                    "minimumLength": 1
                                },
                                "approxWeight": {
                                    "description": "product approximate weight in kilograms (in case of a single piece of vegetables, such as one salad, a best guess must be provided)",
                                    "type": "number",
                                    "required": true,
                                    "minimum": 0,
                                    "exclusiveMinimum": true
                                },
                                "in": {
                                    "description": "is the product already in the basket? (useful for a self-served distribution)",
                                    "type": "boolean",
                                    "required": true
                                },
                                "tag": {
                                    "description": "product info obtained from QR code scanning",
                                    "type": "string",
                                    "required": false,
                                    "minimumLength": 1
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
                                                "required": true,
                                                "minimumLength": 1
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            // array storing basket keys in localStorage
            var storedBasketKeys = [];
            var currentBasketObj = null;

            /** @ignore */
            function Basket() {
                this.distribDate = '';
            }

            /** @ignore */
            Basket.prototype.toString = function() { // debug
                return '{\n' +
                        '\tdistribDate: ' + this.distribDate +
                        '\n}';
            }

            /**
             * @public
             * @lends uag.basket.Model
             */
            return {
                /**
                 * @description TODO
                 */
                getStoredBasketKeys: function() {
                    return storedBasketKeys;
                }
                /**
                 * @description Get the last basket stored in local storage.
                 * @returns {object} Basket object representation.
                 */
                getCurrentBasket: function() {
                    if (currentBasketObj !== null) {
                        return currentBasketObj;
                    } else {
                        console.error('Error: no basket available');
                    }
                },

                /**
                 * @description TODO
                 * @param {string} basket string representation of basket data in JSON format.
                 * @returns {boolean} Success.
                 */
                setCurrentBasketStr: function(basketStr) {
                    try {
                        // checking if basket string is valid JSON
                        var basketObj = JSON.parse(basketStr);
                        console.info('Info: basket string is valid JSON');

                        // checking if basket object follows basket JSON schema
                        var envt = JSV.createEnvironment("json-schema-draft-03"); // current default draft version
                        var result = envt.validate(basketObj, JSON_SCHEMA);

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
                 * @param {object} basket object representation.
                 * @returns {boolean} Success.
                 */
                setCurrentBasketObj: function(basketObj) {
                    /*if (storedBasketKeys.length > 0) { // sanity check
                        // removing basket string from storage
                        var key = storedBasketKeys.pop();
                        var basketStr = window.localStorage.getItem(key);
                        window.localStorage.removeItem(key);

                        // converting basket string to basket object
                        try { // sanity check
                            basketObj = JSON.parse(basketStr);
                        } catch (e) {
                            console.error(e.message);
                        }
                    } else {
                        console.error('Error: no more basket available');
                    }*/
                    if (basketObj === null) {
                        currentBasketObj = new Basket();
                        console.log('CURRENT BASKET NEW:\n' + currentBasketObj.toString());//TMP
                    } else {
                        currentBasketObj = basketObj;
                        console.log('when selecting in list of stored baskets?');//TMP
                    }
                    return true;
                },

                /**
                 * @description Store basket in local storage: key is the distribution date string, value is the file string.
                 * @returns {boolean} Success.
                 */
                storeCurrentBasket: function() {
                    if (currentBasketObj !== null) {
                        var key = 'uag-basket-' + currentBasketObj.distribDate;
                        if (window.localStorage.getItem(key) === null) { // success unique key
                            try {
                                var basketStr = JSON.stringify(currentBasketObj);
                                window.localStorage.setItem(key, basketStr);
                                storedBasketKeys.push(key);
                                return true;
                            } catch (e) { // failure JSON
                                console.error(e.message);
                                return false;
                            }
                        } else { // failure unique key
                            console.error('Error: key already exists in localStorage');
                            return false;
                        }
                    } else {
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
