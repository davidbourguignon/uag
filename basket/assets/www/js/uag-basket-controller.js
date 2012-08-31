/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket Controller
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-08-30
 */
/** @namespace uAg project */
var uag = (function(parent, $, window, document, makeFileExplorer) {
    'use strict'; // enforcing strict JS
    var uAgBasket = parent.basket = parent.basket || {};

    /**
     * @class
     * @exports uAgBasket.controller as uag.basket.controller
     * @description Controller module of the Basket app
     */
    uAgBasket.controller = (function() {
        /**
         * @private
         */
        var isJQueryMobileReady = false;
        var isCordovaReady = false;
        var platformSpan = null;
        var versionSpan = null;
        var uuidSpan = null;
        var fileExplorer = makeFileExplorer();

        /**
         * @public
         * @lends uag.basket.controller
         */
        return {
            onMobileInit: function(event) {
                // when jQuery Mobile starts
                console.info('Info: mobileinit event fired');
                isJQueryMobileReady = true;
                // add page loading symbol in jQuery Mobile 1.2
                // TODO
            },
            onDeviceReady: function(event) {
                // when a Cordova application is ready
                console.info('Info: deviceready event fired');
                isCordovaReady = true;
                platformSpan.text(window.device.platform);
                versionSpan.text(window.device.version);
                uuidSpan.text(window.device.uuid);
            },
            onPageInit: function(event) {
                // when a new page is loaded and created by jQuery Mobile
                console.info('Info: pageinit event fired');
            },
            onPause: function(event) {
                // when a Cordova application is put into the background
                console.info('Info: pause event fired');
            },
            onResume: function(event) {
                // when a Cordova application is retrieved from the background
                console.info('Info: resume event fired');
            },
            options: function(event) {
                // TODO
            },
            newBasket: function(event) {
                // TODO
            },
            openBasket: function(event) {
                if (isCordovaReady) {
                    console.info('Info: uag.basket.controller ready');
                    try {
                        fileExplorer.explore();
                    } catch (e) {
                        console.error(e.message);
                    }
                } else {
                    console.error('Error: uag.basket.controller NOT READY');
                }
            },
            saveBasket: function(event) {
                // TODO
            },
            captureTag: function(event) {
                // TODO
            },
            addNewBasketItem: function(event) {
                // TODO
            },
            loadBasketFile: function(event) {
                // TODO
            },
            setAboutView: function($platformSpan, $versionSpan, $uuidSpan) {
                if ($platformSpan instanceof jQuery && $platformSpan.is('span') &&
                    $versionSpan instanceof jQuery && $versionSpan.is('span') &&
                    $uuidSpan instanceof jQuery && $uuidSpan.is('span')) {
                    platformSpan = $platformSpan;
                    versionSpan = $versionSpan;
                    uuidSpan = $uuidSpan;
                } else {
                    console.error('Error: wrong about view info');
                }
            },
            setExplorerView: function($gridDiv) {
                try {
                    fileExplorer.setView($gridDiv);
                } catch (e) {
                    console.error(e.message);
                }
                /*callback onFileCheck, onFileExplorerSuccess, onFileExplorerFailure
                 * if (dialogDiv !== null) {
                dialogDiv.dialog('close');
            } else {
                throw new Error('Error: explorer view objects are not set');
            }*/
            },
        };
    }());
    Object.freeze(uAgBasket.controller); // final

    return parent;
}(uag || {}, jQuery, this, this.document, uag.utils.makeFileExplorer));
