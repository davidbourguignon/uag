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
                        var view = uAgBasket.View.getInstance();
                        view.addNewProductToEditPage(basketObj);
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
                        var view = uAgBasket.View.getInstance();
                        view.removeLastProductFromEditPage();
                    } else {
                        console.error('Error: no current basket available');
                    }
                },

                /** @description TODO */
                onCaptureTagClick: function(event) {
                    // TODO
                    /*function scan() {
                        window.plugins.barcodeScanner.scan(function(result) {
                                alert("We got a barcode\n" +
                                      "Result: " + result.text + "\n" +
                                      "Format: " + result.format);
                            }, function(error) {
                                alert("Scanning failed: " + error);
                            });
                    }*/
                },

                /**
                 * @description TODO
                 */
                onBasketExplorerClick: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var date = new Date($(event.target).attr('id')); // TODO VC tightly coupled: is there a better way?
                    var isBasketSet = model.setCurrentBasketFromDate(date);
                    if (!isBasketSet) {
                        console.error('Error: current basket not set');
                    }
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
