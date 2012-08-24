/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket Controller
 * @author David Bourguignon
 * @version 2012-08-23
 */
var UAG = (function (parent, $, window, document) {
    'use strict';
    var uAgBasket = parent.basket = parent.basket || {},
        uAgDebugOn = parent.debugOn = parent.debugOn || true; // debug flag

    uAgBasket.controller = (function () {
        var isReadyCordova = false,
            isReadyJQueryMobile = false;
        return {
            /* callbacks */
            onLoad: function (event) {
                document.addEventListener('deviceready', this.onDeviceReady, false);
                if (uAgDebugOn) {
                    alert('deviceready event registered');
                }
            },
            onDeviceReady: function (event) {
                isReadyCordova = true;
                document.addEventListener('pause', this.onPause, false);
                if (uAgDebugOn) {
                    alert('pause event registered');
                }
            },
            onPause: function (event) {
                // TODO
            },
            pageInit: function (event) {
                isReadyJQueryMobile = true;
            },
            /* other functions */
            init: function () {
                $(document).bind('pageinit', this.pageInit);
                if (uAgDebugOn) {
                    alert('pageinit event registered');
                }
            },
            isReady: function () {
                return (isReadyCordova && isReadyJQueryMobile);
            },
            /* TMP */
            checkState: function () {
                if (this.isReady()) {
                    if (uAgDebugOn) {
                        alert('controller ready');
                    }
                } else {
                    if (uAgDebugOn) {
                        alert('controller NOT ready');
                    }
                }
            }
        };
    }());

    return parent;
}(UAG || {}, jQuery, this, this.document));
