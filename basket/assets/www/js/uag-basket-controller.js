/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket Controller
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-09-03
 */
/** @namespace uAg project */
var uag = (function(parent, $, window, document, undefined) {
    'use strict';
    // namespace declaration
    var uAgBasket = parent.basket = parent.basket || {};

    /**
     * @class
     * @exports uAgBasket.Controller as uag.basket.Controller
     * @description Controller of the Basket app (singleton pattern)
     */
    uAgBasket.Controller = (function() {
        var instance = null;

        /** @ignore */
        function init() {
            /**
             * @description Taken from <a href="from http://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date">MDN JavaScript documentation</a>.
             * @ignore
             */
            function ISODateString(d) {
                function pad(n) {
                    return (n < 10 ? '0' + n : n);
                }
                return d.getUTCFullYear() + '-' +
                    pad(d.getUTCMonth()+1) + '-' +
                    pad(d.getUTCDate()) + 'T' +
                    pad(d.getUTCHours()) + ':' +
                    pad(d.getUTCMinutes()) + ':' +
                    pad(d.getUTCSeconds()) + 'Z';
            }

            /**
             * @public
             * @lends uag.basket.Controller
             */
            return {
                /** @description TODO */
                onNewBasketClick: function(event) {
                    var view = uAgBasket.View.getInstance();
                    view.resetEditPage();
                    var model =  uAgBasket.Model.getInstance();
                    if (Date.toISOString !== undefined) {
                        model.setCurrentBasket(Date.toISOString()); // current date in ISO 8601 format
                    } else {
                        console.warn('Warning: Date.toISOString is undefined');
                        var d = new Date();
                        console.log('ISODateString(d) ' + ISODateString(d));//TMP
                        model.setCurrentBasket(ISODateString(d));
                        //STOPPED HERE
                    }
                    view.changeToEditPage();
                },

                /** @description TODO */
                /*onOpenBasketClick: function(event) {
                    //apres selection
                    var view = uAgBasket.View.getInstance();
                    view.changeToOpenPage();
                },*/

                /** @description TODO */
                onImportBasketClick: function(event) {
                    var view = uAgBasket.View.getInstance();
                    view.changeToImportPage();
                },

                /** @description TODO */
                onSaveBasketClick: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var isBasketStored = model.storeCurrentBasket();
                    if (isBasketStored) {
                        console.info('Info: basket stored');
                    } else {
                        console.error('Error: basket not stored');
                    }
                },

                /** @description TODO */
                onCaptureTagClick: function(event) {
                },

                /** @description TODO */
                onAddBasketItemClick: function(event) {
                },

                /**
                 * @description TODO
                 */
                onBasketExplorerClick: function(event) {
                    var model = uAgBasket.Model.getInstance();
                    var isBasketSet = model.setCurrentBasket($(event.target).text());
                    if (isBasketSet) {
                        var view = uAgBasket.View.getInstance();
                        view.changeToEditPage();
                    } else  {
                        console.error('Error: current basket not set');
                    }
                },

                /**
                 * @description TODO
                 * @returns {boolean} Success.
                 */
                onFileExplorerCheck: function(fileStr) {
                    var model = uAgBasket.Model.getInstance();
                    var isBasketSet = model.setCurrentBasketStr(fileStr);
                    if (isBasketSet) {
                        var view = uAgBasket.View.getInstance();
                        view.changeToEditPage();
                        return true;
                    } else  {
                        return false;
                    }
                },
            }; // return
        }; // private function init()

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
        }; // return
    }()); // immediately-invoked function expression (IIFE)

    return parent;
}(uag || {}, jQuery, this, this.document));
