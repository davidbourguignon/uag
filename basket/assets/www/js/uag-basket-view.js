/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket View
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-09-10
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
                var $openTitle = $('#open-basket-explorer-title'); // TODO CONST VAR
                var $basketList = $('#open-basket-explorer-listview'); // TODO CONST VAR
                var datesNbr = dates.length;
                if (datesNbr === 0) {
                    $openTitle.text('No baskets in store!');
                } else {
                    for (var i = 0; i < datesNbr; i++) {
                        var date = dates[i];
                        $basketList.append('<li><a id="' +
                                           date.toISOString() +
                                           '" href="#edit">' +
                                           date.toLocaleDateString() +
                                           '</a></li>');
                    }
                    $basketList.listview('refresh');
                    var controller = uAgBasket.Controller.getInstance();
                    $basketList.find('a').on('click', controller.onBasketListClick);
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
                $('#edit-basket-title').empty(); // TODO CONST VAR
                $('#edit-basket-listview').empty(); // TODO CONST VAR
            }

            /** @ignore */
            function onEditPageChange() {
                var model = uAgBasket.Model.getInstance();
                var basketObj = model.getCurrentBasket();
                if (basketObj !== null) {
                    var $editTitle = $('#edit-basket-title'); // TODO CONST VAR
                    var $productList = $('#edit-basket-listview'); // TODO CONST VAR
                    var productsLen = basketObj.products.length;
                    if (productsLen === 0) {
                        $editTitle.text('No products in basket!');
                    } else {
                        var basketWeight = 0;
                        for (var i = 0; i < productsLen; i++) {
                            var productObj = basketObj.products[i];
                            var isIn = productObj.isIn;
                            var name = productObj.name;
                            var weight = productObj.weight;
                            var id = uAgBasket.Product.PREFIX_STR + i;
                            $productList.append('<li' +
                                                (isIn ? ' data-theme="b"' : '') +
                                                '><a id="' + id +
                                                '" href="#product">' +
                                                name + ', ' + weight +
                                                'kg</a></li>');
                            basketWeight += weight;
                        }
                        $editTitle.text(productsLen + ' product' +
                                        (productsLen > 1 ? 's, ' : ', ') +
                                        basketWeight + 'kg');
                        $productList.listview('refresh');
                        var controller = uAgBasket.Controller.getInstance();
                        $productList.find('a').on('click', controller.onProductListClick);
                    }
                } else {
                    console.error('Error: no current basket available');
                }
            }

            /** @ignore */
            function onProductPageInit(event) {
                var controller = uAgBasket.Controller.getInstance();
                $('#product-isIn').on('change', controller.onProductIsInChange); // TODO CONST VAR
                $('#product-name').on('change', controller.onProductNameChange); // TODO CONST VAR
                $('#product-producerName').on('change', controller.onProductProducerNameChange); // TODO CONST VAR
                $('#product-weight').on('change', controller.onProductWeightChange); // TODO CONST VAR
                $('#product-tag-btn').on('click', controller.onScanOpenTagClick);
                $('#product-photos-btn').on('click', controller.onTakePhotosClick);
                $('#product-remove-btn').on('click', controller.onRemoveCurrentProductClick);
            }

            /** @ignore */
            function onProductPageBeforeChange() {
                // reset values
                $('#product-isIn').val('false');
                $('#product-name').val('');
                $('#product-producerName').val('');
                $('#product-weight').val(0);
                $('#product-tag-btn').text(''); // TODO CONST VAR
            }

            /** @ignore */
            function onProductPageChange() {
                var model = uAgBasket.Model.getInstance();
                var productObj = model.getCurrentProduct();
                if (productObj !== null) {
                    // change fields
                    $('#product-isIn').val(productObj.isIn.toString());
                    $('#product-name').val(productObj.name);
                    $('#product-producerName').val(productObj.producerName);
                    $('#product-weight').val(productObj.weight);
                    // refresh widgets
                    $('#product-isIn').slider('refresh');
                    $('#product-weight').slider('refresh');
                    // change buttons
                    if (productObj.tag.text === '') {
                        $('#product-tag-btn').text('Scan tag');
                    } else {
                        $('#product-tag-btn').text('Open tag');
                    }
                } else {
                    console.error('Error: no current product available');
                }
            }

            /** @ignore */
            function onTagPageBeforeChange() {
                $('#tag-div').empty(); // TODO CONST VAR
            }

            /** @ignore */
            function onTagPageChange() {
                var model = uAgBasket.Model.getInstance();
                var productObj = model.getCurrentProduct();
                if (productObj !== null && productObj.tag.text !== '') {
                    var $tagDiv = $('#tag-div');
                    var text = productObj.tag.text;
                    if ($.mobile.path.isAbsoluteUrl(text)) {
                        // display URL
                        $tagDiv.append('<h3>URL</h3>');
                        $tagDiv.append('<p><a href="' + text +
                                       '" data-rel="external">' + text +
                                       '</a></p>');
                    } else if (uAgUtils.isRFC822ValidEmail(text)) {
                        //display email address
                        // TODO TEST
                        $tagDiv.append('<h3>Email address</h3>');
                        $tagDiv.append('<p><a href="mailto:' + text +
                                       '?Subject=Your%20product%20barcode">' +
                                       text + '</a></p>');
                    } else if (uAgUtils.isValidPhoneNumber(text)) {
                        //display email
                        // TODO TEST
                        $tagDiv.append('<h3>Phone number</h3>');
                        $tagDiv.append('<p><a href="tel:' + text +
                                       '">' + text + '</a></p>');
                        /**
                         * See http://tools.ietf.org/html/rfc5341 about the 'tel' Uniform Resource Identifier.
                         * On desktop computers the non-standard <a href="callto: is used by Skype only.
                         */
                    } else {
                        // display plain text
                        // TODO TEST
                        $tagDiv.append('<h3>Text</h3>');
                        $tagDiv.append('<p>' + text + '</p>');
                    }
                } else {
                    console.error('Error: no tag info available');
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
                 * @description Set view singleton ready.
                 */
                setOnDeviceReady: function() {
                    // store all $() objects in CONST VAR (caching) for speed up
                    // TODO
                },

                /**
                 * @description Global callback function for JQuery Mobile onpageinit events. Sub-callbacks are in general available per page.
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
                        case 'product':
                            onProductPageInit();
                            break;
                        case 'tag':
                            break;
                        default:
                            console.error('Error: unknown page id');
                    }
                },

                /**
                 * @description Global callback function for JQuery Mobile onpagebeforechange events. Sub-callbacks are in general available per page.
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
                        case 'product':
                            onProductPageBeforeChange();
                            break;
                        case 'tag':
                            onTagPageBeforeChange();
                            break;
                        default:
                            console.error('Error: unknown page id');
                    }
                },

                /**
                 * @description Global callback function for JQuery Mobile onpagechange events. Sub-callbacks are in general available per page.
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
                        case 'product':
                            onProductPageChange();
                            break;
                        case 'tag':
                            onTagPageChange();
                            break;
                        default:
                            console.error('Error: unknown page id');
                    }
                },

                /**
                 * @description Global callback function for JQuery Mobile onpagechangefailed events. For sanity check only.
                 */
                onPageChangeFailed: function(event, data) {
                    console.error('Error: pagechangefailed event fired for '  + pageDataToId(data.toPage));
                },

                /**
                 * @description Switch current page to "#import" page (see View HTML).
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
                 * @description Switch current page to "#edit" page (see View HTML).
                 */
                switchToEditPage: function() {
                    // check transition quality. try fade, pop, etc. if necessary
                    // TODO
                    $.mobile.changePage($('#edit'), {transition:'none'}); // TODO CONST VAR
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
