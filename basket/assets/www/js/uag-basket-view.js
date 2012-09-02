/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Basket View
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-09-01
 */
/** @namespace uAg project */
var uag = (function(parent, $, window, document, undefined) {
    'use strict';
    // namespace declaration
    var uAgBasket = parent.basket = parent.basket || {};

    var ctrler = uAgBasket.Controller.getInstance();

    // jQuery Mobile bindings
    $(document).on('mobileinit', ctrler.onMobileInit);
    $(document).on('pageinit', ctrler.onPageInit);

    // Cordova bindings
    $(document).on('deviceready', ctrler.onDeviceReady);
    $(document).on('pause', ctrler.onPause);
    $(document).on("resume", ctrler.onResume);

    // other bindings, when DOM is ready
    $(document).ready(function() {
        $('#home-new-btn').on('click', ctrler.newBasket);
        $('#home-open-btn').on('click', ctrler.openBasket);
        $('#home-import-btn').on('click', ctrler.importBasket);
        $('#new-save-btn').on('click', ctrler.saveBasket);
        $('#new-tag-btn').on('click', ctrler.captureTag);
        $('#new-add-btn').on('click', ctrler.addBasketItem);
        // managing open save/tag btn differently from new?
        // TODO
        ctrler.setInfoView($('#device-platform'),
                           $('#device-version'),
                           $('#device-uuid'));
        ctrler.setFileExplorerView($('#import'),
                                   $('#import-file-explorer-div'));
        // managing two file explorers, one for open, one for import?
        // normally, no! since we are using local storage, not files for storing our baskets long-term
        // TODO
    });

    return parent;
}(uag || {}, jQuery, this, this.document));
