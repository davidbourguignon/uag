// JSLint settings:
/*global alert, console, Handlebars, jQuery, Zepto*/

/**
 * @fileOverview uAg Basket Model
 * @author David Bourguignon
 * @version 2012-08-23
 */
var UAG = (function(parent){ // $, window, document, undefined
    var uAgBasket = parent.Basket = parent.Basket || {};

    uAgBasket.Model = (function() {
        return {};
    }());

    return parent;
}(UAG || {})); // (typeof Zepto === 'function') ? Zepto : jQuery, this, this.document
