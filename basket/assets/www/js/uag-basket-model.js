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
var uag = (function(parent, $, window, document, undefined) {
    'use strict';
    // namespace declaration
    var uAgBasket = parent.basket = parent.basket || {};

    /**
     * @class
     * @exports uAgBasket.model as uag.basket.model
     * @description Model of the Basket app (module pattern)
     */
    uAgBasket.model = (function() {
        /**
         * @public
         * @lends uag.basket.model
         */
        return {
            /**
             * @const
             * @description JSON schema of the basket model according to <a href="http://tools.ietf.org/html/draft-zyp-json-schema-03">IETF JSON Schema Draft 03</a>.
             */
            JSON_SCHEMA: {
                "$schema": "http://json-schema.org/draft-03/schema",
                "description": "JSON schema describing basket data for the uAg Basket app",
                "type": "object",
                "required": true,
                "properties": {
                    "distribDate": {
                        "description": "basket distribution date in ISO 8601 format",
                        "type": "string",
                        "required": false,
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
        };
    }());

    return parent;
}(uag || {}, jQuery, this, this.document));
