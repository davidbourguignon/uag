/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket Controller
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-09-07
 */
/** @namespace uAg project */
var uag = (function(parent, $, window, document, undefined) {
    'use strict';
    // namespace declarations
    var uAgBasket = parent.basket = parent.basket || {};
    var uAgUtils = parent.utils = parent.utils || {};

    /**
     * @class
     * @exports uAgBasket.Controller as uag.basket.Controller
     * @description Controller of the Basket app (singleton pattern)
     */
    uAgBasket.Controller = (function() {
        var instance = null;

        /** @ignore */
        function init() {
            var productNbr = 0;

            /** @ignore */
            function onTagScanSuccess(result) {
                console.info('Info: barcode scan successful');

                // get barcode
                var tag = new uAgUtils.Tag(result.text, result.format);
                var model = uAgBasket.Model.getInstance();
                var basketObj = model.getCurrentBasket();
                basketObj.products[productNbr].tag = tag;

                // display barcode
                var view = uAgBasket.View.getInstance();
                view.switchToTagPage();
            }

            /** @ignore */
            function onTagScanFailure(error) {
                console.error('Error: barcode scanning failed - ' + error);
            }

            /**
             * @public
             * @lends uag.basket.Controller
             */
            return {
                /** @description TODO */
                onNewBasketClick: function(event) {
                    var model =  uAgBasket.Model.getInstance();
                    var date = new Date(); // current date
                    var isBasketSet = model.setCurrentBasketFromDate(date);
                    if (!isBasketSet) {
                        console.error('Error: current basket not set');
                    }
                },

                /** @description TODO */
                onImportBasketClick: function(event) {
                    var view = uAgBasket.View.getInstance();
                    view.switchToImportPage();
                },

                /** @description TODO */
                onAddNewProductClick: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = model.getCurrentBasket();
                    if (basketObj !== null) {
                        var productObj = new uAgBasket.Product();
                        basketObj.products.push(productObj);
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /** @description TODO */
                onSaveBasketClick: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var isBasketStored = model.storeCurrentBasket();
                    if (!isBasketStored) {
                        console.error('Error: current basket not stored');
                    } else {
                        // use jQuery Mobile 1.2.0 popup to acknowledge saved?
                        // TODO
                    }
                },

                /** @description TODO */
                onRemoveLastProductClick: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = model.getCurrentBasket();
                    if (basketObj !== null) {
                        basketObj.products.pop();
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /** @description TODO */
                onProductIsInChange: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = model.getCurrentBasket();
                    if (basketObj !== null) {
                        basketObj.products[productNbr].isIn
                            = ($(event.target).val() === 'true'); // conversion of string value to boolean
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /** @description TODO */
                onProductNameChange: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = model.getCurrentBasket();
                    if (basketObj !== null) {
                        basketObj.products[productNbr].name
                            = $(event.target).val();
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /** @description TODO */
                onProductProducerNameChange: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = model.getCurrentBasket();
                    if (basketObj !== null) {
                        basketObj.products[productNbr].producerName
                            = $(event.target).val();
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /** @description TODO */
                onProductWeightChange: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = model.getCurrentBasket();
                    if (basketObj !== null) {
                        basketObj.products[productNbr].weight
                            = (+ $(event.target).val()); // conversion of string value to number
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /** @description TODO */
                onOpenScanTagClick: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = model.getCurrentBasket();
                    if (basketObj !== null) {
                        if (basketObj.products[productNbr].tag === null) {
                            console.info('Info: no product tag available, scanning barcode...');
                            window.plugins.barcodeScanner.scan(onTagScanSuccess,
                                                               onTagScanFailure);
                        } else {
                            var view = uAgBasket.View.getInstance();
                            view.switchToTagPage();
                        }
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /** @description TODO */
                onTakePhotosClick: function(event) {
                    // TODO
                },

                /** @description TODO */
                onRemoveCurrentProductClick: function(event) {
                    // View-Controller tightly coupled: is there a better way?
                    // TODO
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = model.getCurrentBasket();
                    if (basketObj !== null) {
                        basketObj.products.splice(productNbr, 1);
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /**
                 * @description TODO
                 */
                onBasketListClick: function(event) {
                    // View-Controller tightly coupled: is there a better way?
                    // TODO
                    var model = uAgBasket.Model.getInstance();
                    var date = new Date($(event.target).attr('id'));
                    var isBasketSet = model.setCurrentBasketFromDate(date);
                    if (!isBasketSet) {
                        console.error('Error: current basket not set');
                    }
                },

                /**
                 * @description TODO
                 */
                onProductListClick: function(event) {
                    // View-Controller tightly coupled: is there a better way?
                    // TODO
                    var productId = $(event.target).attr('id');
                    productNbr
                        = productId.slice(uAgBasket.Product.PREFIX_STR.length);
                    var model = uAgBasket.Model.getInstance();
                    model.setCurrentProduct(productNbr);
                },

                /**
                 * @description TODO
                 * @returns {boolean} Success.
                 */
                onFileExplorerCheck: function(fileStr) {
                    var model = uAgBasket.Model.getInstance();
                    var isBasketSet = model.setCurrentBasketFromStr(fileStr);
                    if (isBasketSet) {
                        var view = uAgBasket.View.getInstance();
                        view.switchToEditPage();
                        return true;
                    } else  {
                        console.error('Error: current basket not set');
                        return false;
                    }
                },
            }; // return
        }; // private function init()

        /**
         * @public
         * @lends uag.basket.Controller
         */
        return {
            /**
             * @returns {object} Controller singleton instance.
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
