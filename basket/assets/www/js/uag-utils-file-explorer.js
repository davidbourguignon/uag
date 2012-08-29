/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Utils File Explorer
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-08-29
 */
/** @namespace uAg project */
var uag = (function (parent, $, window, document) {
    'use strict'; // enforcing strict JS
    var uAgUtils = parent.utils = parent.utils || {};
    /**
     * @constructor
     * @exports uAgUtils.makeFileExplorer as uag.utils.makeFileExplorer
     * @description File explorer utility for enhancing controllers
     */
    uAgUtils.makeFileExplorer = function () {
        /**
         * @private
         */
        var gridDiv = null;
        var rootBtn = null;
        var backBtn = null;
        var rootDir = null;
        var currentDir = null;
        var parentDir = null;
        var directoryEntries = [];
        var fileEntries = [];

        function onFailureEvent (event) {
            throw new Error('Error: failed with code ' + event.target.error.code);
        }
        function onFileError (fileError) {
            throw new Error('Error: failed with code ' + fileError.code);
        }
        function onRequestFileSystemSuccess (fileSystem) {
            rootDir = fileSystem.root;
            showSortedEntries(rootDir);
        }
        function onGetParentSuccess (parent) {
            parentDir = parent;
            if ((parentDir.name == 'sdcard' && currentDir.name != 'sdcard')
                    || parentDir.name != 'sdcard') {
                backBtn.show(); // view selection
                console.log('SHOW BACK BUTTON');//TMP
            }
        }
        function onReadEntriesSuccess (entries) {
            directoryEntries.length = 0;
            fileEntries.length = 0;
            for (var i = 0, len = entries.length; i < len; i++) {
                var entry = entries[i];
                if (entry.isDirectory && entry.name[0] != '.') { // removing hidden files
                    directoryEntries.push(entry);
                } else if (entry.isFile && entry.name[0] != '.') {
                    fileEntries.push(entry);
                }
            }
            var sortedEntries = directoryEntries.concat(fileEntries);
            gridDiv.empty(); // view selection
            var uiBlockLetters = ['a','b','c','d'];
            for (var i = 0, len = sortedEntries.length; i < len; i++) {
                var blockLetter = uiBlockLetters[i%4]; // length uiBlockLetters = 4
                var sortedEntry = sortedEntries[i];
                if (sortedEntry.isDirectory) {
                    gridDiv.append('<div class="ui-block-'
                                   + blockLetter
                                   + '"><div class="folder"><p>'
                                   + sortedEntry.name
                                   + '</p></div></div>');
                } else if (sortedEntry.isFile) {
                    gridDiv.append('<div class="ui-block-'
                                   + blockLetter
                                   + '"><div class="file"><p>'
                                   + sortedEntry.name
                                   + '</p></div></div>');
                }
            }
        }
        function showSortedEntries (directory) {
            if (directory.isDirectory) {
                currentDir = directory;
                directory.getParent(onGetParentSuccess, onFileError);
            } else {
                throw new TypeError('Error: FileExplorer.show() expecting directory object');
            }
            var directoryReader = directory.createReader();
            directoryReader.readEntries(onReadEntriesSuccess,
                                        onFileError);
        }
        /**
         * @public
         * @lends uag.utils.makeFileExplorer
         */
        return {
            setView: function ($gridDiv, $rootBtn, $backBtn) {
                if ($gridDiv instanceof jQuery
                        && $gridDiv.is('div[class="ui-grid-c"]')
                    && $rootBtn instanceof jQuery
                        && ($rootBtn.is('button') || $rootBtn.is('a[data-role="button"]'))
                    && $backBtn instanceof jQuery
                        && ($backBtn.is('button') || $backBtn.is('a[data-role="button"]'))) {
                    gridDiv = $gridDiv;
                    rootBtn = $rootBtn;
                    backBtn = $backBtn;
                } else {
                    throw new TypeError('Error: FileExplorer.setView() expecting view info');
                }
            },
            init: function () {
                // how to make sure this is called after onDeviceReady has fired?
                // TODO
                backBtn.hide(); // view selection
                window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                                         onRequestFileSystemSuccess,
                                         onFailureEvent);
            },
            show: showSortedEntries,
        }
    };
    return parent;
}(uag || {}, jQuery, this, this.document));
