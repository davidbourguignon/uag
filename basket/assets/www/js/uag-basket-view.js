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
            function onInfoPageInit(event) {
                $('#device-platform').text(window.device.platform);
                $('#device-version').text(window.device.version);
                $('#device-uuid').text(window.device.uuid);
                console.info('Info: pageinit event fired for info');
            }

            /** @ignore */
            function pageDataToId(pageData) {
                var pageId = '';
                if (typeof pageData === 'object') {
                    pageId = pageData.attr('id');
                } else if (typeof pageData === 'string') {
                    var urlObj = $.mobile.path.parseUrl(pageData);
                    pageId = urlObj.hash;
                    pageId = pageId.slice(1); // removing initial #
                } else {
                    console.error('Error: unknown type for data.toPage');
                }
                return pageId;
            }

            /** @ignore */
            function renderEditPage(basketObj) {
                for (var key in basketObj) {
                    switch (key) {
                        case 'distribDate':
                            $('#edit-distrib-date').val(basketObj[key]);
                            break;
                        default:
                            console.error('Error: unknown property in basket object');
                    }
                }
            }

            /**
             * @public
             * @lends uag.basket.View
             */
            return {
                /**
                 * @description TODO
                 */
                setReady: function() {
                    var controller = uAgBasket.Controller.getInstance();
                    controller.setReady();
                    $('#home-new-btn').on('click', controller.onNewBasketClick);
                    $('#home-open-btn').on('click', controller.onOpenBasketClick);
                    $('#home-import-btn').on('click', controller.onImportBasketClick);
                    $('#info').on('pageinit', onInfoPageInit);
                    $('#edit-save-btn').on('click', controller.onSaveBasketClick);
                    $('#edit-tag-btn').on('click', controller.onCaptureTagClick);
                    $('#edit-add-btn').on('click', controller.onAddBasketItemClick);
                },

                /**
                 * @description TODO
                 */
                onPageInit: function(event) {
                    // use pageinit per page instead of $(document).ready() for all?
                    // TODO
                    var $obj = $(event.target);
                    console.info('Info: pageinit event fired for ' + $obj.attr('id'));
                },

                /**
                 * @description TODO
                 */
                onPageBeforeChange: function(event, data) {
                    var pageId = pageDataToId(data.toPage);
                    switch (pageId) {
                        case 'edit':
                            $('#edit-content').html('<h4>THIS IS IT</h4>');///////////////TMP///////////////////
                            //renderEditPage();
                            break;
                        default:
                            console.error('Error: unknown page id');
                    }
                    console.info('Info: pagebeforechange event fired for id = ' + pageId);
                },

                /**
                 * @description TODO
                 */
                onPageChange: function(event, data) {
                    console.info('Info: pagechange event fired for id = ' + pageDataToId(data.toPage));
                },

                /**
                 * @description TODO
                 */
                onPageChangeFailed: function(event, data) {
                    console.log('Info: pagechangefailed event fired for id = '  + pageDataToId(data.toPage));
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
                    var model = uAgBasket.Model.getInstance();
                    var basketObj = JSON.parse(model.retrieveLastBasket());
                    $.mobile.changePage($('#edit'), {transition:'fade'});
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
