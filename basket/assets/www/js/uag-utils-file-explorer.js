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
     * @exports uAgUtils.makeFileExplorer as uag.utils.FileExplorer
     * @description File explorer utility for enhancing controllers
     */
    uAgUtils.makeFileExplorer = function () {
        /**
         * @private
         */
        // view objects
        var gridDiv = null;
        var folderDiv = null;
        var fileDiv = null;
        var rootBtn = null;
        var backBtn = null;

        // file API objects
        var rootDir = null;
        var currentDir = null;
        var parentDir = null;
        var directoryEntries = [];
        var fileEntries = [];
        var activeEntry = null;

        // callback functions
        function onFailureEvent (event) {
            throw new Error('Error: failed with code ' + event.target.error.code);
        }

        function onFileError (fileError) {
            throw new Error('Error: failed with code ' + fileError.code);
        }

        function onRequestFileSystemSuccess (fileSystem) {
            rootDir = fileSystem.root;
            showDirectory(rootDir);
        }

        function onGetParentSuccess (parent) {
            parentDir = parent;
            console.log('PARENT DIR');//TMP
            console.log(parentDir.name);
            if ((parentDir.name === 'sdcard' && currentDir.name !== 'sdcard')
                    || parentDir.name !== 'sdcard') {
                //backBtn.show(); // because of jQuery Mobile bug
                console.log('SHOW BACKBTN');//TMP
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
            gridDiv.empty();
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
            folderDiv = $('.folder');
            fileDiv = $('.file');
            folderDiv.on('click', onFolderDivClick);
            fileDiv.on('click', onFileDivClick);
        }

        function onFolderDivClick () {
            console.log('CLICK FOLDERDIV');//TMP
            var name = $(this).text();
            console.log('NAME '+name);
            if (currentDir !== null) {
                currentDir.getDirectory(name, {create:false},
                                        onGetDirectorySuccess,
                                        onFileError);
            } else {
                throw new Error('Error: current directory does not exist');
            }

        }

        function onFileDivClick () {
            console.log('CLICK FILEDIV');//TMP
            var name = $(this).text();
            console.log('NAME '+name);
            if (currentDir !== null) {
                currentDir.getFile(name, {create:false},
                                   onGetFileSuccess,
                                   onFileError);
            } else {
                throw new Error('Error: current directory does not exist');
            }
        }

        function onGetDirectorySuccess (directory) {
            activeEntry = directory;
            console.log('ACTIVE ENTRY DIR '+activeEntry.isDirectory);//TMP
            console.log('ACTIVE ENTRY NAME '+activeEntry.name);//TMP
            showDirectory(activeEntry);
        }

        function onGetFileSuccess (file) {
            activeEntry = file;
            //readFile();
        }

        // other functions
        function showDirectory (directory) {
            if (directory.isDirectory) {
                currentDir = directory;
                console.log('CURRENT DIR');//TMP
                console.log(currentDir.name);
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
         * @lends uag.utils.FileExplorer
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
            start: function () {
                // how to make sure this is called after onDeviceReady has fired?
                // how to start again from the previous currentDir?
                // TODO
                //if (currentDir === rootDir) {
                    //backBtn.hide(); // because of jQuery Mobile bug
                    console.log('HIDE BACKBTN');//TMP
                    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                                             onRequestFileSystemSuccess,
                                             onFailureEvent);
                    rootBtn.on('click', function () {
                        console.log('CLICK ROOTBTN');//TMP
                        if (rootDir !== null) {
                            showDirectory(rootDir);
                        }
                    });
                    backBtn.on('click', function () {
                        console.log('CLICK BACKBTN');//TMP
                        if (parentDir !== null) {
                            showDirectory(parentDir);
                        }
                    });
                //} else {

                //}
            },
        }
    };

    return parent;
}(uag || {}, jQuery, this, this.document));
