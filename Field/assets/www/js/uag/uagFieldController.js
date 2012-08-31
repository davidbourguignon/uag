/**@fileOverview uag Field app controller declaration
 * @author Sébastien Vivier, NSY209, CNAM  
 * @version Copyright (c) 2012
 * */


	// temp
	// producer1s id
	var _producerId1 = "producer_id_1";

	// producer1 full definition string 
	var _jsonProducer1Data = 
		{  
			"id":_producerId1,  
			"name":"producerName1", 
			"smartphoneId":"producerSmartphoneId1",  
			"farmName":"producerFarmname1",  
			"websiteUrl":"http://www.producer1Domaine.ext",   
			"workersId":[],  
			"fieldsId":  
			[  
				"field_id_1",  
				"field_id_2",  
				"field_id_3"  
			],  
			"fields":  
			[  
				{  
					"id":"field_id_1",  
					"name":"fieldName1",  
					"description":"fieldDescription1",   
					"producerId":"producer_id_1",  
					"positionId":"position_id_1",   
					"position":{"id":"position_id_1","latitude":1,"longitude":2,"altitude":4}, 
					"productsId":  
					[  
						"product_id_1",  
						"product_id_2",  
						"product_id_3"  
					]  
				},   
				{  
					"id":"field_id_2",  
					"name":"fieldName2",  
					"description":"fieldDescription2",   
					"producerId":"producer_id_1",  
					"positionId":"position_id_2",    
					"position":{"id":"position_id_2","latitude":2,"longitude":4,"altitude":8}, 
					"productsId":  
					[  
						"product_id_2",  
						"product_id_3"  
					]  
				},   
				{  
					"id":"field_id_3",  
					"name":"fieldName3",  
					"description":"fieldDescription3",   
					"producerId":"producer_id_1",  
					"positionId":"position_id_3",    
					"position":{"id":"position_id_3","latitude":3,"longitude":6,"altitude":12}, 
					"productsId":  
					[  
						"product_id_3",  
						"product_id_4",  
						"product_id_5",  
						"product_id_6"  
					]  
				}   
			],  
			"productsId":  
			[  
				"product_id_1",  
				"product_id_2",  
				"product_id_3",  
				"product_id_4",  
				"product_id_5",  
				"product_id_6"  
			],  
			"products":  
			[  
				{ 
					"id":"product_id_1",  
					"name":"productName1",  
					"description":"productDescription1"   
				},  
				{ 
					"id":"product_id_2",  
					"name":"productName2",  
					"description":"productDescription2"   
				},  
				{ 
					"id":"product_id_3",  
					"name":"productName3",  
					"description":"productDescription3"   
				},  
				{ 
					"id":"product_id_4",  
					"name":"productName4",  
					"description":"productDescription4"   
				},  
				{ 
					"id":"product_id_5",  
					"name":"productName5",  
					"description":"productDescription5"   
				},  
				{ 
					"id":"product_id_6",  
					"name":"productName6",  
					"description":"productDescription6"   
				}  
			],  
			"qualities": 
			[  
				{  
					"id":"quality_id_1",  
					"name":"bad",  
					"description":"bad quality"   
				},  
				{  
					"id":"quality_id_2",  
					"name":"poor",  
					"description":"poor quality"   
				},  
				{  
					"id":"quality_id_3",  
					"name":"good",  
					"description":"good quality"   
				},  
				{  
					"id":"quality_id_4",  
					"name":"superior",  
					"description":"superior quality"   
				},  
				{  
					"id":"quality_id_5",  
					"name":"excellent",  
					"description":"excellent quality"   
				}  
			]  
		};



uag.field = uag.field || {};

uag.field.Controller = (function($, dataContext) {
	"use strict";
	
	// containers list page 
	var containersListPageSelector = "containers-list-page";
	//var containersListPageContentSelector = "containers-list-page-content";
	var containersListPageContentListSelector = "containers-list-page-content-list";
	var containersListPageFooterResetSelector = "containers-list-page-footer-reset";
	var containersListPageFooterTextSelector = "containers-list-page-footer-text";
	
	// container page
	var containerPageSelector = "container-page";
	var containerPageSaveSelector = "container-page-save";
	var containerPageDeleteSelector = "container-page-delete";
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
	
	var init = function() {
		
		//dataContext.init();
		
		$(document).bind("pagebeforechange", onPageBeforeChange);
		$(document).bind("pagechange", onPageChange);
		
		// setup page event 
		$(document).delegate("#" + setupPageResetSelector, tapEvent, onResetTapped);
		$(document).delegate("#" + setupPageImportSelector, tapEvent, onImportProducersTapped);
		$(document).delegate("#" + setupPageSaveSelector, tapEvent, onSaveWorkerTapped);
		
		// container page event 
		$(document).delegate("#" + containerPageSaveSelector, tapEvent, onSaveContainerTapped);
		$(document).delegate("#" + containerPageDeleteSelector, tapEvent, onDeleteContainerTapped);
		$(document).delegate("#" + containerPageFormFieldsSelector, "change", onFieldChanged);
		
		// containers list page event 
		$(document).delegate("#" + containersListPageFooterResetSelector, tapEvent, onResetContainersTapped);
		
	};

	var onPageBeforeChange = function(event, data) {
		//alert("pagebeforechange");
		
		// TODO : upgrade this code specific 
		
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
	
	var onPageChange = function(event, data) {
		//alert("pagechange");
		var toPageId = data.toPage.attr("id");
		//alert(toPageId);
		switch(toPageId) {
		
			case containersListPageSelector : 
				//alert("containers list");
				renderContainersListPage();
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
	
	var renderContainersListPage = function() {
		//alert("renderContainersListPage");
		renderContainersListPageContent();
		renderContainersListPageFooter();
	};
	
	var renderContainersListPageFooter = function() {
		//alert("renderContainersListTitle");
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
	
	var renderContainersListPageContent = function() {
		//alert("renderContainersListContent");
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
	
	var renderContainerPage = function() {
		//alert("renderContainerPage");		
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
	
	var renderQualitiesSelectList = function(selectedValue) {
		//alert("renderQualitiesSelectList");
		var qualities = dataContext.Producers.getQualities();
		return renderSelectListOptions(containerPageFormQualitiesSelector, qualities, selectedValue);
	};
	
	var renderFieldsSelectList = function(selectedValue) {
		//alert("renderFieldsSelectList");
		var fields = dataContext.Producers.getFields();
		return renderSelectListOptions(containerPageFormFieldsSelector, fields, selectedValue);
	};
	
	var renderProductsSelectList = function(fieldId, selectedValue) {
		//alert("renderProductsSelectList");
		var products = dataContext.Producers.getFieldProducts(fieldId);
		return renderSelectListOptions(containerPageFormProductsSelector, products, selectedValue);
	};
	
	var renderSetupPage = function() {
		//alert("renderSetupPage");
		var worker = dataContext.WorkerContainers.getWorker();
		if (worker.isAvailable) {
			$("#" + setupPageFormNameSelector).val(worker.name);
			renderProducersSelectList(worker.producerId);
		} else {
			$("#" + setupPageFormNameSelector).val("");
			renderProducersSelectList();
		}
	};
	
	var renderProducersSelectList = function(selectedValue) {
		//alert("renderProducersList");
		var producers = dataContext.Producers.get();
		return renderSelectListOptions(setupPageFormProducerSelector, producers, selectedValue);
	};
	
	var renderSelectListOptions = function(selector, list, selectedValue) {
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
	
	var onResetTapped = function() {
		//alert("onResetTapped");
		dataContext.Producers.clear();
		dataContext.WorkerContainers.clear();
		renderSetupPage();
	};
	
	var onImportProducersTapped = function() {
		//alert("onImportProducersTapped");
		var producerId = uag.field.dataContext.Import.addProducer(_jsonProducer1Data);
		renderProducersSelectList(producerId);
	};
	
	var onSaveWorkerTapped = function() {
		//alert("onSaveWorkerTapped");
		var workerNameTextInput = $("#" + setupPageFormNameSelector);
		var producersSelectList = $("#" + setupPageFormProducerSelector);
		var uuid = device.uuid;
		// set new worker 
		dataContext.WorkerContainers.setWorker(uuid, workerNameTextInput.val(), producersSelectList.val());
		// redirect to containers list page 
		$.mobile.changePage($("#" + containersListPageSelector));
	};
	
	var onSaveContainerTapped = function() {
		//alert("onSaveContainerTapped");
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
		
		// redirect to containers list page 
		$.mobile.changePage($("#" + containersListPageSelector));
	};
	
	var onDeleteContainerTapped = function() {
		//alert("onDeleteContainerTapped");
		dataContext.WorkerContainers.removeContainer(containerId);
		// redirect to containers list page 
		$.mobile.changePage($("#" + containersListPageSelector));
	};
	
	var onResetContainersTapped = function() {
		//alert("onResetContainersTapped");
		dataContext.WorkerContainers.removeContainers();
		renderContainersListPageContent();
	};
	
	var onFieldChanged = function() {
		//alert("onFieldChanged");
		var fieldId = $("#" + containerPageFormFieldsSelector).val();
		// 
		renderProductsSelectList(fieldId);
	};
	
	return {
		init : init
	};
	
} (jQuery, uag.field.dataContext));

/*
// on the web 
$(document).bind("mobileinit", function () {
	uag.field.Controller.init();
});
*/

// cordova is ready 
function onDeviceReady() {
	"use strict";
	alert('cordova loaded !');
	
	// wait for jQuery load : declare a callback for jQuery to call when its load
	$(document).ready(function(e, data) {
		// place to bootstrap application 
		alert('jQuery loaded !');
		uag.field.Controller.init();
	});
	
	/*
	window.requestFileSystem(
			LocalFileSystem.PERSISTENT, 
			0, 
			function(fileSystem) {
				console.log("fileSystem : " + fileSystem.name);
				console.log("fileSystem : " + fileSystem.root.name);
				console.log("fileSystem : " + fileSystem.root.fullpath);
				
			}, 
			function(error) {
				console.log("error : " + error.code);				
			});
	*/
	
	// 
	var encodeText = function() {
	    window.plugins.barcodeScanner.encode(
	            BarcodeScanner.Encode.TEXT_TYPE,
	            "http://www.mobiledevelopersolutions.com",
	            function(success) {
	                alert("Encode success: " + success);
	            }, function(fail) {
	                alert("Encoding failed: " + fail);
	            });
	};
	
	encodeText();
	

};

// on mobile phone  
document.addEventListener("deviceready",onDeviceReady,false);
