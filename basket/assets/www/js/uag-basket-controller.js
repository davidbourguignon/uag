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
var uag = (function(parent, $, window, document, makeFileExplorer/*, jsonSchema*/, undefined) {
    'use strict'; // enforcing strict JS
    var uAgBasket = parent.basket = parent.basket || {}; // namespace

    /**
     * @class
     * @exports uAgBasket.Controller as uag.basket.Controller
     * @description Controller of the Basket app (singleton pattern)
     */
    uAgBasket.Controller = (function() {
        var instance = null;

        /** @ignore */
        function init() {
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

            /** @ignore */
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

            /** @ignore */
            function onFileExplorerClose(event) {
                if (pageDiv !== null) {
                    pageDiv.dialog('close');
                } else {
                    console.error('Error: explorer view objects are not set');
                }
            }

            /**
             * @public
             * @lends uag.basket.Controller
             */
            return {
                /** @description Function callback invoked when jQuery Mobile starts. */
                onMobileInit: function(event) {
                    console.info('Info: mobileinit event fired');
                    isJQueryMobileReady = true;
                    // add page loading symbol in jQuery Mobile 1.2
                    // TODO
                },

                /** @description Function callback invoked when a Cordova application is ready. */
                onDeviceReady: function(event) {
                    console.info('Info: deviceready event fired');
                    isCordovaReady = true;
                    platformSpan.text(window.device.platform);
                    versionSpan.text(window.device.version);
                    uuidSpan.text(window.device.uuid);
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
                options: function(event) {
                },

                /** @description TODO */
                newBasket: function(event) {
                },

                /** @description TODO */
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

                /** @description TODO */
                saveBasket: function(event) {
                },

                /** @description TODO */
                captureTag: function(event) {
                },

                /** @description TODO */
                addNewBasketItem: function(event) {
                },

                /** @description TODO */
                loadBasketFile: function(event) {
                },

                /**
                 * @param {object} $platformSpan JQuery Mobile object containing the DOM reference to a span.
                 * @param {object} $versionSpan JQuery Mobile object containing the DOM reference to a span.
                 * @param {object} $uuidSpan JQuery Mobile object containing the DOM reference to a span.
                 * @description Set the jQuery Mobile objects of the about dialog view.
                 */
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

                /**
                 * @param {object} $pageDiv JQuery Mobile object containing the DOM reference to the div with the page role.
                 * @param {object} $gridDiv JQuery Mobile object containing the DOM reference to the div with the grid class.
                 * @description Set the jQuery Mobile objects of the file explorer view.
                 */
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
            }; // return {}
        }; // function init()

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
        }; // return {}
    }()); // immediately-invoked function expression (IIFE)

    return parent;
}(uag || {}, jQuery, this, this.document, uag.utils.makeFileExplorer/*, uag.basket.model.jsonSchema*/));
