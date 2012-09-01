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
    'use strict'; // enforcing strict JS
    var uAgBasket = parent.basket = parent.basket || {}; // namespace

    var controller = uAgBasket.Controller.getInstance();

    // jQuery Mobile bindings
    $(document).on('mobileinit', controller.onMobileInit);
    $(document).on('pageinit', controller.onPageInit);

    // Cordova bindings
    $(document).on('deviceready', controller.onDeviceReady);
    $(document).on('pause', controller.onPause);
    $(document).on("resume", controller.onResume);

    // other bindings, when DOM is ready
    $(document).ready(function() {
        $('#home-opt-btn').on('click', controller.options);
        $('#home-opt-btn').on('click', controller.info);
        $('#home-new-btn').on('click', controller.newBasket);
        $('#home-open-btn').on('click', controller.openBasket);
        $('#new-save-btn').on('click', controller.saveBasket);
        $('#new-tag-btn').on('click', controller.captureTag);
        $('#new-add-btn').on('click', controller.addNewBasketItem);
        controller.setAboutView($('#device-platform'),
                                $('#device-version'),
                                $('#device-uuid'));
        controller.setExplorerView($('#open'),
                                   $('#file-explorer-div'));
    });
}(uag || {}, jQuery, this, this.document));
