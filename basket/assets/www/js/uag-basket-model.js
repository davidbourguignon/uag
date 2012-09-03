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
            // basket array storing basket keys in localStorage
            var basketKeys = [];

            /** @ignore */
            function storeBasket(basketObj, basketStr) {
                var key = 'uag-basket-' + basketObj.distribDate;
                if (window.localStorage.getItem(key) === null) { // checking for existing key
                    window.localStorage.setItem(key, basketStr);
                } else {
                    console.error('Error: key already exists in localStorage');
                }
                //window.localStorage.removeItem(key);////////////////////////////TMP for testing/////////////////////////////
                basketKeys.push(key);
            }

            /**
             * @public
             * @lends uag.basket.Model
             */
            return {
                /**
                 * @description Add basket to local storage: key is the distribution date string, value is the file string.
                 * @param {string} basketStr string representation of basket data in JSON format.
                 * @returns {boolean} Success.
                 */
                addBasket: function(basketStr) {
                    try {
                        // checking if basket string is valid JSON
                        var basketObj = JSON.parse(basketStr);
                        console.info('Info: basket string is valid JSON');

                        // checking if basket object follows basket JSON schema
                        var envt = JSV.createEnvironment("json-schema-draft-03"); // current default draft version
                        var result = envt.validate(basketObj, JSON_SCHEMA);
                        if (result.errors.length === 0) { // success
                            console.info('Info: file object follows JSON schema for basket data');
                            storeBasket(basketObj, basketStr);
                            return true;
                        } else { // failure
                            var errorArr = result.errors;
                            console.error('Error: file object does not follow JSON schema for basket data\n' +
                                          'Error: > uri: ' + errorArr[0].uri + '\n' +
                                          'Error: > message: ' + errorArr[0].message);
                            return false;
                        }
                    } catch (e) {
                        console.error(e.message);
                        return false;
                    }
                },

                /**
                 * @description Get last basket entered in local storage.
                 * @returns {string} Basket string representation.
                 */
                retrieveLastBasket: function() {
                    if (basketKeys.length > 0) {
                        var key = basketKeys.pop();
                        var basketStr = window.localStorage.getItem(key);
                        window.localStorage.removeItem(key);
                        return basketStr;
                    } else {
                        console.error('Error: no more basket available');
                        return '';
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
