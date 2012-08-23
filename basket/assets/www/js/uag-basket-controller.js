/*global alert, console, jQuery*/ // JSLint settings
/**
 * @fileOverview uAg Basket Controller
 * @author David Bourguignon
 * @version 2012-08-23
 */
var UAG = (function(parent, $, window, document, undefined) { // playing safe with undefined...
    var uAgBasket = parent.basket = parent.basket || {};

    uAgBasket.controller = (function() {
        var isReadyCordova = false;
        var isReadyJQueryMobile = false;

        return {
            /* callbacks */
            onLoad: function(event) {
                document.addEventListener('deviceready', this.onDeviceReady, false);
                alert('deviceready');
            },
            onDeviceReady: function(event) {
                isReadyCordova = true;
                document.addEventListener('pause', this.onPause, false);
                alert('pause');
            },
            onPause: function(event) {
                // TODO
            },
            pageInit: function(event) {
                isReadyJQueryMobile = true;
            },
            /* other func */
            init: function() {
                $(document).bind('pageinit', this.pageInit);
                alert('pageinit');
            },
            isReady: function() {
                return (isReadyCordova && isReadyJQueryMobile);
            },
            /* TMP */
            checkState: function() {
                if (this.isReady()) {
                    alert("OK CONTROL READY"); // TMP
                } else alert("PROBLEM"); // TMP
            },
        };
    }());

    return parent;
}(UAG || {}, jQuery, this, this.document));
