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
    'use strict'; // strict JS

    var uAgBasket = parent.basket = parent.basket || {};
    /**
     * @class
     * @exports uAgBasket.controller as uag.basket.controller
     * @description Controller of the Basket app
     */
    uAgBasket.controller = (function () {
        var isReadyCordova = false;
        var isReadyJQueryMobile = false;
        var fileExplorer = null;
        try {
            fileExplorer = new FileExplorer($('#open-back-btn'));
        } catch (e) {
            console.error(e.message);
        }

        /** @lends uag.basket.controller */
        return {
            onLoad: function (event) {
                document.addEventListener('deviceready', this.onDeviceReady, false);
                console.info('Info: deviceready event registered');
            },
            onDeviceReady: function (event) {
                isReadyCordova = true;
                document.addEventListener('pause', this.onPause, false);
                console.info('Info: pause event registered');
                try {
                    fileExplorer.initAfterCordova();
                } catch (e) {
                    console.error(e.message);
                }
            },
            onPause: function (event) {
                // TODO
            },
            pageInit: function (event) {
                isReadyJQueryMobile = true;
            },
            init: function () {
                $(document).bind('pageinit', this.pageInit);
                console.info('Info: pageinit event registered');
            },
            isReady: function () {
                return (isReadyCordova && isReadyJQueryMobile);
            },
            checkState: function () {
                // TMP
                if (this.isReady()) {
                    console.log('Debug: uag.basket.controller ready');
                } else {
                    console.log('Debug: uag.basket.controller NOT ready');
                }
            }
        };
    }());
    Object.freeze(uAgBasket.controller); // final

    return parent;
}(uag || {}, jQuery, this, this.document, uag.utils.FileExplorer));
