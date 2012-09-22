/**@fileOverview uag Field app controller declaration
 * @author Sébastien Vivier, NSY209, CNAM  
 * @version Copyright (c) 2012
 * */


uag.field = uag.field || {};


/**
 * @name uag.field.Controller
 * @namespace uag.field.Controller
 */
uag.field.Controller = (function($, dataContext) {
	"use strict";
	
	// containers list page 
	var containersListPageSelector = "containers-list-page";
	//var containersListPageContentSelector = "containers-list-page-content";
	var containersListPageContentListSelector = "containers-list-page-content-list";
	var containersListPageFooterResetSelector = "containers-list-page-footer-reset";
	var containersListPageFooterExportSelector = "containers-list-page-footer-export";
	var containersListPageFooterTextSelector = "containers-list-page-footer-text";
	
	// container page
	var containerPageSelector = "container-page";
	var containerPageSaveSelector = "container-page-save";
	var containerPageDeleteSelector = "container-page-delete";
	var containerPageEncodeSelector = "container-page-encode";
	var containerPageFormIdSelector = "container-page-form-id";
	var containerPageFormWeightSelector = "container-page-form-weight";
	var containerPageFormQualitiesSelector = "container-page-form-qualities";
	var containerPageFormFieldsSelector = "container-page-form-fields";
	var containerPageFormProductsSelector = "container-page-form-products";
	
	// setup page 
	var setupPageSelector = "setup-page";
	var setupPageSaveSelector = "setup-page-save";
	var setupPageImportSelector = "setup-page-import";
	var setupPageResetSelector = "setup-page-reset";
	var setupPageFormNameSelector = "setup-page-form-name";
	var setupPageFormProducerSelector = "setup-page-form-producer";
	
	// events 
	var tapEvent = "click";
	
	// 
	var containerIdUrlKey = "containerId";
	var containerId = null;
	
	/** @description <b>init method</b>, bootstrap controller application  
	 * @name uag.field.Controller.init
	 * @deprecated
	 * @function
	 * @static 
	 */
	var init = function() {
		
		//dataContext.init();
		/*
		$(document).bind("pagebeforechange", onPageBeforeChange);
		$(document).bind("pagechange", onPageChange);
		
		// setup page event 
		$(document).delegate("#" + setupPageResetSelector, tapEvent, onResetTapped);
		$(document).delegate("#" + setupPageImportSelector, tapEvent, onImportProducersTapped);
		$(document).delegate("#" + setupPageSaveSelector, tapEvent, onSaveWorkerTapped);
		
		// container page event 
		$(document).delegate("#" + containerPageSaveSelector, tapEvent, onSaveContainerTapped);
		$(document).delegate("#" + containerPageDeleteSelector, tapEvent, onDeleteContainerTapped);
		$(document).delegate("#" + containerPageEncodeSelector, tapEvent, onEncodeContainerTapped);
		$(document).delegate("#" + containerPageFormFieldsSelector, "change", onFieldChanged);
		
		// containers list page event 
		$(document).delegate("#" + containersListPageFooterResetSelector, tapEvent, onResetContainersTapped);
		$(document).delegate("#" + containersListPageFooterExportSelector, tapEvent, onExportContainersTapped);
		*/
	};
	
	/** @description <b>pageInit method</b>, callback event method linked to jQuery mobile pageinit event
	 * @name uag.field.Controller.pageInit
	 * @private
	 * @function
	 * @param event 
	 * @param data 
	 */
	var pageInit = function(event, data) {
		console.log("fieldController.pageInit()");
		// 
		var pageId = $(event.target).attr('id'); 
		switch(pageId) {
			case "containers-list-page" :
				console.log("init page containers-list-page");
				// attach event to control
				$("#" + containersListPageFooterResetSelector).on(tapEvent, onResetContainersTapped);
				$("#" + containersListPageFooterExportSelector).on(tapEvent, onExportContainersTapped);
				break;
			case "container-page" : 
				console.log("init page container-page");
				// attach event to control
				$("#" + containerPageSaveSelector).on(tapEvent, onSaveContainerTapped);
				$("#" + containerPageDeleteSelector).on(tapEvent, onDeleteContainerTapped);
				$("#" + containerPageEncodeSelector).on(tapEvent, onEncodeContainerTapped);
				$("#" + containerPageFormFieldsSelector).on("change", onFieldChanged);
				break;
			case "setup-page" : 
				console.log("init page setup-page");
				// attach event to control
				$("#" + setupPageResetSelector).on(tapEvent, onResetTapped);
				$("#" + setupPageImportSelector).on(tapEvent, onImportProducersTapped);
				$("#" + setupPageSaveSelector).on(tapEvent, onSaveWorkerTapped);
				break;
			default : 
				console.log("init page default");
				break
		}
	};
	
	/** @description <b>pageBeforeChange method</b>, callback event method linked to jQuery mobile pagebeforechange event
	 * @name uag.field.Controller.pageBeforeChange
	 * @private
	 * @function
	 * @param event 
	 * @param data 
	 */
	var pageBeforeChange = function(event, data) {
		console.log("fieldController.pageBeforeChange()");
		
		// TODO : refexion on this specific code 
		
		// We only want to handle changePage() calls where the caller is asking us to load a page by URL.
		if ( typeof data.toPage === "string" ) {

			//alert(data.toPage);
			
			// We are being asked to load a page by URL, 
			// but we only want to handle URLs that request the data for a specific category. 
			var u = $.mobile.path.parseUrl( data.toPage );
			//var	re = '/^#' + containerPageSelector + '/';
			var	re = /^#container-page/;

			//alert(re);
			//alert(u.hash);
			//alert(u.hash.search(re));
			
			if ( u.hash.search(re) !== -1 ) {

				// We're being asked to display the items for a specific container.
				// Call our internal method that builds the content for the container on the fly based on our in-memory category data structure.
				//showCategory( u, data.options );
				
				containerId = u.hash.replace( /.*containerId=/, "" ); 
				var pageSelector = u.hash.replace( /\?.*$/, "" );

				// alert(containerId + " - " + pageSelector + " - " + u.href);
				
				data.options.dataUrl = pageSelector;
				$.mobile.changePage( $(pageSelector), data.options);
				
				// Make sure to tell changePage() we've handled this call so it doesn't have to do anything.
				event.preventDefault();
			}
		}
	};
	
	/** @description <b>pageChange method</b>, callback event method linked to jQuery mobile onPageChange event   
	 * @name uag.field.Controller.pageChange
	 * @private
	 * @function
	 * @param event 
	 * @param data 
	 */
	var pageChange = function(event, data) {
		console.log("fieldController.pageChange()");
		
		var toPageId = data.toPage.attr("id");
		//alert(toPageId);
		switch(toPageId) {
		
			case containersListPageSelector : 
				//alert("containers list");
				renderContainersListPage();
				// reset container page input hidden (id) value  
				$("#" + containerPageFormIdSelector).val("");
				break;
				
			case containerPageSelector : 
				//alert("container");
				renderContainerPage();
				break;
				
			case setupPageSelector : 
				//alert("setup");
				renderSetupPage();
				break;
				
			default:
				break;
		}
	};
		
	/** @description <b>renderContainersListPage method</b>, rendering containers list page    
	 * @name uag.field.Controller.renderContainersListPage
	 * @private
	 * @function
	 */
	var renderContainersListPage = function() {
		console.log("fieldController.renderContainersListPage()");
		// render 
		renderContainersListPageContent();
		renderContainersListPageFooter();
	};
		
	/** @description <b>renderContainersListPageFooter method</b>, rendering containers list page footer    
	 * @name uag.field.Controller.renderContainersListPageFooter
	 * @private
	 * @function
	 */
	var renderContainersListPageFooter = function() {
		console.log("fieldController.renderContainersListPageFooter()");
		
		var worker = dataContext.WorkerContainers.getWorker();
		 
		var footerText = "";
		if (worker.isAvailable) {
			var producer = dataContext.Producers.find();
			footerText = "( " + worker.name + " - " + producer.name + " )";
		} else {
			footerText = "( set worker and producer )";
		}
		$("#"+containersListPageFooterTextSelector).html(footerText);
	};
	
	/** @description <b>renderContainersListPageContent method</b>, rendering containers list page content    
	 * @name uag.field.Controller.renderContainersListPageContent
	 * @private
	 * @function
	 */
	var renderContainersListPageContent = function() {
		console.log("fieldController.renderContainersListPageContent()");
		
		var containers = dataContext.WorkerContainers.getContainers();
		var view = $("#" + containersListPageContentListSelector);
		view.empty();
		
		if (containers.length > 0) {
			// products
			var products = dataContext.Producers.getProductsKeyNamePairs();
			// qualities
			var qualities = dataContext.Producers.getQualitiesKeyNamePairs();
			// markup generation 
			var containersMarkup = "";
			for (var i = 0 ; i < containers.length ; i++)
			{
				var container = containers[i];
				var date = new Date(container.ts); 
				containersMarkup = containersMarkup +  
					'<li>' + 
					'<a href="#' + containerPageSelector + '?containerId=' + container.id + '">' +
					'<span>' + 
					container.weight + ' kg of ' + 
					qualities[container.qualityId] + ' ' + 
					products[container.productId] + ' from ' + 
					date.toLocaleDateString() + 
					'</span>' + 
					'</a>' + 
					'</li>'; 
			}
			// ui update 
			view.html(containersMarkup);
		}
		// ui refresh 
		view.listview('refresh');
	};
	
	/** @description <b>renderContainerPage method</b>, rendering container page     
	 * @name uag.field.Controller.renderContainerPage
	 * @private
	 * @function
	 */
	var renderContainerPage = function() {
		console.log("fieldController.renderContainerPage()");
		
		var qualityId = null;
		var fieldId = null;
		var productId = null 
		
		if (undefined !== containerId && null !== containerId && containerId.length > 0) {
			// update container 
			var container = dataContext.WorkerContainers.findContainer(containerId);
			if (undefined !== container && null !== container) {
				qualityId = container.qualityId;
				fieldId = container.fieldId;
				productId = container.productId;
				$('#' + containerPageFormIdSelector).val(container.id);
				$("#" + containerPageFormWeightSelector).val(container.weight);
			}
		} else {
			// create container 
			$('#' + containerPageFormIdSelector).val("");
		}
		
		// render containers list page 
		renderQualitiesSelectList(qualityId);
		var fieldId = renderFieldsSelectList(fieldId);
		renderProductsSelectList(fieldId, productId);		
	};
	
	/** @description <b>renderQualitiesSelectList method</b>, rendering qualities select list      
	 * @name uag.field.Controller.renderQualitiesSelectList
	 * @private
	 * @function
	 */
	var renderQualitiesSelectList = function(selectedValue) {
		console.log("fieldController.renderQualitiesSelectList()");
		
		var qualities = dataContext.Producers.getQualities();
		return renderSelectListOptions(containerPageFormQualitiesSelector, qualities, selectedValue);
	};
	
	/** @description <b>renderFieldsSelectList method</b>, rendering fields select list      
	 * @name uag.field.Controller.renderFieldsSelectList
	 * @private
	 * @function
	 */
	var renderFieldsSelectList = function(selectedValue) {
		console.log("fieldController.renderFieldsSelectList()");
		
		var fields = dataContext.Producers.getFields();
		return renderSelectListOptions(containerPageFormFieldsSelector, fields, selectedValue);
	};
	
	/** @description <b>renderProductsSelectList method</b>, rendering products select list      
	 * @name uag.field.Controller.renderProductsSelectList
	 * @private
	 * @function
	 */
	var renderProductsSelectList = function(fieldId, selectedValue) {
		console.log("fieldController.renderProductsSelectList()");
		
		var products = dataContext.Producers.getFieldProducts(fieldId);
		return renderSelectListOptions(containerPageFormProductsSelector, products, selectedValue);
	};
	
	/** @description <b>renderSetupPage method</b>, rendering setup page       
	 * @name uag.field.Controller.renderSetupPage
	 * @private
	 * @function
	 */
	var renderSetupPage = function() {
		console.log("fieldController.renderSetupPage()");
		
		var worker = dataContext.WorkerContainers.getWorker();
		if (worker.isAvailable) {
			$("#" + setupPageFormNameSelector).val(worker.name);
			renderProducersSelectList(worker.producerId);
		} else {
			$("#" + setupPageFormNameSelector).val("");
			renderProducersSelectList();
		}
	};
	
	/** @description <b>renderProducersSelectList method</b>, rendering producers select list      
	 * @name uag.field.Controller.renderProducersSelectList
	 * @private
	 * @function
	 */
	var renderProducersSelectList = function(selectedValue) {
		console.log("fieldController.renderProducersSelectList()");
		
		var producers = dataContext.Producers.get();
		return renderSelectListOptions(setupPageFormProducerSelector, producers, selectedValue);
	};
	
	/** @description <b>renderSelectListOptions method</b>, generic rendering select list      
	 * @name uag.field.Controller.renderSelectListOptions
	 * @private
	 * @function
	 */
	var renderSelectListOptions = function(selector, list, selectedValue) {
		console.log("fieldController.renderSelectListOptions()");
		// 
		var selectedItemId = "";
		var view = $("#" + selector);
		view.empty();
		// 
		if (undefined !== list && null !== list && list.length > 0) {
			// scope specific variables declarations
			var listOptionsMarkup = "";
			var selectedIndex = 0;
			// markup generation
			for (var i = 0 ; i < list.length ; i++) {
				listOptionsMarkup = listOptionsMarkup + 
					'<option value="' + list[i].id + '">' + list[i].name + '</option>';
				if (list[i].id === selectedValue) {
					selectedIndex = i;
				}
			}
			view.html(listOptionsMarkup);
			// this old school javascript does work 
			document.getElementById(selector).selectedIndex = selectedIndex;
			// but this jQuery based solution doesn't work
			//view.selectedIndex = selectedIndex;
			// TODO : so search for jQuery solution
			
			selectedItemId = list[selectedIndex].id;
		}
		view.selectmenu("refresh");
		return selectedItemId;
	};
	
	/** @description <b>onResetTapped method</b>, callback event method linked to application setup reset event   
	 * @name uag.field.Controller.onResetTapped
	 * @private
	 * @function
	 */
	var onResetTapped = function() {
		console.log("fieldController.onResetTapped()");
		
		dataContext.Producers.clear();
		dataContext.WorkerContainers.clear();
		renderSetupPage();
	};
	
	/** @description <b>onImportProducersTapped method</b>, callback event method linked to application setup import producers event 
	 * @name uag.field.Controller.onImportProducersTapped
	 * @private
	 * @function
	 */
	var onImportProducersTapped = function() {
		console.log("fieldController.onImportProducersTapped()");
		
		// TODO : miss select import file logic 
		//var producerId = dataContext.Import.addProducer(jsonProducer);
		//renderProducersSelectList(producerId);
		
		var selectedFile = "file:///mnt/sdcard/Download/Bluetooth/producerId1.json";
		
		window.resolveLocalFileSystemURI(
				selectedFile, 
				function(fileEntry) {
					//console.log("sdcard - directory : " + directoryEntry.name);
					//console.log("sdcard - directory : " + directoryEntry.fullPath);
					fileEntry.file(
							function(file) {
								var reader = new FileReader();
								reader.onloadend = function(evt) {
							        console.log("read success");
							        //console.log(evt.target.result);
							        var producerJSON = JSON.parse(evt.target.result);
							        console.log("id : " + producerJSON.id);
							        console.log("name : " + producerJSON.name);
									var producerId = dataContext.Import.addProducer(producerJSON);
									renderProducersSelectList(producerId);
							    };
							    reader.readAsText(file);
							}, 
							function(evt) {
								console.log("fileEntry.file - error : " + evt.target.error.code);
							} 
					);
				}, 
				function(error) {
					console.log("resolveLocalFileSystemURI - error : " + error.code);
				}
		);
		
	};
	
	/** @description <b>onSaveWorkerTapped method</b>, callback event method linked to application setup save worker event 
	 * @name uag.field.Controller.onSaveWorkerTapped
	 * @private
	 * @function
	 */
	var onSaveWorkerTapped = function() {
		console.log("fieldController.onSaveWorkerTapped()");
		
		var workerNameTextInput = $("#" + setupPageFormNameSelector);
		var producersSelectList = $("#" + setupPageFormProducerSelector);
		var uuid = device.uuid;
		// set new worker 
		dataContext.WorkerContainers.setWorker(uuid, workerNameTextInput.val(), producersSelectList.val());
		// redirect to containers list page 
		$.mobile.changePage($("#" + containersListPageSelector));
	};
	
	/** @description <b>onSaveContainerTapped method</b>, callback event method linked to application container save event 
	 * @name uag.field.Controller.ononSaveContainerTapped
	 * @private
	 * @function
	 */
	var onSaveContainerTapped = function() {
		console.log("fieldController.onSaveContainerTapped()");
		// get user input 
		var idHiddenInput = $("#" + containerPageFormIdSelector);
		var weightTextInput = $("#" + containerPageFormWeightSelector);
		var qualitiesSelectList = $("#" + containerPageFormQualitiesSelector);
		var fieldsSelectList = $("#" + containerPageFormFieldsSelector);
		var productsSelectList = $("#" + containerPageFormProductsSelector);

		var id = idHiddenInput.val();
		var weight = weightTextInput.val();
		var qualityId = qualitiesSelectList.val();
		var fieldId = fieldsSelectList.val();
		var productId = productsSelectList.val();
		
		//alert(id + " - " + weight + " - " + qualityId + " - " + fieldId + " - " + productId);
		
		// validate user input
		var valid = true;
		
		// do task 
		if (valid) {
			if (undefined !== id && null !== id && id.length > 0) {
				// update container
				dataContext.WorkerContainers.updateContainer(id, weight,qualityId,fieldId,productId);
			} else {
				// add container 
				dataContext.WorkerContainers.addContainer(weight,qualityId,fieldId,productId);
			}
		} else {
			// TODO : error message 
		}
		
		// reset hidden input (id) value 
		idHiddenInput.val("");
		
		// redirect to containers list page 
		$.mobile.changePage($("#" + containersListPageSelector));
	};
	
	/** @description <b>onDeleteContainerTapped method</b>, callback event method linked to application container delete event 
	 * @name uag.field.Controller.onDeleteContainerTapped
	 * @private
	 * @function
	 */
	var onDeleteContainerTapped = function() {
		console.log("fieldController.onDeleteContainerTapped()");
		
		dataContext.WorkerContainers.removeContainer(containerId);
		// redirect to containers list page 
		$.mobile.changePage($("#" + containersListPageSelector));
	};
	
	/** @description <b>onEncodeContainerTapped method</b>, callback event method linked to application container encode event 
	 * @name uag.field.Controller.onEncodeContainerTapped
	 * @private
	 * @function
	 */
	var onEncodeContainerTapped = function() {
		console.log("fieldController.onEncodeContainerTapped()");
		
		var dataToEncode = "http://www.mobiledevelopersolutions.com";
		
	    window.plugins.barcodeScanner.encode(
	            BarcodeScanner.Encode.TEXT_TYPE,
	            dataToEncode,
	            function(success) {
	                alert("Encode success: " + success);
	            }, 
	            function(fail) {
	                alert("Encoding failed: " + fail);
	            });
	}
	
	/** @description <b>onFieldChanged method</b>, callback event method linked to application container change selected field event 
	 * @name uag.field.Controller.onFieldChanged
	 * @private
	 * @function
	 */
	var onFieldChanged = function() {
		console.log("fieldController.onFieldChanged()");
		
		var fieldId = $("#" + containerPageFormFieldsSelector).val();
		// 
		renderProductsSelectList(fieldId);
	};

	/** @description <b>onResetContainersTapped method</b>, callback event method linked to application containers reset event 
	 * @name uag.field.Controller.onResetContainersTapped
	 * @private
	 * @function
	 */
	var onResetContainersTapped = function() {
		console.log("fieldController.onResetContainersTapped()");
		
		dataContext.WorkerContainers.removeContainers();
		renderContainersListPageContent();
	};
	
	var onExportContainersTapped = function() {
		console.log("fieldController.onExportContainersTapped()");
		// set data
		var data = JSON.stringify(dataContext.WorkerContainers.get());
		// create exported data file 
		var fileName = "workerId1.json";
		var fileDirectory = "file:///mnt/sdcard/Download/Bluetooth/";
		var filePath = "file:///mnt/sdcard/Download/Bluetooth/workerId1.json";
		// phonegap file write 
		window.resolveLocalFileSystemURI(fileDirectory, succes, fail); 

		function succes(directoryEntry) {
			console.log("succes");
			directoryEntry.getFile(fileName, { create : true , exclusive : false }, gotFileEntry, fail);
		};
		
		function gotFileEntry(fileEntry) {
			console.log("gotFileEntry");
			fileEntry.createWriter(gotFileWriter, fail);
		};
		
		function gotFileWriter(writer) {
			console.log("gotFileWriter");
			writer.write(data);
		};
		
		function fail(error) {
			console.log("export container - error : " + error.code);
		};		
		
	};
	
	return {
		//init : init
		onPageInit : pageInit, 
		onPageBeforeChange : pageBeforeChange, 
		onPageChange : pageChange
	};
	
} (jQuery, uag.field.dataContext));



// JQUERY MOBILE
//setting jQuery mobile mobileinit event callback function 
$(document).bind("mobileinit", onMobileInit);

//mobileinit event callback function 
function onMobileInit(event, data) { 
	"use strict";
	
	console.log("jQuery mobile mobileinit event"); 
	
	// idealy here apply overrides to jQuery Mobile's default auto-initialization configuration 
	//properties on $.mobile.
}

//setting jQuery mobile page initialization event callback function
$(document).bind("pageinit", uag.field.Controller.onPageInit);	
//setting jQuery mobile page change events callback function
$(document).bind("pagebeforechange", uag.field.Controller.onPageBeforeChange);
$(document).bind("pagechange", uag.field.Controller.onPageChange);

/*
//setting jQuery mobile page event callback 
//setting others jQuery mobile page initialization event callback function
$(document).bind("pagebeforecreate", function(event, data) { console.log("jQuery mobile pagebeforecreate event"); });
$(document).bind("pagecreate", function(event, data) { console.log("jQuery mobile pagecreate event"); });
$(document).bind("pageinit", onPageInit);	
//setting jQuery mobile page change events callback function
$(document).bind("pagebeforechange", function(event, data) { console.log("jQuery mobile pagebeforechange event"); });
$(document).bind("pagechange", function(event, data) { console.log("jQuery mobile pagechange event"); });
$(document).bind("pagechangefailed", function(event, data) { console.log("jQuery mobile pagechangefailed event"); });
//setting jQuery mobile page transition event callback function 
$(document).bind("pagebeforeshow", function(event, ui) { console.log("jQuery mobile pagebeforeshow event"); });
$(document).bind("pagebeforehide", function(event, ui) { console.log("jQuery mobile pagebeforehide event"); });
$(document).bind("pageshow", function(event, ui) { console.log("jQuery mobile pageshow event"); });
$(document).bind("pagehide", function(event, ui) { console.log("jQuery mobile pagehide event"); });

//setting jQuery mobile touch events callback function : tap, taphold, swipe, swipeleft, swiperight, 
//setting jQuery mobile virtual mouse events callback function : vmouseover, vmousedown, vmousemove, vmouseup, vmouseclick, vmousecancel 
//setting jQuery mobile orientation change event callback function : orientationchange
//setting jQuery mobile scroll events callback function : scrollstart, scrollstop 
//setting jQuery mobile page load events callback function : pagebeforeload, pageload, pageloadfailed
*/


// APACHE CORDOVA 

// At this point, the document has loaded but cordova-2.0.0.js has not.
function onLoad() {
	"use strict";
	
	// When Cordova is loaded and talking with the native device, it will call the event "deviceready".
    document.addEventListener("deviceready", onDeviceReady, false);
    
}

// Cordova is loaded and it is now safe to make calls Cordova methods
function onDeviceReady() {
	"use strict";
    
    // Handle the pause event
    document.addEventListener("pause", onPause, false);
    function onPause() { console.log("cordova pause event "); }
    
    // Handle the resume event
    document.addEventListener("resume", onResume, false);
    function onResume() { console.log("cordova resume event "); }

    // Handle the back button
    document.addEventListener("backbutton", onBackKeyDown, false);
    function onBackKeyDown() { console.log("cordova back button event "); }
    
    // Handle the menu button
    document.addEventListener("menubutton", onMenuKeyDown, false);
    function onMenuKeyDown() { console.log("cordova menu button event "); }
    
    // Handle the search button
    document.addEventListener("searchbutton", onSearchKeyDown, false);
    function onSearchKeyDown() { console.log("cordova search button event "); }

    // Handle the start call button
    document.addEventListener("startcallbutton", onStartCallKeyDown, false);
    function onStartCallKeyDown() { console.log("cordova start call button event "); }
    
    // Handle the end call button
    document.addEventListener("endcallbutton", onEndCallKeyDown, false);
    function onEndCallKeyDown() { console.log("cordova end call button event "); }
    
	// place to bootstrap application 
	//uag.field.Controller.init();    

}




/*
// on the web 
$(document).bind("mobileinit", function () {
	uag.field.Controller.init();
});
*/
/*
// cordova is ready 
function onDeviceReady() {
	"use strict";
	
	// wait for jQuery load : declare a callback for jQuery to call when its load
	$(document).ready(function(e, data) {
		// place to bootstrap application 
		uag.field.Controller.init();
	});	
	
};

// on mobile phone  
document.addEventListener("deviceready", onDeviceReady, false);
*/