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
var uag = (function(parent, $, window, document) { // LocalFileSystem ?
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
        var directoryEntries = [];
        var fileEntries = [];
        var activeEntry = null;
        var lastFileRead = null;

        // callback functions
        function onFileError(fileError) {
            throw new Error('Error: failed with code ' + fileError.code);
        }

        function onRequestFileSystemSuccess(fileSystem) {
            rootDir = fileSystem.root;
            console.log('ROOT DIR');//TMP
            console.log(rootDir.name);
            showDirectory(rootDir);
        }

        function onGetParentSuccess(parent) {
            parentDir = parent;
            console.log('PARENT AND ROOT DIR');//TMP
            console.log(parentDir.name);
            console.log(rootDir.name);
        }

        function onReadEntriesSuccess(entries) {
            directoryEntries.length = 0; // empty arrays
            fileEntries.length = 0;
            var i, len; // for loops
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
                gridDiv.append('<div class="ui-block-a"><div id="back-div" class="folder">' +
                               '<p style="font-weight:bolder;border:1px solid black;">..</p>' +
                               '</div></div>');
                backDiv = $('#back-div');
                backDiv.on('click', onBackDivClick);
            }
        }

        function onGetDirectorySuccess(directoryEntry) {
            activeEntry = directoryEntry;
            console.log('ACTIVE ENTRY NAME '+activeEntry.name);//TMP
            showDirectory(activeEntry);
        }

        function onGetFileSuccess(fileEntry) {
            activeEntry = fileEntry;
            console.log('ACTIVE ENTRY FILE '+activeEntry.isFile);//TMP
            console.log('ACTIVE ENTRY NAME '+activeEntry.name);//TMP
            readFile(activeEntry);
        }

        function onFileSuccess(file) {
            lastFileRead = file;
            console.log('LAST FILE READ DETAILS');//TMP
            console.log('file name '+file.name);//TMP
            console.log('file type '+file.type);//TMP
            console.log('file date '+new Date(file.lastModifiedDate));//TMP
            console.log('file size '+file.size);//TMP
            var reader = new FileReader();
            reader.onloadend = function(event) {
                console.log("Read as text");//TMP
                console.log(event.target.result); // show data from file into console
            };
            reader.readAsText(file);
        }

        function onFolderDivClick(event) {
            console.log('CLICK FOLDERDIV');//TMP
            var name = $(event.target).text();
            console.log('NAME '+name);//TMP
            if (currentDir !== null) {
                currentDir.getDirectory(name, {create:false},
                                        onGetDirectorySuccess,
                                        onFileError);
            } else {
                throw new Error('Error: current directory does not exist');
            }

        }

        function onFileDivClick(event) {
            console.log('CLICK FILEDIV');//TMP
            var name = $(event.target).text();
            console.log('NAME '+name);//TMP
            if (currentDir !== null) {
                currentDir.getFile(name, {create:false},
                                   onGetFileSuccess,
                                   onFileError);
            } else {
                throw new Error('Error: current directory does not exist');
            }
        }

        function onBackDivClick(event) {
            console.log('CLICK BACKBTN');//TMP
            if (parentDir !== null) {
                showDirectory(parentDir);
            }
        }

        // other functions
        function showDirectory(directoryEntry) {
            if (directoryEntry.isDirectory) {
                currentDir = directoryEntry;
                console.log('CURRENT AND ROOT DIR');//TMP
                console.log(currentDir.name);//TMP
                console.log(rootDir.name);//TMP
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
                    throw new TypeError('Error: FileExplorer.setView() expecting view info');
                }
            },
            start: function() {
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
                        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0,
                                                 onRequestFileSystemSuccess,
                                                 onFileError);
                    }
                } else {
                    throw new Error('Error: explorer view is not set');
                }
            },
        };
    };

    return parent;
}(uag || {}, jQuery, this, this.document)); // this.LocalFileSystem ?
