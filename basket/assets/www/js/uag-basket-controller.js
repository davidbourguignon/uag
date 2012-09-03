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
            var isJQueryMobileReady = false;
            var isCordovaReady = false;

            /**
             * @public
             * @lends uag.basket.Controller
             */
            return {
                /** @description Function callback invoked when jQuery Mobile starts. */
                onMobileInit: function(event) {
                    // add page loading symbol in jQuery Mobile 1.2
                    // TODO
                    console.info('Info: mobileinit event fired');
                    isJQueryMobileReady = true;
                },

                /** @description Function callback invoked when a Cordova application is ready. */
                onDeviceReady: function(event) {
                    console.info('Info: deviceready event fired');
                    isCordovaReady = true;
                    var view = uAgBasket.View.getInstance();
                    view.setDeviceInfo();
                },

                /** @description Function callback invoked when a new page is loaded and created by jQuery Mobile. */
                onPageInit: function(event) {
                    console.info('Info: pageinit event fired');
                },

                /** @description Function callback invoked when a Cordova application is put into the background. */
                onPause: function(event) {
                    console.info('Info: pause event fired');
                },

                /** @description Function callback invoked when a Cordova application is retrieved from the background. */
                onResume: function(event) {
                    console.info('Info: resume event fired');
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
                        console.info('Info: uag.basket.controller ready');
                        var view = uAgBasket.View.getInstance();
                        try {
                            view.openImportFileExplorer();
                        } catch (e) {
                            console.error(e.message);
                        }
                    } else {
                        console.error('Error: uag.basket.controller NOT READY');
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
