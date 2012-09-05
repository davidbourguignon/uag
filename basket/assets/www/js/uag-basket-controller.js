/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket Controller
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
                    var isBasketSet = model.setCurrentBasketFromDate(new Date()); // current date
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
                    // TODO
                },

                /** @description TODO */
                onSaveBasketClick: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var isBasketStored = model.storeCurrentBasket();
                    if (!isBasketStored) {
                        console.error('Error: current basket not stored');
                    }
                },

                /** @description TODO */
                onCaptureTagClick: function(event) {
                    // TODO
                },

                /** @description TODO */
                onAddBasketItemClick: function(event) {
                    // TODO
                },

                /**
                 * @description TODO
                 */
                onBasketExplorerClick: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var isBasketSet = model.setCurrentBasketFromDate(new Date($(event.target).attr('id')));
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
                    var isBasketSet = model.setCurrentBasketFromJson(fileStr);
                    if (isBasketSet) {
                        var view = uAgBasket.View.getInstance();
                        view.changeToEditPage();
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
