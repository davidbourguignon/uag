/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket Controller
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-09-06
 */
/** @namespace uAg project */
var uag = (function(parent, $, window, document, undefined) {
    'use strict';
    // namespace declaration
    var uAgBasket = parent.basket = parent.basket || {};

    /**
     * @class
     * @exports uAgBasket.Controller as uag.basket.Controller
     * @description Controller of the Basket app (singleton pattern)
     */
    uAgBasket.Controller = (function() {
        var instance = null;

        /** @ignore */
        function init() {
            var productListItemNbr = 0;

            /** @ignore */
            function onTagScanSuccess(result) {
                alert("We got a barcode\n" +
                      "Result: " + result.text + "\n" +
                      "Format: " + result.format);//TMP
            }

            /** @ignore */
            function onTagScanFailure(error) {
                alert("Scanning failed: " + error);//TMP
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
                onOpenBasketClick: function(event) {
                    // useful?
                    // TODO
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
                        basketObj.products.push(new uAgBasket.Product());
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
                        basketObj.isIn = $(event.target).val();
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /** @description TODO */
                onProductNameChange: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = model.getCurrentBasket();
                    if (basketObj !== null) {
                        basketObj.name = $(event.target).val();
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /** @description TODO */
                onProductProducerNameChange: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = model.getCurrentBasket();
                    if (basketObj !== null) {
                        basketObj.producerName = $(event.target).val();
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /** @description TODO */
                onProductWeightChange: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = model.getCurrentBasket();
                    if (basketObj !== null) {
                        basketObj.weight = $(event.target).val();
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /** @description TODO */
                onOpenScanTagClick: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = model.getCurrentBasket();
                    if (basketObj !== null) {
                        if (basketObj.tag !== '') {
                            // tag is already there!
                            // display tag as raw string in a text area (new page tag)
                            // TODO
                        } else {
                            window.plugins.barcodeScanner.scan(onTagScanSuccess,
                                                               onTagScanFailure);
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
                        basketObj.products.splice(productListItemNbr, 1);
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
                    var len = uAgBasket.Product.PREFIX_STR.length;
                    var id = $(event.target).attr('id');
                    productListItemNbr = id.slice(len);
                    //update view with product reference
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
