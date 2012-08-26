/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Utils File Explorer
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-08-26
 */
/** @namespace uAg project */
var uag = (function (parent, $, window, document) {
    'use strict';
    var uAgUtils = parent.utils = parent.utils || {};

    /**
     * @constructor
     * @exports uAgUtils.FileExplorer as uag.utils.fileExplorer
     * @description File explorer utility for enhancing controllers
     */
    uAgUtils.FileExplorer = function (viewBackBtn) {
        var view = {}; // jQuery objects
        var fileSystemRoot = null;
        var currentDir = null;
        var parentDir = null;

        if (viewBackBtn instanceof jQuery) {
            view.backBtn = viewBackBtn;
        } else {
            throw new TypeError('Error: wrong arguments for fileExplorer()');
        }

        this.initAfterCordova = function () {
            window.requestFileSystem(
                LocalFileSystem.PERSISTENT,
                0,
                function (fileSystem) { // success
                    fileSystemRoot = fileSystem.root;
                },
                function (event) { // failure
                    throw new Error('Error: requestFileSystem() failed with code '
                                      + event.target.error.code);
                }
            );
            view.backBtn.hide(); // view selection
        }
    }

    return parent;
}(uag || {}, jQuery, this, this.document));
