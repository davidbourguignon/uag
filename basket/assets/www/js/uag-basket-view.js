/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket View
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-09-05
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
            function onHomePageInit(event) {
                var controller = uAgBasket.Controller.getInstance();
                $('#home-new-btn').on('click', controller.onNewBasketClick);
                $('#home-open-btn').on('click', controller.onOpenBasketClick);
                $('#home-import-btn').on('click', controller.onImportBasketClick);
            }

            /** @ignore */
            function onInfoPageInit(event) {
                $('#device-platform').text(window.device.platform);
                $('#device-version').text(window.device.version);
                $('#device-uuid').text(window.device.uuid);
            }

            /** @ignore */
            function onEditPageInit(event) {
                var controller = uAgBasket.Controller.getInstance();
                $('#edit-save-btn').on('click', controller.onSaveBasketClick);
                $('#edit-tag-btn').on('click', controller.onCaptureTagClick);
                $('#edit-add-btn').on('click', controller.onAddBasketItemClick);
            }

            /** @ignore */
            function onOpenPageChange() {
                var model = uAgBasket.Model.getInstance();
                var dates = model.getStoredBasketDates();
                var $ul = $('#open-basket-explorer-ul');
                $ul.empty();
                for (var i = 0, len = dates.length; i < len; i++) {
                    var date = dates[i];
                    $ul.append('<li><a id="' +
                               date.toISOString() +
                               '" href="#edit">' +
                               date.toLocaleDateString() +
                               '</a></li>'); // list view syntax
                }
                $ul.listview('refresh');
                var controller = uAgBasket.Controller.getInstance();
                $ul.find('a').on('click', controller.onBasketExplorerClick);
            }

            /** @ignore */
            function onEditPageChange() {
                var model = uAgBasket.Model.getInstance();
                var basketObj = model.getCurrentBasket();
                // TMP create a basket decorator
                for (var key in basketObj) {
                    switch (key) {
                        case 'timestamp':///////////TMP
                            $('#basket-distrib-date').val(basketObj[key]); //////////////// PUT EVERYTHING IN CONST VARS!!!!!!!!!!!!!!!!!!!
                            break;
                        default:
                            //console.error('Error: unknown property in basket object');
                    }
                }
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

            /**
             * @public
             * @lends uag.basket.View
             */
            return {
                /**
                 * @description TODO
                 */
                onPageInit: function(event) {
                    var pageId = $(event.target).attr('id');
                    console.info('Info: pageinit event fired for ' + pageId);
                    switch (pageId) {
                        case 'home':
                            onHomePageInit();
                            break;
                        case 'info':
                            onInfoPageInit();
                            break;
                        case 'open':
                        case 'import':
                            // TODO
                            break;
                        case 'edit':
                            onEditPageInit();
                            break;
                        default:
                            console.error('Error: unknown page id');
                    }
                },

                /**
                 * @description TODO
                 */
                onPageBeforeChange: function(event, data) {
                    var pageId = pageDataToId(data.toPage);
                    console.info('Info: pagebeforechange event fired for ' + pageId);
                    switch (pageId) {
                        case 'home':
                        case 'info':
                        case 'open':
                        case 'import':
                        case 'edit':
                            break;
                        default:
                            console.error('Error: unknown page id');
                    }
                },

                /**
                 * @description TODO
                 */
                onPageChange: function(event, data) {
                    var pageId = pageDataToId(data.toPage);
                    console.info('Info: pagechange event fired for ' + pageId);
                    switch (pageId) {
                        case 'home':
                        case 'info':
                            break;
                        case 'open':
                            onOpenPageChange();
                            break;
                        case 'import':
                            break;
                        case 'edit':
                            onEditPageChange();
                            break;
                        default:
                            console.error('Error: unknown page id');
                    }
                },

                /**
                 * @description TODO
                 */
                onPageChangeFailed: function(event, data) {
                    console.error('Error: pagechangefailed event fired for '  + pageDataToId(data.toPage));
                },

                /**
                 * @description TODO
                 */
                changeToOpenPage: function() {
                    // TODO
                },

                /**
                 * @description TODO
                 */
                switchToImportPage: function() {
                    var controller = uAgBasket.Controller.getInstance();
                    try {
                        importFileExplorer.run($('#import-file-explorer-div'),
                                               controller.onFileExplorerCheck);
                    } catch (e) {
                        console.error(e.message);
                    }
                },

                /**
                 * @description TODO
                 */
                switchToEditPage: function() {
                    $.mobile.changePage($('#edit'), {transition:'fade'}); //////////////// PUT EVERYTHING IN CONST VARS!!!!!!!!!!!!!!!!!!!
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
