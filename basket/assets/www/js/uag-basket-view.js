/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket View
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-09-03
 */
/** @namespace uAg project */
var uag = (function(parent, $, window, document, undefined) {
    'use strict';
    // namespace declarations
    var uAgUtils = parent.utils = parent.utils || {};
    var uAgBasket = parent.basket = parent.basket || {};

    /**
     * @class
     * @exports uAgBasket.View as uag.basket.View
     * @description View of the Basket app (singleton pattern)
     */
    uAgBasket.View = (function() {
        var instance = null;

        /** @ignore */
        function init() {
            var importFileExplorer = uAgUtils.makeFileExplorer();

            /** @ignore */
            function bindController() {
                var controller = uAgBasket.Controller.getInstance();

                // jQuery Mobile bindings
                $(document).on('mobileinit', controller.onMobileInit); // never called: too late? TODO
                $(document).on('pageinit', controller.onPageInit);

                // Cordova bindings
                $(document).on('deviceready', controller.onDeviceReady);
                $(document).on('pause', controller.onPause);
                $(document).on("resume", controller.onResume);

                // other bindings, when DOM is ready
                $(document).ready(function() {
                    $('#home-new-btn').on('click', controller.onNewBasketClick);
                    $('#home-open-btn').on('click', controller.onOpenBasketClick);
                    $('#home-import-btn').on('click', controller.onImportBasketClick);
                    // switch to #edit only?
                    // TODO
                    $('#new-save-btn').on('click', controller.onSaveBasketClick);
                    $('#new-tag-btn').on('click', controller.onCaptureTagClick);
                    $('#new-add-btn').on('click', controller.onAddBasketItemClick);
                });
            }

            // initial setup
            bindController();

            /**
             * @public
             * @lends uag.basket.View
             */
            return {
                /**
                 * @description TODO
                 */
                setDeviceInfo: function() {
                    // how to make sure this is called after onDeviceReady has fired?
                    // TODO
                    $('#device-platform').text(window.device.platform);
                    $('#device-version').text(window.device.version);
                    $('#device-uuid').text(window.device.uuid);
                },
                /**
                 * @description TODO
                 */
                openImportFileExplorer: function() {
                    var controller = uAgBasket.Controller.getInstance();
                    importFileExplorer.run($('#import-file-explorer-div'),
                                           controller.onFileExplorerCheck);
                },
                /**
                 * @description TODO
                 */
                switchToEditPage: function() {
                    $.mobile.changePage($('#edit'), {transition:'fade'});
                    var model = uAgBasket.Model.getInstance();
                    //request info from model to populate page
                    //STOPPED HERE
                },
            }; // return
        } // private function init()

        /**
         * @public
         * @lends uag.basket.View
         */
        return {
            /**
             * @returns {object} View singleton instance.
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
