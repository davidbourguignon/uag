/**
 * jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 * bitwise:true, strict:true, undef:true, unused:true, curly:true,
 * browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket Model
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-09-06
 */
/** @namespace uAg project */
var uag = (function(parent, $, window, document, undefined) {
    'use strict';
    // namespace declarations
    var uAgBasket = parent.basket = parent.basket || {};
    var uAgUtils = parent.utils = parent.utils || {};

    /**
     * @const
     * @exports uAgBasket.PREFIX_STR as uag.basket.PREFIX_STR
     */
    uAgBasket.PREFIX_STR = 'uag-basket-'; // useful to avoid storage key collision with other apps

    /**
     * @class
     * @exports uAgBasket.Basket as uag.basket.Basket
     * @description Basket object constructor.
     * @property {string} timestamp Date-time info in ISO 8601 format.
     * @property {array} products List of products in the basket.
     * @param {date} date Date object defining basket timestamp.
     */
    uAgBasket.Basket = function(date) {
        // validate constructor with Model JSON SCHEMA
        // TODO TEST
        this.timestamp = date.toISOString() || ''; // sanity assignement
        this.products = [];
    };

    /**
     * @description Using JSON stringify method with pretty print (4 white spaces per indentation).
     * @returns {string} String representation of the basket object.
     */
    uAgBasket.Basket.prototype.toString = function() {
        // TODO TEST
        var indentation = '    '; // 4 white spaces
        return JSON.stringify(this, null, indentation);
    };

    /**
     * @description Get the storage key of a basket object.
     * @returns {string} Key string.
     */
    uAgBasket.Basket.prototype.getKey = function() {
        return uAgBasket.PREFIX_STR + this.timestamp;
    };

    /**
     * @description Utility function to generate storage keys from dates.
     * @param {date} date Date object.
     * @returns {string} Key string.
     */
    uAgBasket.Basket.getKeyFromDate = function(date) {
        return uAgBasket.PREFIX_STR + date.toISOString();
    };

    /**
     * @description Generate dates from storage keys.
     * @param {string} keyStr Key string.
     * @returns {string} Date object.
     */
    uAgBasket.Basket.getDateFromKey = function(keyStr) {
        var isoDateStr = keyStr.slice(uAgBasket.PREFIX_STR.length); // removing initial prefix
        return new Date(isoDateStr);
    };

    /**
     * @description Decorate a JSON data object following the basket JSON Schema as a Basket object.
     * @param {object} obj JSON data object.
     * @returns {object} Decorated JSON data object.
     */
    uAgBasket.Basket.basketify = function(obj) {
        // Could do that with a loop over Basket prototype properties?
        // TODO
        // sanity check with timestamp (converting to full ISO8601 format, with ms)
        var date = new Date(obj.timestamp);
        obj.timestamp = date.toISOString();
        // productify products
        for (var i = 0, len = obj.products.length; i < len; i++) {
            obj.products[i] = uAgBasket.Product.productify(obj.products[i]);
        }
        // add Basket methods
        obj.toString = uAgBasket.Basket.prototype.toString;
        obj.getKey = uAgBasket.Basket.prototype.getKey;
        return obj;
    };

    /**
     * @class
     * @exports uAgBasket.Product as uag.basket.Product
     * @description Product object constructor.
     * @property {string} name Product simple name or full description.
     * @property {string} producerName Product producer name.
     * @property {number} weight Product weight in kilograms (in case of a single piece of vegetables, such as one salad, a best guess must be provided).
     * @property {boolean} isIn Is the product already in the basket? (useful for a self-served distribution).
     * @property {string} tag Product info obtained from QR code scanning.
     * @property {array} images List of product images.
     */
    uAgBasket.Product = function() {
        // validate constructor with Model JSON SCHEMA
        // TODO TEST
        this.name = '?';
        this.producerName = '?';
        this.weight = 0;
        this.isIn = false;
        this.tag = new uAgUtils.Tag(); // default: empty tag
        // storing data or filenames? check if what is the right idea
        // TODO
        //this.images = [];
    };

    /** @description Using JSON stringification with pretty print (4 white spaces per indentation). */
    uAgBasket.Product.prototype.toString = function() {
        // TODO TEST
        var indentation = '    '; // 4 white spaces
        return JSON.stringify(this, null, indentation);
    };

    /**
     * @description Decorate a JSON data object following the product JSON Schema as a Product object.
     * @param {object} obj JSON data object.
     * @returns {object} Decorated JSON data object.
     */
    uAgBasket.Product.productify = function(obj) {
        // Could do that with a loop over Product prototype properties?
        // TODO
        // fill in non required fields in product JSON schema
        if(obj.producerName === undefined) {
            obj.producerName = '?';
        }
        if (obj.tag === undefined) {
            obj.tag = new uAgUtils.Tag();
        }
        // add Product methods
        obj.toString = uAgBasket.Product.prototype.toString;
        return obj;
    };

    /** @const */
    uAgBasket.Product.PREFIX_STR = 'product-'; // useful for building id string values in HTML elements

    /**
     * @class
     * @exports uAgUtils.Tag as uag.utils.Tag
     * @description Tag object constructor.
     * @property {string} text Tag content, in general either plain text, email address, phone number, SMS content.
     * @property {string} format Barcode types supported by <a href="http://github.com/phonegap/phonegap-plugins/tree/master/Android/BarcodeScanner">Barcode Scanner plugin for Cordova</a>.
     */
    uAgUtils.Tag = function(text, format) {
        this.text = text || ''; // sanity assignement
        this.format = format || ''; // sanity assignement
    };

    /** @description Using JSON stringification with pretty print (4 white spaces per indentation). */
    uAgUtils.Tag.prototype.toString = function() {
        // TODO TEST
        var indentation = '    '; // 4 white spaces
        return JSON.stringify(this, null, indentation);
    };

    /**
     * @class
     * @exports uAgBasket.Model as uag.basket.Model
     * @description Model of the Basket app (singleton pattern)
     */
    uAgBasket.Model = (function() {
        var instance = null;

        /** @ignore */
        function init() {
            /**
             * @const
             * @description JSON Schema for basket object following IETF Draft 03 specification (and using "" instead of usual '', since we are using JSON format).
             */
            var JSON_SCHEMA_OBJ = {
                "$schema": "http://json-schema.org/draft-03/schema",
                "description": "JSON schema describing basket data for the uAg Basket app",
                "type": "object",
                "required": true,
                "properties": {
                    "timestamp": {
                        "description": "date-time info in ISO 8601 format",
                        "type": "string",
                        "required": true,
                        "format": "date-time",
                        "minLength": 20
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
                                    "minLength": 1
                                },
                                "producerName": {
                                    "description": "product producer name",
                                    "type": "string",
                                    "required": false,
                                    "minLength": 1
                                },
                                "weight": {
                                    "description": "product weight in kilograms (in case of a single piece of vegetables, such as one salad, a best guess must be provided)",
                                    "type": "number",
                                    "required": true,
                                    "minimum": 0,
                                    "maximum": 100,
                                    "exclusiveMinimum": false
                                },
                                "isIn": {
                                    "description": "is the product already in the basket? (useful for a self-served distribution)",
                                    "type": "boolean",
                                    "required": true
                                },
                                "tag": {
                                    "description": "product info obtained from scanning a 1D or 2D barcode",
                                    "type": "object",
                                    "required": false,
                                    "properties" : {
                                        "text": {
                                            "description": "tag content, in general either plain text, email address, phone number, SMS content",
                                            "type": "string",
                                            "required": true,
                                            "minLength": 0
                                        },
                                        "format": {
                                            "description": "barcode types supported by Barcode Scanner plugin for Cordova, see http://github.com/phonegap/phonegap-plugins/tree/master/Android/BarcodeScanner for more",
                                            "type": "string",
                                            "required": true,
                                            "enum": [
                                                "QR_CODE",
                                                "DATA_MATRIX",
                                                "UPC_E",
                                                "UPC_A",
                                                "EAN_8",
                                                "EAN_13",
                                                "CODE_128",
                                                "CODE_39",
                                                "CODE_93",
                                                "CODABAR",
                                                "ITF",
                                                "RSS14",
                                                "PDF417",
                                                "RSS_EXPANDED"
                                            ]
                                        }
                                    }
                                },
                                "photos": {
                                    "description": "list of product photos",
                                    "type": "array",
                                    "required": false,
                                    "items": {
                                        "description": "JSON schema describing image data",
                                        "type": "object",
                                        "required": true,
                                        "properties": {
                                            "data" : {
                                                "description": "image data as string???",
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
            /** @const */
            var JSV_ENVIRONMENT_OBJ = JSV.createEnvironment("json-schema-draft-03"); // current default draft version

            // other vars
            var storedBasketKeysArr = []; // array of strings
            var currentBasketObj = null;
            var currentProductObj = null;

            /**
             * @public
             * @lends uag.basket.Model
             */
            return {
                /**
                 * @description Get a sorted list of stored baskets dates (older first).
                 * @returns {array} Array of Date objects.
                 */
                getStoredBasketDates: function() {
                    // tidying up: time-consuming?
                    // TODO
                    storedBasketKeysArr.sort(); // default: lexicographical sort (in dictionary order)
                    var dates = [];
                    for (var i = 0, len = storedBasketKeysArr.length; i < len; i++) {
                        var keyStr = storedBasketKeysArr[i];
                        var date = uAgBasket.Basket.getDateFromKey(keyStr);
                        dates.push(date);
                    }
                    return dates;
                },

                /**
                 * @description Get current basket object.
                 * @returns {object} Current basket object representation (or null if it does not exist).
                 */
                getCurrentBasket: function() {
                    return currentBasketObj;
                },

                /**
                 * @description Get current product object.
                 * @returns {object} Current product object representation (or null if it does not exist).
                 */
                getCurrentProduct: function() {
                    return currentProductObj;
                },

                /**
                 * @description Set current basket object using a JSON string input.
                 * @param {string} str String of data in JSON format following the basket JSON Schema.
                 * @returns {boolean} Success.
                 */
                setCurrentBasketFromStr: function(str) {
                    try {
                        // checking if string is valid JSON
                        var obj = JSON.parse(str);
                        console.info('Info: input string is valid JSON');

                        // checking if resulting JSON object follows basket JSON schema
                        var result = JSV_ENVIRONMENT_OBJ.validate(obj, JSON_SCHEMA_OBJ);
                        if (result.errors.length === 0) { // success JSON schema
                            console.info('Info: input string follows JSON schema for basket data');

                            // decorate JSON object
                            currentBasketObj = uAgBasket.Basket.basketify(obj);
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
                 * @description Set current basket object using a Date object input, as unique timestamp.
                 * @param {date} date Date object defining basket timestamp.
                 * @returns {boolean} Success.
                 */
                setCurrentBasketFromDate: function(date) {
                    var key = uAgBasket.Basket.getKeyFromDate(date);
                    var basketStr = window.localStorage.getItem(key);
                    if (basketStr !== null) {
                        // sanity check with JSON parse
                        try {
                            var obj = JSON.parse(basketStr);
                            currentBasketObj = uAgBasket.Basket.decorate(obj);
                            return true;
                        } catch (e) {
                            console.error(e.message);
                            return false;
                        }
                    } else {
                        console.info('Info: creating new basket');
                        currentBasketObj = new uAgBasket.Basket(date);
                        return true;
                    }
                },

                /**
                 * @description Set current product object using its index in the basket products array.
                 * @param {number} nbr Index in the basket products array.
                 * @returns {boolean} Success.
                 */
                setCurrentProduct: function(nbr) {
                    if (currentBasketObj !== null) {
                        var productsArr = currentBasketObj.products;
                        if (nbr >= 0 && nbr < productsArr.length) { // take the empty array case into account
                            currentProductObj = productsArr[nbr];
                            return true;
                        } else {
                            console.error('Error: no current basket products available');
                            return false;
                        }
                    } else {
                        console.error('Error: no current basket available');
                        return false;
                    }
                },

                /**
                 * @description Store basket in local storage.
                 * @returns {boolean} Success.
                 */
                storeCurrentBasket: function() {
                    // sanity check with current basket
                    if (currentBasketObj !== null) {

                        console.log('STORE CURR BSK ' + currentBasketObj.toString());/////////////TMP

                        // sanity check with JSON schema
                        var result = JSV_ENVIRONMENT_OBJ.validate(currentBasketObj, JSON_SCHEMA_OBJ);
                        if (result.errors.length === 0) {

                            // sanity check with JSON stringify
                            try {
                                var basketStr = JSON.stringify(currentBasketObj);

                                // checking if key already exists in local storage
                                var key = currentBasketObj.getKey();
                                var value = window.localStorage.getItem(key);
                                if (value === null) {
                                    console.info('Info: adding new key-value pair to local storage');
                                    storedBasketKeysArr.push(key);
                                }
                                window.localStorage.setItem(key, basketStr);
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
