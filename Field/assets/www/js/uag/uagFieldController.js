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
			"name":"producerName", 
			"smartphoneId":"producerSmartphoneId",  
			"farmName":"producerFarmname",  
			"websiteUrl":"http://www.producerDomaine.ext",   
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
	
	// containers list page 
	var containersListPageSelector = "containers-list-page";
	var containersListPageContentSelector = "containers-list-page-content";
	var containersListPageFooterTextSelector = "containers-list-page-footer-text";
	
	// container page
	var containerPageSelector = "container-page";
	
	// setup page 
	var setupPageSelector = "setup-page";
	var setupPageImportSelector = "setup-page-import";
	var setupPageSaveSelector = "setup-page-save";
	var setupPageFormNameSelector = "setup-page-form-name";
	var setupPageFormProducerSelector = "setup-page-form-producer";
	
	// events 
	var tapEvent = "click";
	
	var init = function() {
		
		//dataContext.init();
		
		$(document).bind("pagebeforechange", onPageBeforeChange);
		$(document).bind("pagechange", onPageChange);
		
		// setup page event 
		$(document).delegate("#" + setupPageImportSelector, tapEvent, onImportProducersTapped);
		$(document).delegate("#" + setupPageSaveSelector, tapEvent, onSaveWorkerTapped);
		
		// container page event 
		
		// containers list page event 
		
	};

	var onPageBeforeChange = function(event, data) {
		//alert("pagebeforechange");
		
	};
	
	var onPageChange = function(event, data) {
		//alert("pagechange");
		//alert(data.toSource());
		//alert(data.options.toSource());
		//alert(data.toPage.toSource());
		var toPageId = data.toPage.attr("id");
		//alert("onPageChange : " + toPageId + " - " + setupPageSelector);
		//alert(toPageId == setupPageSelector);
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
			alert(worker.name + " - " + producer.name);
		} else {
			footerText = "( set worker and producer )";
		}
		//$("#"+containersListPageFooterTextSelector).html('<h4 style="text-align:center">' + title + '</h4>');
		$("#"+containersListPageFooterTextSelector).html(footerText);
	};
	
	var renderContainersListPageContent = function() {
		//alert("renderContainersListContent");
		var containers = dataContext.WorkerContainers.getContainers();
		var view = $("#" + containersListPageContentSelector);
		view.empty();
		
		if (containers.length === 0) {
			$('<pre><div>No containers cached</div></pre>').appendTo(view);
		} else {
			
			var containersMarkup = '<ul data-role="listview" id="containers-list">';
			for (var i = 0 ; i < containers.length ; i++)
			{
				var container = containers[i];
				var containersMarkup = containersMarkup +  
					'<li>' + 
					'<a href="#container?' + container.id + '">' + 
					'<span>' + 
					container.weight + ' kg of ' + 
					container.qualityId + ' ' + 
					container.productId + ' from ' + 
					container.ts + 
					'</span>' + 
					'</a>' + 
					'</li>'; 
			}
			containersMarkup += '</ul>';
			
			$(containersMarkup).appendTo(view);
			
			view.listview()
		}
	};
	
	var renderContainerPage = function() {
		alert("renderContainerPage");
	};
	
	var renderSetupPage = function() {
		//alert("renderSetupPage");
		renderProducersSelectList();
	};
	
	var renderProducersSelectList = function() {
		//alert("renderProducersList");
		var producers = dataContext.Producers.get();
		
		var view = $("#" + setupPageFormProducerSelector);
		view.empty();
		
		var producersMarkup = "";
		for (var i = 0 ; i < producers.length ; i++) {
			producersMarkup = producersMarkup + 
				'<option value="' + producers[i].id + '">' + producers[i].name + '</option>';
		}
		//alert(producersMarkup);
		//$().appendTo();
		view.html(producersMarkup);
	};
	
	var onImportProducersTapped = function() {
		//alert("onImportProducersTapped");
		var producerId = uag.field.dataContext.Import.addProducer(_jsonProducer1Data);
		//alert(producerId);
		renderProducersSelectList();
	};
	
	var onSaveWorkerTapped = function() {
		//alert("onSaveWorkerTapped");
		var workerNameTextInput = $("#" + setupPageFormNameSelector);
		var producersSelectList = $("#" + setupPageFormProducerSelector);
		
		alert("onSaveWorkerTapped : " + workerNameTextInput.val() + " - " + producersSelectList.val());
		
		//dataContext.WorkerContainers.setWorker(workerNameTextInput.val(), producersSelectList.val());
	};
	
	var renderContainerPage = function() {};
	
	var renderQualitiesSelectList = function() {};
	
	var renderFieldsSelectList = function() {};
	
	var renderProductsSelectList = function(fieldId) {};
	
	return {
		init : init
	};
	
} (jQuery, uag.field.dataContext));


$(document).bind("mobileinit", function () {
	uag.field.Controller.init();
});

/*
//cordova is ready 
function onDeviceReady() {
	
	alert('cordova loaded !');
	
	// jQuery Mobile  
	$(document).bind("mobileinit", function(e, data) {
		// apply overrides here 
		alert('jQuery mobile loaded !');

		
		// wait for jQuery load : declare a callback for jQuery to call when its load
		$(document).ready(function(e, data) {
			// place to bootstrap application 
			alert('jQuery loaded !');
		});
		
	});
}

document.addEventListener("deviceready",onDeviceReady,false);
*/