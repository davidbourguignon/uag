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
            var isCordovaReady = false;

            /**
             * @public
             * @lends uag.basket.Controller
             */
            return {
                /** @description TODO */
                setReady: function(event) {
                    isCordovaReady = true;
                },

                /** @description TODO */
                onNewBasketClick: function(event) {
                },

                /** @description TODO */
                onOpenBasketClick: function(event) {
                },

                /** @description TODO */
                onImportBasketClick: function(event) {
                    if (isCordovaReady) {
                        var view = uAgBasket.View.getInstance();
                        try {
                            view.openImportFileExplorer();
                        } catch (e) {
                            console.error(e.message);
                        }
                    } else {
                        console.error('Error: Cordova application is not ready');
                    }
                },

                /** @description TODO */
                onSaveBasketClick: function(event) {
                },

                /** @description TODO */
                onCaptureTagClick: function(event) {
                },

                /** @description TODO */
                onAddBasketItemClick: function(event) {
                },

                /**
                 * @description TODO
                 * @returns {boolean} Success.
                 */
                onFileExplorerCheck: function(fileStr) {
                    var model = uAgBasket.Model.getInstance();
                    var isBasketAdded = model.addBasket(fileStr);
                    if (isBasketAdded) {
                        var view = uAgBasket.View.getInstance();
                        view.switchToEditPage();
                        return true;
                    } else  {
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
