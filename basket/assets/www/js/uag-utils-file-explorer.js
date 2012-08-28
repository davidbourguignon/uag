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
    'use strict'; // enforcing strict JS
    var uAgUtils = parent.utils = parent.utils || {};

    /**
     * @constructor
     * @exports uAgUtils.FileExplorer as uag.utils.FileExplorer
     * @description File explorer utility for enhancing controllers
     */
    uAgUtils.FileExplorer = function () {
        this.gridDiv = null;
        this.rootBtn = null;
        this.backBtn = null;
        this.rootDir = null;//useless (same for the other dirs?)
        this.currentDir = null;
        this.parentDir = null;
    }

    // a virer car il est possible d'atteindre directement les objets publics ?
    uAgUtils.FileExplorer.prototype.setView = function ($gridDiv, $rootBtn, $backBtn) {
        if ($gridDiv instanceof jQuery
                && $gridDiv.is('div[class="ui-grid-c"]')
            && $rootBtn instanceof jQuery
                && ($rootBtn.is('button') || $rootBtn.is('a[data-role="button"]'))
            && $backBtn instanceof jQuery
                && ($backBtn.is('button') || $backBtn.is('a[data-role="button"]'))) {
            this.gridDiv = $gridDiv;
            this.rootBtn = $rootBtn;
            this.backBtn = $backBtn;
        } else {
            throw new TypeError('Error: FileExplorer.setView() expecting view info');
        }
    }

    uAgUtils.FileExplorer.prototype.init = function () {
        // how to make sure this is called after onDeviceReady has fired?
        // TODO
        var fileSystemRoot = null;
        window.requestFileSystem (
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
        //this.rootDir = fileSystemRoot;
        console.log(fileSystemRoot.name);
        //console.log(this.rootDir.name);
        /*if (this.backBtn instanceof jQuery
                && (this.backBtn.is('button') || this.backBtn.is('a[data-role="button"]'))) {
            this.backBtn.hide();
        } else {
            throw new TypeError('Error: FileExplorer.init() expecting backBtn info');
        }*/
        //this.show(this.rootDir);
    }

    uAgUtils.FileExplorer.prototype.show = function (directory) {
        /** setting explorer directories */
        if (directory.isDirectory) {
            this.currentDir = directory;
            directory.getParent (
                function (parent) { // success
                    this.parentDir = parent;
                    if ((this.parentDir.name == 'sdcard' && this.currentDir.name != 'sdcard')
                            || this.parentDir.name != 'sdcard') {
                        this.backBtn.show(); // view selection
                    }
                },
                function (fileError) { // failure
                    throw new Error('Error: getParent() failed with code '
                                      + fileError.code);
                }
            );
        } else {
            throw new TypeError('Error: FileExplorer.show() expecting directory object');
        }

        /** reading directory */
        var directoryReader = directory.createReader();
        var directories = [];
        var files = [];
        directoryReader.readEntries (
            function (entries) { // success
                for (var i = 0, len = entries.length; i < len; i++) {
                    var entry = entries[i];
                    if (entry.isDirectory && entry.name[0] != '.') {
                        directories.push(entry);
                    } else if (entry.isFile && entry.name[0] != '.') {
                        files.push(entry);
                    } else {
                        throw new TypeError('Error: readEntries() expecting directory or file objects');
                    }
                }
            },
            function (fileError) { // failure
                throw new Error('Error: readEntries() failed with code '
                                  + fileError.code);
            }
        );

        /** showing directory content */
        var content = directories.concat(files);
        if (this.gridDiv instanceof jQuery
                && this.gridDiv.is('div[class="ui-grid-c"]')) {
            this.gridDiv.empty();
            var uiBlockLetters = ['a','b','c','d'];
            for (var i = 0, len = content.length; i < len; i++) {
                var blockLetter = uiBlockLetters[i%4]; // length uiBlockLetters
                var contentItem = content[i];
                if (contentItem.isDirectory) {
                    this.gridDiv.append('<div class="ui-block-'
                                         + blockLetter
                                         + '"><div class="folder"><p>'
                                         + contenItem.name
                                         + '</p></div></div>');
                } else if (contentItem.isFile) {
                    this.gridDiv.append('<div class="ui-block-'
                                         + blockLetter
                                         + '"><div class="file"><p>'
                                         + contentItem.name
                                         + '</p></div></div>');
                }
            }
        } else {
            throw new TypeError('Error: FileExplorer.show() expecting gridDiv info');
        }
    }

    return parent;
}(uag || {}, jQuery, this, this.document));
