/**@fileOverview uag Field app dataContext declaration
 * @author Sébastien Vivier, NSY209, CNAM  
 * @version Copyright (c) 2012
 * */


/**
 * @namespace uag
 * @name uag
 * @function
 */
var uag = (function (parent) {
	"use strict";	
		
	/**
	 * @name uag.util
	 * @namespace uag.util
	 */
	parent.util = parent.util || {};
	
	/**
	 * @name uag.field
	 * @namespace uag.field
	 */
	parent.field = parent.field || {};
	
	/**
	 * @name uag.field.dataContext
	 * @namespace uag.field.dataContext
	 */
	parent.field.dataContext = parent.field.dataContext || {};
	
	// storage object declaration 
	/**
	 * @memberOf uag.util
	 * @class Storage
	 */
	var Storage = function() {};
	
	/** @description <b>Retrieve methods</b>, get data from local storage
	 * @name uag.util.Storage.Retrieve
	 * @function
	 * @static
	 * @param key the local storage key 
	 * @returns {JSON} json object list 
	 */
	Storage.Retrieve = function(key) {
		// return json 
		return JSON.parse(localStorage.getItem(key));	
	};
	
	/** @description <b>Save method</b>, set data to the local storage 
	 * @name uag.util.Storage.Save
	 * @function
	 * @static
	 * @param key the local storage key
	 * @param json json data 
	 */
	Storage.Save =  function(key, json) {	
		// save list in local storage for key  
		localStorage.setItem(key, JSON.stringify(json));
	}; 
	
	/** @description <b>Delete method</b>, delete data from local storage 
	 * @name uag.util.Storage.Delete
	 * @function
	 * @static
	 * @param key the local storage key
	 */
	Storage.Delete = function(key) {
		// remove item for key from local storage  
		localStorage.removeItem(key);
	};
	
	parent.util.Storage = Storage;


	// producers object declaration 
	/** 
	 * @class Producers
	 * @memberOf uag.field.dataContext
	 * */
	var Producers = function(){};
	
	// fields object public, static, non-privileged methods  
	
	/** @description <b>getLocalStorageKey method</b>, producers local storage key getter method
	 * @name uag.field.dataContext.Producers.getLocalStorageKey
	 * @function
	 * @static
	 * @returns {String} key 
	 */
	Producers.getLocalStorageKey = function() { return "producers"; };
	
	/** @description <b>getAll method</b>, fetch all producers 
	 * @name uag.field.dataContext.Producers.get
	 * @function
	 * @static
	 * @returns {Array} producers list 
	 */
	Producers.get = function() {
		// get producer's list 
		return Storage.Retrieve(Producers.getLocalStorageKey()) || [];
	};
	
	/** @description <b>findById method</b>, find current setup producer 
	 * @name uag.field.dataContext.Producers.find
	 * @function
	 * @static 
	 * @returns {Object} producer json local storage data 
	 */
	Producers.find = function() {
		// get worker  
		var worker = WorkerContainers.getWorker();
		if (worker.isAvailable) {
			// get producer's list 
			var producers = Storage.Retrieve(Producers.getLocalStorageKey()) || [];
			// filter producers 
			for ( var int = 0; int < producers.length; int++) {
				// if ids match, 
				if (worker.producerId === producers[int].id) {
					// then return it
					return producers[int];
				}
			}
		}
		return null;
	};
	
	/** @description <b>getFields method</b>, fetch fields (for current setup producer)
	 * @name uag.field.dataContext.Producers.getFields
	 * @function
	 * @static
	 * @returns {Array} fields list 
	 */
	Producers.getFields = function() {
		// get producer 
		var producer = Producers.find();
		if (null !== producer) {
			return  producer.fields || [];
		} else {
			return [];
		}
	};
	
	/** @description <b>findField method</b>, find a field (for current setup producer) 
	 * @name uag.field.dataContext.Producers.findField
	 * @function
	 * @static 
	 * @param fieldId field's id
	 * @returns {Object} field  
	 */
	Producers.findField = function(fieldId) {
		// get producer's fields
		var fields = Producers.getFields();
		// filter fields
		for ( var int = 0; int < fields.length; int++) {
			// if ids match 
			if (fields[int].id === fieldId) {
				return fields[int];
			}
		}
		return null;
	};
	
	/** @description <b>getProducts method</b>, fetch products (for current setup producer) 
	 * @name uag.field.dataContext.Producers.getProducts
	 * @function
	 * @static
	 * @return {Array} producer's products list
	 */
	Producers.getProducts = function() {
		// get producer 
		var producer = Producers.find();
		// returns products
		if (null !== producer) {
			return producer.products || [];
		} else {
			return [];
		}
	};
	
	/** @description <b>getProductsForField method</b>, fetch products for a field (and current setup producer) 
	 * @name uag.field.dataContext.Producers.getFieldProducts
	 * @function
	 * @static
	 * @param fieldId field's id
	 * @returns {Array} products list
	 */
	Producers.getFieldProducts = function(fieldId) {
		// get products
		var products = Producers.getProducts();
		// get field 
		var field = Producers.findField(fieldId);
		
		return products.filter(function(product) {
			return -1 !== field.productsId.indexOf(product.id);
		});
		/*
		// declare result set 
		var fieldProducts = [];
		// filter products 
		for ( var int = 0; int < products.length; int++) {
			// if current product associate with field 
			if (-1 !== field.productsId.indexOf(products[int].id)) {
				// then add it 
				fieldProducts.push(products[int]);
			}
		}
		return fieldProducts;
		*/
	};
	
	/** @description <b>findProductsByIdForField method</b>, find product for a field (and current setup producer) 
	 * @name uag.field.dataContext.Producers.findFieldProduct
	 * @function
	 * @static
	 * @param fieldId field's id
	 * @param productId product's id
	 * @returns {Object} product  
	 */
	Producers.findFieldProduct = function(fieldId, productId) {
		// get products 
		var products = Producers.getFieldProducts(fieldId);
		// find product 
		for ( var int = 0; int < products.length; int++) {
			// if ids match
			if (products[int].id === productId) {
				// then return it
				return products[int];
			}
		}
		return null;
	};
	
	/** @description <b>getQualities method</b>, fetch producer's qualities list 
	 * @name uag.field.dataContext.Producers.getQualities
	 * @function
	 * @static
	 * @returns {Array} quality objects list
	 */
	Producers.getQualities = function() {
		// get producer 
		var producer = Producers.find();
		// 
		if (null !== producer) {
			return producer.qualities || [];
		} else {
			return [];
		}
	};
	
	/** @description <b>remove method</b>, remove a producer 
	 * @name uag.field.dataContext.Producers.remove
	 * @function
	 * @static
	 * @param producerId producer's id
	 */
	Producers.remove = function(producerId) {
		// get current producers list  
		var currentProducers = Producers.getAll();
		// update producers list 
		var updatedProducers = [];
		for ( var int = 0 ; int < currentProducers.length ; int++ ) {
			if (currentProducers[int].getId() !== producerId) {
				updatedProducers.push(currentProducers[int]);
			}
			// so else remove implicitly producer for id 
		}
		// save updated producers list  
		Storage.Save(Producers.getLocalStorageKey(),updatedProducers);
	};
	
	/** @description <b>clear method</b>, clear all producers 
	 * @name uag.field.dataContext.Producers.clear
	 * @function
	 * @static
	 * @param producerId producer's id
	 */
	Producers.clear = function() {
		// delete producer key 
		Storage.Delete(Producers.getLocalStorageKey());
	};
	
	parent.field.dataContext.Producers = Producers;

	
	// workerContainers object declaration
	/**
	 * @class workerContainers
	 * @memberOf uag.field.dataContext
	 */
	var WorkerContainers = function() {};
	
	/** @description <b>getLocalStorageKey method</b>, 
	 * @name uag.field.dataContext.WorkerContainers.getLocalStorageKey
	 * @function
	 * @static
	 * @returns {String} setup local storage key 
	 */
	WorkerContainers.getLocalStorageKey = function() { return "workerContainers"; };
	
	/** @description <b>getJSON method</b>, from object to json
	 * @name uag.field.dataContext.WorkerContainers.getJSON
	 * @function
	 * @param worker 
	 * @param containers updated containers list
	 * @static
	 * @returns {JSON}  
	 */
	WorkerContainers.getJSON = function(worker, containers) {
		//var jsonWorker = JSON.parse(worker.toString());
		var json = {
				"worker":worker,
				"containers":containers};
		return json;
	};
	
	/** @description <b>get method</b>, 
	 * @name uag.field.dataContext.WorkerContainers.get
	 * @function
	 * @static
	 * @returns {JSON}  
	 */
	WorkerContainers.get = function() {
		// get workerContainers
		return Storage.Retrieve(WorkerContainers.getLocalStorageKey());
	};
	
	/** @description <b>getWorker method</b>, 
	 * @name uag.field.dataContext.WorkerContainers.getWorker
	 * @function
	 * @static
	 * @returns {Object}  
	 */
	WorkerContainers.getWorker = function() {
		// get worker
		var workerContainers = WorkerContainers.get();
		//
		var isAvailableWorker = 
			(undefined !== workerContainers && 
			null !== workerContainers && 
			undefined !== workerContainers.worker && 
			null !== workerContainers.worker);
		
		if (isAvailableWorker) {
			workerContainers.worker.isAvailable = true;
			return workerContainers.worker;
		}
		return { "isAvailable" : false };
	};
		
	/** @description <b>setWorker method</b>, 
	 * @name uag.field.dataContext.WorkerContainers.setWorker
	 * @function
	 * @static
	 * @param name worker's name
	 * @param producerId worker's selected producer id 
	 * @returns {String} worker's id 
	 */
	WorkerContainers.setWorker = function(name, producerId) {
		// input validation 
		//TODO : name input validation
		
		// delete old worker's containers 
		WorkerContainers.clear();
		
		// read from phonegap/cordova device  
		var smartphoneId = "uuid";//device.uuid;
		// worker_id_ts_name_smartphoneId
		var id = "worker_id_" + Date.now() + "_" + name + "_" + smartphoneId;
		// create worker 
		var worker = 
			{
				"id":id,
				"name":name,  
				"smartphoneId":smartphoneId,  
				"containersId":[],  
				"producerId":producerId
			};
		
		// save new workers list 
		Storage.Save(
				WorkerContainers.getLocalStorageKey(), 
				WorkerContainers.getJSON(worker, []));
		
		return id;		
	};
	
	/** @description <b>getContainers method</b>, 
	 * @name uag.field.dataContext.WorkerContainers.getContainers
	 * @function
	 * @static
	 * @returns {Array} containers list  
	 */
	WorkerContainers.getContainers = function() {
		// get worker's containers
		var workerContainers = Storage.Retrieve(WorkerContainers.getLocalStorageKey());
		
		var isAvailableContainers = 
			(undefined !== workerContainers && null !== workerContainers &&
			undefined !== workerContainers.containers && null !== workerContainers.containers);
		
		if (isAvailableContainers) {
			return workerContainers.containers;
		}
		return [];
	};
	
	/** @description <b>addContainers method</b>, 
	 * @name uag.field.dataContext.WorkerContainers.addContainer
	 * @function
	 * @static
	 * @returns {String} container's id 
	 */
	WorkerContainers.addContainer = function(weight, qualityId, fieldId, productId) {
		// TODO : input validation 
	
		var ts = Date.now();
		var id = "container_id_" + ts;
		// get worker 
		var worker = WorkerContainers.getWorker();			
		// new Container 
		var container =  
			{
				"id":id,
				"weight":weight,
				"ts":ts,
				"qualityId":qualityId,
				"workerId":worker.id,
				"producerId":worker.producerId,
				"fieldId":fieldId,
				"productId":productId
			};
		 
		// get current worker 
		var containers = WorkerContainers.getContainers();
		// add container
		containers.push(container);
		// save new workers list
		Storage.Save(
				WorkerContainers.getLocalStorageKey(), 
				WorkerContainers.getJSON(worker,containers));
		
		return id;		
	};
	
	
	/** @description <b>findContainerById method</b>, 
	 * @name uag.field.dataContext.WorkerContainers.findContainer
	 * @function
	 * @param containerId 
	 * @static
	 * @returns {Object} container  
	 */
	WorkerContainers.findContainer = function(containerId) {
		// get containers 
		var containers = WorkerContainers.getContainers();
		// filter
		for ( var int = 0 ; int < containers.length ; int++ ) {
			// ids match
			if (containers[int].id === containerId) {
				// then return it
				return containers[int];
			}
		}
		return null;
	};
	
	/** @description <b>removeContainers method</b>, 
	 * @name uag.field.dataContext.WorkerContainers.removeContainer
	 * @function
	 * @static
	 * @param containerId container's id
	 */
	WorkerContainers.removeContainer = function(containerId) {
		// get containers
		var containers = WorkerContainers.getContainers();
		// update containers list 
		var updatedContainers = [];
		for ( var int = 0 ; int < containers.length ; int++ ) {
			if (containers[int].id !== containerId) {
				updatedContainers.push(containers[int]);
			}
			// so else remove implicitly container for id 
		}
		// save worker's containers list  
		Storage.Save(
				WorkerContainers.getLocalStorageKey(),
				WorkerContainers.getJSON(WorkerContainers.getWorker(), updatedContainers));
	};
	
	/** @description <b>remove method</b>, 
	 * @name uag.field.dataContext.WorkerContainers.removeContainers
	 * @function
	 * @static
	 */
	WorkerContainers.removeContainers = function() {
		// save worker's containers list  
		Storage.Save(
				WorkerContainers.getLocalStorageKey(),
				WorkerContainers.getJSON(WorkerContainers.getWorker(), []));
	};
	
	/** @description <b>clear method</b>, 
	 * @name uag.field.dataContext.WorkerContainers.clear
	 * @function
	 * @static
	 */
	WorkerContainers.clear = function() {
		// delete worker's containers key 
		Storage.Delete(WorkerContainers.getLocalStorageKey());
	};
	
	parent.field.dataContext.WorkerContainers = WorkerContainers;

	

	// import object declaration 
	/**
	 * @class Import
	 * @memberOf uag.field.dataContext
	 */
	var Import = function(){};
	
	// fields object public, static, non-privileged methods  
	/** @description <b>addProducer method</b>, add a new producer to local storage  
	 * @name uag.field.dataContext.Import.addProducer
	 * @function
	 * @static
	 * @param jsonProducerData producer json data 
	 * @throws {Error} Producer already imported
	 * @returns {String} producer's id
	 */
	Import.addProducer = function(jsonProducerData) {
		
		// get new producer's id 
		var producerId = jsonProducerData.id;
		// 
		var exist = false;
		// producers 
		var producers = Producers.get();
		// search
		for ( var int = 0 ; int < producers.length ; int++ ) {
			exist = exist || producers[int].id === producerId;
		}

		// if not exists already
		if (!exist) {
			// then add it to producers list
			
			// add json producer data to json producers list 
			producers.push(jsonProducerData);
			// set json producers list to local storage   
			Storage.Save(Producers.getLocalStorageKey(), producers);
			
			// return producer's id
			return jsonProducerData.id;
			
		} else {
			throw new Error("Producer already imported");
		}
		
	};
	//Import.addProducer = addProducer;
	
	parent.field.dataContext.Import = Import;


	// export object declaration 
	/**
	 * @class Export
	 * @memberOf uag.field.dataContext
	 */
	var Export = function(){};
	
	// fields object public, static, non-privileged methods  
	/** @description <b>get method</b>, 
	 * @name uag.field.dataContext.Export.get
	 * @function
	 * @static
	 */
	Export.get = function() {};
	//Export.get = get;
	
	parent.field.dataContext.Export = Export;
	
	return parent;
	
}(uag || {}));
