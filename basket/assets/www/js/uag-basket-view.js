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

    // jQuery Mobile bindings
    $(document).on('mobileinit', uAgBasket.controller.onMobileInit);
    $(document).on('pageinit', uAgBasket.controller.onPageInit);

    // Cordova bindings
    $(document).on('deviceready', uAgBasket.controller.onDeviceReady);
    $(document).on('pause', uAgBasket.controller.onPause);
    $(document).on("resume", uAgBasket.controller.onResume);

    // other bindings, when DOM is ready
    $(document).ready(function() {
        $('#home-opt-btn').on('click', uAgBasket.controller.options);
        $('#home-opt-btn').on('click', uAgBasket.controller.info);
        $('#home-new-btn').on('click', uAgBasket.controller.newBasket);
        $('#home-open-btn').on('click', uAgBasket.controller.openBasket);
        $('#new-save-btn').on('click', uAgBasket.controller.saveBasket);
        $('#new-tag-btn').on('click', uAgBasket.controller.captureTag);
        $('#new-add-btn').on('click', uAgBasket.controller.addNewBasketItem);
        uAgBasket.controller.setAboutView($('#device-platform'),
                                          $('#device-version'),
                                          $('#device-uuid'));
        uAgBasket.controller.setExplorerView($('#open'),
                                             $('#file-explorer-div'));
    });
}(uag || {}, jQuery, this, this.document));
