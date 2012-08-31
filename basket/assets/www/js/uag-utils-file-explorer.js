/** jshint forin:true, noarg:true, noempty:true, eqeqeq:true,
 *  bitwise:true, strict:true, undef:true, unused:true, curly:true,
 *  browser:true, devel:true, jquery:true, es5:true, indent:4, maxerr:50
 */
/**
 * @fileOverview uAg Utils File Explorer
 * @author <a href="http://www.davidbourguignon.net">David Bourguignon</a>
 * @version 2012-08-30
 */
/** @namespace uAg project */
var uag = (function(parent, $, window, document, fileSystem) {
    'use strict'; // enforcing strict JS
    var uAgUtils = parent.utils = parent.utils || {};

    /**
     * @constructor
     * @exports uAgUtils.makeFileExplorer as uag.utils.FileExplorer
     * @description File explorer utility for enhancing controllers
     */
    uAgUtils.makeFileExplorer = function() {
        /**
         * @private
         */
        // view objects
        var gridDiv = null;
        var folderDiv = null;
        var fileDiv = null;
        var backDiv = null;

        // file API objects
        var rootDir = null;
        var currentDir = null;
        var parentDir = null;
        var activeEntry = null;

        // other vars
        var directoryEntries = [];
        var fileEntries = [];
        var fileReadStr = '';

        // callback functions
        function onFileError(fileError) {
            throw new Error('Error: failed with code ' + fileError.code);
        }

        function onRequestFileSystemSuccess(fileSystem) {
            rootDir = fileSystem.root;
            console.info('Info: root directory name is ' + rootDir.name);
            showDirectory(rootDir);
        }

        function onGetParentSuccess(parent) {
            parentDir = parent;
            console.info('Info: parent directory name is ' + parentDir.name);
        }

        function onReadEntriesSuccess(entries) {
            directoryEntries.length = 0; // emptying arrays
            fileEntries.length = 0;
            var i, len; // vars for loops
            for (i = 0, len = entries.length; i < len; i++) {
                var entry = entries[i];
                if (entry.isDirectory && entry.name[0] !== '.') { // removing hidden files
                    directoryEntries.push(entry);
                } else if (entry.isFile && entry.name[0] !== '.') {
                    fileEntries.push(entry);
                }
            }
            var sortedEntries = directoryEntries.concat(fileEntries);
            gridDiv.empty();
            gridDiv.append('<h4> Folder ' + currentDir.name + '</h4>');
            var uiBlockLetters = ['a','b','c'];
            for (i = 0, len = sortedEntries.length; i < len; i++) {
                var blockLetter = uiBlockLetters[i%3]; // length uiBlockLetters = 3
                var sortedEntry = sortedEntries[i];
                if (sortedEntry.isDirectory) {
                    gridDiv.append('<div class="ui-block-' +
                                   blockLetter +
                                   '"><div class="folder"><p>' +
                                   sortedEntry.name +
                                   '</p></div></div>');
                } else if (sortedEntry.isFile) {
                    gridDiv.append('<div class="ui-block-' +
                                   blockLetter +
                                   '"><div class="file"><p>' +
                                   sortedEntry.name +
                                   '</p></div></div>');
                }
            }
            folderDiv = $('.folder');
            fileDiv = $('.file');
            folderDiv.on('click', onFolderDivClick);
            fileDiv.on('click', onFileDivClick);
            if (currentDir !== null && currentDir.name !== rootDir.name) {
                gridDiv.append('<div class="ui-block-a"><div class="folder back"><p>..</p></div></div>');
                backDiv = $('.folder.back');
                backDiv.on('click', onBackDivClick);
            }
        }

        function onGetDirectorySuccess(directoryEntry) {
            activeEntry = directoryEntry;
            showDirectory(activeEntry);
        }

        function onFolderDivClick(event) {
            var name = $(event.target).text();
            if (currentDir !== null) {
                currentDir.getDirectory(name, {create:false},
                                        onGetDirectorySuccess,
                                        onFileError);
            } else {
                throw new Error('Error: current directory does not exist');
            }

        }

        function onGetFileSuccess(fileEntry) {
            activeEntry = fileEntry;
            readFile(activeEntry);
        }

        function onFileDivClick(event) {
            var name = $(event.target).text();
            if (currentDir !== null) {
                currentDir.getFile(name, {create:false},
                                   onGetFileSuccess,
                                   onFileError);
            } else {
                throw new Error('Error: current directory does not exist');
            }
        }

        function onBackDivClick(event) {
            if (parentDir !== null) {
                showDirectory(parentDir);
            }
        }

        function onFileReaderLoadEnd(event) {
            fileReadStr = event.target.result;
            console.info('Info: > file content is');
            console.info(fileReadStr);
            // callback
        }

        function onFileSuccess(file) {
            console.info('Info: file details');
            console.info('Info: > file name is ' + file.name);
            console.info('Info: > file type is ' + file.type);
            console.info('Info: > file date is ' + new Date(file.lastModifiedDate));
            console.info('Info: > file size is ' + file.size + ' bytes');
            var reader = new FileReader();
            reader.onloadend = onFileReaderLoadEnd;
            reader.readAsText(file);
        }

        // other functions
        function showDirectory(directoryEntry) {
            if (directoryEntry.isDirectory) {
                currentDir = directoryEntry;
                console.info('Info: current directory name is ' + currentDir.name);
                directoryEntry.getParent(onGetParentSuccess, onFileError);
            } else {
                throw new TypeError('Error: expecting directory object');
            }
            var directoryReader = directoryEntry.createReader();
            directoryReader.readEntries(onReadEntriesSuccess,
                                        onFileError);
        }

        function readFile(fileEntry){
            if (fileEntry.isFile) {
                fileEntry.file(onFileSuccess, onFileError);
            } else {
                throw new TypeError('Error: expecting file object');
            }
        }

        /**
         * @public
         * @lends uag.utils.FileExplorer
         */
        return {
            setView: function($gridDiv) {
                if ($gridDiv instanceof jQuery &&
                    $gridDiv.is('div[class="ui-grid-b"]')) {
                    gridDiv = $gridDiv;
                } else {
                    throw new TypeError('Error: expecting explorer view objects');
                }
            },
            explore: function() {
                // how to make sure this is called after onDeviceReady has fired?
                // TODO
                if (gridDiv !== null) {
                    if (rootDir !== null) {
                        if (currentDir.name !== rootDir.name) {
                            showDirectory(currentDir);
                        } else {
                            showDirectory(rootDir);
                        }
                    } else {
                        window.requestFileSystem(fileSystem.PERSISTENT, 0,
                                                 onRequestFileSystemSuccess,
                                                 onFileError);
                    }
                } else {
                    throw new Error('Error: explorer view objects are not set');
                }
            },
        };
    };

    return parent;
}(uag || {}, jQuery, this, this.document, LocalFileSystem));
