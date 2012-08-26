/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket Controller
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-08-26
 */
/** @namespace uAg project */
var uag = (function (parent, $, window, document, FileExplorer) {
    'use strict'; // enforcing strict JS

    var uAgBasket = parent.basket = parent.basket || {};
    /**
     * @class
     * @exports uAgBasket.controller as uag.basket.controller
     * @description Controller module of the Basket app
     */
    uAgBasket.controller = (function () {
        /** @private */
        var isReadyCordova = false;
        var fileExplorer = null;

        /**
         * @function
         * @private
         * @description Callbacks
         */
        function onDeviceReady (event) {
            // when a PhoneGap application is ready
            console.info('Info: deviceready event fired');
            isReadyCordova = true;
            document.addEventListener('pause', onPause, false);
            document.addEventListener("resume", onResume, false);
            try {
                fileExplorer.initAfterDeviceReady();
            } catch (exception) {
                console.error(exception.message);
            }
        }
        function onPause (event) {
            // when a PhoneGap application is put into the background
            console.info('Info: pause event fired');
        }
        function onResume (event) {
            // when a PhoneGap application is retrieved from the background
            console.info('Info: resume event fired');
        }
        /**
         * @function
         * @public
         * @lends uag.basket.controller
         */
        return {
            init: function () {
                document.addEventListener('deviceready',
                                          onDeviceReady, false);
            },
            options: function (event) {
                // TODO
            },
            newBasket: function (event) {
                // TODO
            },
            openBasket: function (event) {
                // TODO
            },
            saveBasket: function (event) {
                // TODO
            },
            captureTag: function (event) {
                // TODO
            },
            addNewBasketItem: function(event) {
                // TODO
            },
            loadBasketFile: function (event) {
                // TODO
            },
            setFileExplorerObj: function ($homeBtn,$backBtn) {
                try {
                    fileExplorer = new FileExplorer($homeBtn,$backBtn);
                } catch (exception) {
                    console.error(exception.message);
                }
            },
            isReady: function () {
                return isReadyCordova;
            },
        };
    }());
    Object.freeze(uAgBasket.controller); // final

    return parent;
}(uag || {}, jQuery, this, this.document, uag.utils.FileExplorer));
