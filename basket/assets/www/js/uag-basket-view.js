/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket View
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-09-06
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
            function onOpenPageBeforeChange() {
                $('#open-basket-explorer-title').empty(); // TODO CONST VAR
                $('#open-basket-explorer-listview').empty(); // TODO CONST VAR
            }

            /** @ignore */
            function onOpenPageChange() {
                var model = uAgBasket.Model.getInstance();
                var dates = model.getStoredBasketDates();
                var $title = $('#open-basket-explorer-title'); // TODO CONST VAR
                var $list = $('#open-basket-explorer-listview'); // TODO CONST VAR
                if (dates.length === 0) {
                    $title.text('No baskets in store!');
                } else {
                    for (var i = 0, len = dates.length; i < len; i++) {
                        var date = dates[i];
                        $list.append('<li><a id="' +
                                     date.toISOString() +
                                     '" href="#edit">' +
                                     date.toLocaleDateString() +
                                     '</a></li>');
                    }
                    $list.listview('refresh');
                    var controller = uAgBasket.Controller.getInstance();
                    $list.find('a').on('click', controller.onBasketExplorerClick);
                }
            }

            /** @ignore */
            function onEditPageInit(event) {
                var controller = uAgBasket.Controller.getInstance();
                $('#edit-add-btn').on('click', controller.onAddNewProductClick);
                $('#edit-save-btn').on('click', controller.onSaveBasketClick);
                $('#edit-remove-btn').on('click', controller.onRemoveLastProductClick);
            }

            /** @ignore */
            function onEditPageBeforeChange() {
                $('#basket-title').empty(); // TODO CONST VAR
                $('#products-div').empty(); // TODO CONST VAR
            }

            /**
             * @description TODO
             */
            function appendNewProductToDiv(productObj, indexNbr) {
                var $productsDiv = $('#products-div'); // TODO CONST VAR
                // product properties objects
                var name = productObj.name;
                var producerName = productObj.producerName;
                var approxWeight = productObj.approxWeight;
                var isIn = productObj.isIn;
                // product id string
                var id  = 'product-' + indexNbr + '-';

                // could use Handlebars templates instead?
                // TODO
                var htmlStr =
                    '<div id="' + id + 'div" data-role="collapsible">' +
                        '<h4><span id="' + id + 'name-title">' + name + '</span>, ' +
                        '<span id="' + id + 'approxWeight-title">' + approxWeight + 'kg</span></h4>' +
                        '<p>The collapsible content</p>' + //TMP
                    '</div>';
/*
                <div id="product-6-div" data-role="collapsible"
                     data-collapsed="false"
                     data-theme="c">
                    <h4 id="product-title">
                        <span id="product-name-title"></span>,
                        <span id="product-approx-weight-title"></span>
                    </h4>
//
                    <div data-role="fieldcontain">
                        <label for="product-is-in">Is in?</label>
                        <select name="product-is-in"
                                id="product-is-in"
                                data-role="slider">
                            <option value="off">No</option>
                            <option value="on">Yes</option>
                        </select>
                    </div>
                    <div data-role="fieldcontain">
                        <label for="product-name">Name</label>
                        <input type="text"
                               name="product-name"
                               id="product-name"
                               value="" />
                    </div>
                    <div data-role="fieldcontain">
                        <label for="product-producer-name">Producer</label>
                        <input type="text"
                               name="product-producer-name"
                               id="product-producer-name"
                               value="" />
                    </div>
                    <div data-role="fieldcontain">
                        <label for="product-approx-weight">Approx. weight</label>
                        <input type="range"
                               name="product-approx-weight"
                               id="product-approx-weight"
                               value="0"
                               min="0"
                               max="10"
                               step="0.1"
                               data-highlight="true" />
                    </div>
                    <div data-role="controlgroup">
                        <a id="edit-tag-btn" href="#" data-role="button">Tag</a>
                        <a id="edit-img-btn" href="#" data-role="button">Photos</a>
                    </div>
//
                </div>
*/
                $productsDiv.append(htmlStr).trigger('create');
            }

            /** @ignore */
            function onEditPageChange() {
                var model = uAgBasket.Model.getInstance();
                var basketObj = model.getCurrentBasket();
                if (basketObj !== null) {
                    var len = basketObj.products.length;
                    var basketApproxWeight = 0;
                    for (var i = 0; i < len; i++) {
                        var productObj = basketObj.products[i];
                        basketApproxWeight += productObj.approxWeight;
                        appendNewProductToDiv(productObj, i);
                    }
                    // TODO CONST VAR
                    $('#basket-title').text(len + ' product' +
                                            (len > 1 ? 's, ' : ', ') +
                                            basketApproxWeight + 'kg');
                } else {
                    console.error('Error: no current basket available');
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
                setOnDeviceReady: function() {
                    // store all $() objects in CONST VAR (caching) for speed up
                    // TODO
                },

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
                            break;
                        case 'open':
                            onOpenPageBeforeChange();
                            break;
                        case 'import':
                            break;
                        case 'edit':
                            onEditPageBeforeChange();
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
                switchToImportPage: function() {
                    var controller = uAgBasket.Controller.getInstance();
                    try {
                        importFileExplorer.run($('#import-file-explorer-div'), // TODO CONST VAR
                                               controller.onFileExplorerCheck);
                    } catch (e) {
                        console.error(e.message);
                    }
                },

                /**
                 * @description TODO
                 */
                switchToEditPage: function() {
                    $.mobile.changePage($('#edit'), {transition:'fade'}); // TODO CONST VAR
                },

                /**
                 * @description Add a basket product entry on the edit page.
                 * @param {object} basketObj Basket object considered.
                 */
                addNewProductToEditPage: function(basketObj) {
                    var lastProductNbr = basketObj.products.length - 1;
                    var lastProductObj = basketObj.products[lastProductNbr];
                    appendNewProductToDiv(lastProductObj, lastProductNbr);
                },

                /** @description TODO */
                removeLastProductFromEditPage: function() {
                    var $productsDiv = $('#products-div'); // TODO CONST VAR
                    $productsDiv.children().filter(':last').remove();
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
