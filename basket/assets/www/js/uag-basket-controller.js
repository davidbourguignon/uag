/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket Controller
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-08-31
 */
/** @namespace uAg project */
var uag = (function(parent, $, window, document, makeFileExplorer/*, jsonSchema*/) {
    'use strict'; // enforcing strict JS
    var uAgBasket = parent.basket = parent.basket || {};

    /**
     * @class
     * @exports uAgBasket.controller as uag.basket.controller
     * @description Controller module of the Basket app (implements the module pattern).
     */
    uAgBasket.controller = (function() {
        /**
         * @private
         */
        // view objects
        var platformSpan = null;
        var versionSpan = null;
        var uuidSpan = null;
        var pageDiv = null;
        var gridDiv = null;

        // other vars
        var isJQueryMobileReady = false;
        var isCordovaReady = false;
        var fileExplorer = makeFileExplorer();
        var fileObj = null;

        function onFileExplorerCheck(fileStr) {
            try {
                fileObj = JSON.parse(fileStr);
            } catch (e) {
                console.error(e.message);
                return false;
            }
            // is schema ?
            // TMP
            /*
            var env = JSV.createEnvironment("json-schema-draft-03");
            var result = env.validate(fileObj, jsonSchema);
            if (result.errors.length === 0) { // success
                console.info('Info: file object is valid');
                return true;
            } else { // failure
                var errorArr = result.errors;
                console.error('Error:\nuri: ' + errorArr[0].uri +
                                    '\nmessage: ' + errorArr[0].message);
                return false;
            }*/
            return true;
        }
        function onFileExplorerClose(event) {
            if (pageDiv !== null) {
                pageDiv.dialog('close');
            } else {
                console.error('Error: explorer view objects are not set');
            }
        }

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
                        fileExplorer.run(gridDiv,
                                         onFileExplorerCheck,
                                         onFileExplorerClose);
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
            setExplorerView: function($pageDiv, $gridDiv) {
                // how to make sure the page div has been opened as a dialog?
                // TODO
                if ($pageDiv instanceof jQuery &&
                    $pageDiv.is('div[data-role="page"]') &&
                    $gridDiv instanceof jQuery &&
                    $gridDiv.is('div[class="ui-grid-b"]')) {
                    pageDiv = $pageDiv;
                    gridDiv = $gridDiv;
                } else {
                    console.error('Error: wrong about view info');
                }
            },
        };
    }());
    Object.freeze(uAgBasket.controller); // final

    return parent;
}(uag || {}, jQuery, this, this.document, uag.utils.makeFileExplorer/*, uag.basket.model.jsonSchema*/));
