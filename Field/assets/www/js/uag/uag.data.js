/**@fileOverview uag data logic   
 * @author Sébastien Vivier, NSY209, CNAM  
 * @version Copyright (c) 2012
 * */



//var uag = uag || {};

///**
// * @namespace Holds data functionality 
// */
//uag.data = uag.data || {};


// storage object declaration scope
var uag = (function (parent) {
	"use strict";	
	
	/**
	 * @memberOf uag.data
	 * @class Storage
	 */
	var Storage = function() {};
	
	/** @description <b>Retrieve methods</b>, get data from local storage
	 * @memberOf uag.data.Storage
	 * @static
	 * @param key the local storage key 
	 * @returns {Array} json object list 
	 */
	var Retrieve = function(key) {
		// get list from local storage 
		var list = JSON.parse(localStorage.getItem(key));
	
		var valid = 
			list !== undefined &&
			null !== list &&
			uag.util.Type.isArray(list);
		
		if (valid) {
			return list;
		} else {
			return [];
		}
	
	};
	
	Storage.Retrieve = Retrieve;
	
	/** @description <b>Save method</b>, set data to the local storage 
	 * @memberOf uag.data.Storage
	 * @static
	 * @param key the local storage key
	 * @param list the data's list, expected an Array
	 */
	var Save =  function(key, list) {	
		var valid = 
			list !== undefined && 
			null !== list && 
			uag.util.Type.isArray(list) && 
			list.length > 0 ;
		
		// build list json string  
		var listToString = '[';
		
		if (valid) {
		
			listToString += list[0].toString();
			
			for ( var int = 1 ; int < list.length ; int++ ) {
				listToString += "," + list[int].toString();
			}
		}
		
		listToString += ']';
		
		// save list in local storage for key  
		localStorage.setItem(key, listToString);
		
	}; 
	
	Storage.Save = Save;
	
	/** @description <b>Delete method</b>, delete data from local storage 
	 * @memberOf uag.data.Storage
	 * @static
	 * @param key the local storage key
	 */
	var Delete = function(key) {
		// remove item for key from local storage  
		localStorage.removeItem(key);
	};
	
	Storage.Delete = Delete;
	
	
	parent.data = parent.data || {};
	parent.data.Storage = Storage;
	
	return parent;
	
}(uag || {}));



// workers object declaration scope
//uag.data = (function (data) {
uag = (function (parent) {
	"use strict";
	
	/** 
	 * @memberOf uag.data
	 * @class Workers
	 * */
	var Workers = function(){};
	
	// fields object public, static, non-privileged methods  
	
	/** @description <b>getLocalStorageKey method</b>, workers local storage key getter 
	 * @memberOf uag.data.Workers
	 * @static
	 * @returns {String} key 
	 */
	var getLocalStorageKey = function() { return "workers"; };
	
	Workers.getLocalStorageKey = getLocalStorageKey;
	
	/** @description <b>getAll method</b>, fetch all workers method
	 * @memberOf uag.data.Workers
	 * @static
	 * @returns {Array} workers list
	 */
	var getAll = function() {
		// get workers json string list 
		var list = uag.data.Storage.Retrieve(Workers.getLocalStorageKey());
		
		// build worker object list 
		var currentWorkers = [];
		for ( var int = 0; int < list.length; int++) {
			currentWorkers.push(
					new uag.data.model.Worker(list[int]));
		}
		return currentWorkers;
	};
	
	Workers.getAll = getAll;
	
	/** @description <b>findById method</b>, find a worker method 
	 * @memberOf uag.data.Workers
	 * @static 
	 * @param workerId The worker's Id  
	 * @returns {Object} a worker 
	 */
	var findById = function(workerId) {
		// get current workers list  
		var currentWorkers = Workers.getAll();
		
		// find worker 
		for ( var int = 0; int < currentWorkers.length; int++) {
			// if worker'id match,  
			if (currentWorkers[int].getId() === workerId) {
				// then return this worker 
				return currentWorkers[int];
			}
		}
		return null;
	};
	
	Workers.findById = findById;
	
	/** @description <b>add method</b>, add a worker to workers list method
	 * @memberOf uag.data.Workers
	 * @static
	 * @param name worker's name 
	 * @param producersId roducer's id array 
	 * @returns {String} new worker's Id
	 */
	var addWorker = function(name, producersId) {
		// input validation 
		//TODO : name input validation
		
		// producersId input validation
		if (undefined === producersId || 
				null === producersId || 
				!uag.util.Type.isArray(producersId)) {
			producersId = [];
		}
		
		// delete old worker 
		uag.data.Workers.clear();
		
		// create new worker 
		// read from phonegap/cordova device  
		var smartphoneId = "uuid";//device.uuid;
		// worker_id_ts_name_smartphoneId
		var id = "worker_id_" + Date.now() + "_" + name + "_" + smartphoneId;
		// create worker 
		var worker = 
			new uag.data.model.Worker(
				id,
				name, 
				smartphoneId, 
				[],
				producersId);
	
		// get current workers list (expect empty) 
		var currentWorkers = Workers.getAll();
		// add new worker to workers list 
		currentWorkers.push(worker);
		
		// save new workers list 
		uag.data.Storage.Save(Workers.getLocalStorageKey(), currentWorkers);
		
		return id;
	};
	
	Workers.addWorker = addWorker;
	
	/** @description <b>getContainers method</b>, fetch containers for a worker and a producer 
	 * @memberOf uag.data.Workers
	 * @static
	 * @returns {Array} containers list 
	 */
	var getContainers = function() {
		// get Setup data 
		var setup = uag.data.Setup.get();
		// get worker 
		var worker = uag.data.Workers.findById(setup.workerId);
		// containers list  
		var currentContainers = [];
		// filter container
		for ( var int = 0 ; int < worker.containers.length ; int++ ) {
			// if producer's container , 
			if (worker.containers[int].getProducerId() === setup.producerId) {
				// then add it
				currentContainers.push(
						new uag.data.model.Container(worker.containers[int]));
			}
		}
		return currentContainers;
	};
	
	Workers.getContainers = getContainers;
	
	/** @description <b>findContainerById method</b>, find a container for a worker and a producer 
	 * @memberOf uag.data.Workers
	 * @static
	 * @param containerId container's id 
	 * @returns {String} container's id 
	 */
	var findContainerById = function(containerId) {
		workerId = producerId = containerId = 0;
	};
	
	Worker.findContainerById = findContainerById;
	
	/** @description <b>addContainer method</b>, create new container for a worker and a producer 
	 * @memberOf uag.data.Workers
	 * @static
	 * @param weight harvest weight 
	 * @param qualityId harvest quality's id
	 * @param fieldId harvest field's id 
	 * @param productId harvest product's id 
	 * @returns {String} container's id 
	 */
	var addContainer = function(weight, qualityId, fieldId, productId) {
		
		// TODO : input validation 
		
		
		var id = "container_id_1";
		var ts = Date.now();
		
		var container = 
			new uag.data.model.Container(
					id, 
					weight, 
					ts,
					qualityId,
					//workerId,
					//producerId,
					fieldId,
					productId);
		
	};
	
	Worker.addContainer = addContainer;
	
	/** @description <b>removeContainer method</b>, remove a container for a worker and a producer 
	 * @memberOf uag.data.Workers
	 * @static
	 * @param workerId worker's id
	 * @param producerId producer's id 
	 * @param containerId container's id 
	 */
	var removeContainer = function(containerId) {
		workerId = producerId = containerId = 0;
	};
	
	Worker.removeContainer = removeContainer;
	
	/** @description <b>remove method</b>, remove a worker from workers list method 
	 * @memberOf uag.data.Workers
	 * @static 
	 * @param workerId worker's id
	 */
	var remove = function(workerId) {
		// get current workers list  
		var currentWorkers = Workers.getAll();
		// update workers list 
		var updatedWorkers = [];
		for ( var int = 0 ; int < currentWorkers.length ; int++ ) {
			if (currentWorkers[int].getId() !== workerId) {
				updatedWorkers.push(currentWorkers[int]);
			}
			// so else remove implicitly worker for id 
		}
		// save updated workers list  
		uag.data.Storage.Save(Workers.getLocalStorageKey(), updatedWorkers);
	};
	
	Workers.remove = remove; 
	
	/** @description <b>clear method</b>, clear workers list 
	 * @memberOf uag.data.Workers
	 * @static 
	 */
	var clear = function() {
		// clear 
		uag.data.Storage.Delete(Workers.getLocalStorageKey());
	};
	
	Workers.clear = clear;
	
	
	parent.data = parent.data || {};
	parent.data.Workers = Workers;
	
	return parent;
	
}(uag || {}));



// producers object declaration scope
//uag.data = (function (data) {
uag = (function (parent) {
	"use strict";

	/** 
	 * @class Producers
	 * @memberOf uag.data
	 * */
	var Producers = function(){};
	
	// fields object public, static, non-privileged methods  
	
	/** @description <b>getLocalStorageKey method</b>, producers local storage key getter method
	 * @memberOf uag.data.Producers
	 * @static
	 * @returns {String} key 
	 */
	var getLocalStorageKey = function() { return "producers"; };
	
	Producers.getLocalStorageKey = getLocalStorageKey;
	
	/** @description <b>getAll method</b>, fetch all producers 
	 * @memberOf uag.data.Producers
	 * @static
	 * @returns {Array} producers list 
	 */
	var getAll = function() {
		// get producer's list 
		var list = uag.data.Storage.Retrieve(Producers.getLocalStorageKey());
		// build producer object list
		var currentProducers = [];
		// all producers 
		for ( var int = 0 ; int < list.length ; int++ ) {
			// add to list 
			currentProducers.push(
					new uag.data.model.Producer(list[int]));
		}
		return currentProducers;
	};
	
	Producers.getAll = getAll;
	
	/** @description <b>findById method</b>, find current setup producer 
	 * @memberOf uag.data.Producers
	 * @static 
	 * @returns {JSON} producer json local storage data 
	 */
	var findById = function() {
		// setup 
		var setup = uag.data.Setup.get();
		// get producer's list 
		var list = uag.data.Storage.Retrieve(Producers.getLocalStorageKey());
		// filter producers 
		for ( var int = 0; int < list.length; int++) {
			// if ids match, 
			if (setup.producerId === list[int].id) {
				// then return it
				return list[int];
			}
		}
		return null;
	};
	
	Producers.findById = findById;
	
	/** @description <b>getFields method</b>, fetch fields (for current setup producer)
	 * @memberOf uag.data.Producers
	 * @static
	 * @returns {JSON} fields list 
	 */
	var getFields = function() {
		// get producer 
		var producer = uag.data.Producers.findById();
		// get fields 
		var fields = [];
		for ( var int = 0; int < producer.fields.length; int++) {
			fields.push(producer.fields[int]);
			//fields.push(new uag.data.model.Field(producer.fields[int]));
		}
		return fields;
	};
	
	Producers.getFields = getFields;
	
	/** @description <b>findFieldById method</b>, find a field (for current setup producer) 
	 * @memberOf uag.data.Producers
	 * @static 
	 * @param fieldId field's id
	 * @returns {JSON} field  
	 */
	var findFieldById = function(fieldId) {
		// get producer's fields
		var fields = uag.data.Producers.getFields();
		// filter fields
		for ( var int = 0; int < fields.length; int++) {
			// if ids match 
			if (fields[int].id === fieldId) {
				return fields[int];
			}
		}
		return null;
	};
	
	Producers.findFieldById = findFieldById;
	
	/** @description <b>getProducts method</b>, fetch products (for current setup producer) 
	 * @memberOf uag.data.Producers
	 * @static
	 * @return {JSON} producer's products list
	 */
	var getProducts = function() {
		// get producer 
		var producer = uag.data.Producers.findById();
		// returns products
		return producer.products;
	};
	
	Producers.getProducts = getProducts;
	
	/** @description <b>getProductsForField method</b>, fetch products for a field (and current setup producer) 
	 * @memberOf uag.data.Producers
	 * @static
	 * @param fieldId field's id
	 * @returns {Array} products list
	 */
	var getProductsForField = function(fieldId) {
		// get products
		var products = uag.data.Producers.getProducts();
		// get field 
		var field = uag.data.Producers.findFieldById(fieldId);
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
	};
	
	Producers.getProductsForField = getProductsForField;
	
	/** @description <b>findProductsByIdForField method</b>, find product for a field (and current setup producer) 
	 * @memberOf uag.data.Producers
	 * @static
	 * @param fieldId field's id
	 * @param productId product's id
	 * @returns {Object} product  
	 */
	var findProductsByIdForField = function(fieldId, productId) {
		// get products 
		var products = Producers.getProductsForField(fieldId);
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
	
	Producers.findProductsByIdForField = findProductsByIdForField;
	
	/** @description <b>getQualities method</b>, fetch producer's qualities list 
	 * @memberOf uag.data.Producers
	 * @static
	 * @returns {Array} quality objects list
	 */
	var getQualities = function() {
		// setup 
		var setup = uag.data.Setup.get();
		// get producer 
		var producer = uag.data.Producers.findById(setup.producerId);
		// 
		var qualities = [];
		for ( var int = 0; int < producer.qualities.length; int++) {
			qualities.push(
					new uag.data.model.Quality(producer.qualities[int]));
			
		}
		return qualities;
	};
	
	Producers.getQualities = getQualities;
	
	/** @description <b>remove method</b>, remove a producer 
	 * @memberOf uag.data.Producers
	 * @static
	 * @param producerId producer's id
	 */
	var remove = function(producerId) {
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
		uag.data.Storage.Save(Producers.getLocalStorageKey(), updatedProducers);
	};
	
	Producers.remove = remove;
	
	/** @description <b>clear method</b>, clear all producers 
	 * @memberOf uag.data.Producers
	 * @static
	 * @param producerId producer's id
	 */
	var clear = function() {
		// delete producer key 
		uag.data.Storage.Delete(Producers.getLocalStorageKey());
	};
	
	Producers.clear = clear;
	
	
	parent.data = parent.data || {};
	parent.data.Producers = Producers;
	
	return parent;
	
}(uag || {}));



// setup object declaration scope
//uag.data = (function (data) {
uag = (function (parent) {
	"use strict";
	
	/**
	 * @class Setup
	 * @memberOf uag.data
	 */
	var Setup = function(){};
	
	// fields object public, static, non-privileged methods  
	
	/** @description <b>getLocalStorageKey method</b>, 
	 * @memberOf uag.data.Setup
	 * @static
	 * @returns {String} setup local storage key 
	 */
	var getLocalStorageKey = function() { return "setup"; };
	
	Setup.getLocalStorageKey = getLocalStorageKey;
	
	/** @description <b>get method</b>, 
	 * @memberOf uag.data.Setup
	 * @static
	 * @returns {JSON}
	 */
	var get = function() {
		return JSON.parse(localStorage.getItem(Setup.getLocalStorageKey()));
	};
	
	Setup.get = get;
	
	/** @description <b>set method</b>, 
	 * @memberOf uag.data.Setup
	 * @static
	 * @param data json 
	 */
	var set = function(data) {
		localStorage.setItem(Setup.getLocalStorageKey() , JSON.stringify(data));
	};
	
	Setup.set = set;
	
	
	parent.data = parent.data || {};
	parent.data.Setup = Setup;
	
	return parent;
	
}(uag || {}));



// import object declaration scope
//uag.data = (function (data) {
uag = (function (parent) {
	"use strict";

	/**
	 * @class Import
	 * @memberOf uag.data
	 */
	var Import = function(){};
	
	// fields object public, static, non-privileged methods  
	/** @description <b>addProducer method</b>, add a new producer to local storage  
	 * @memberOf uag.data.Import
	 * @static
	 * @param jsonStringProducerData producer string json data 
	 * @throws {Error} Invalid string JSON data
	 * @throws {Error} Producer already imported
	 * @returns {String} producer's id
	 */
	var addProducer = function(jsonStringProducerData) {
		
		var key = uag.data.Producers.getLocalStorageKey();
		
		var jsonProducerData = null;
		try {
			// validate json data 
			jsonProducerData = JSON.parse(jsonStringProducerData);
		} catch(e) {
			throw new Error("Invalid string JSON data");
		}
		
		// get producer's id 
		var producerId = jsonProducerData.id;
		// get producer
		var producer = uag.data.Producers.findById(producerId);
		// 
		var exist = 
			producer !== undefined && 
			null !== producer; 
		
		// if not exists already
		if (!exist) {
			// add it to producers list
			
			// json producers list 
			var producers = uag.data.Storage.Retrieve(key);
			
			// add json producer data to json producers list 
			producers.push(jsonProducerData);
			
			// set json producers list to local storage   
			localStorage.setItem(key, JSON.stringify(producers));
			
			// return producer's id
			return producerId;
			
		} else {
			throw new Error("Producer already imported");
		} 
		
	};
	
	Import.addProducer = addProducer;
	
	
	parent.data = parent.data || {};
	parent.data.Import = Import;
	
	return parent;
	
}(uag || {}));



// export object declaration scope
//uag.data = (function (data) {
uag = (function (parent) {
	"use strict";

	/**
	 * @class Export
	 * @memberOf uag.data
	 */
	var Export = function(){};
	
	// fields object public, static, non-privileged methods  
	/** @description <b>get method</b>, 
	 * @memberOf uag.data.Export
	 * @static
	 * 
	 */
	var get = function() {
		
	};
	
	Export.get = get;
	
	
	parent.data = parent.data || {};
	parent.data.Export = Export;
	
	return parent;
	
}(uag || {}));


/**
//containers object declaration scope   
(function() {
	
	var Containers = function(){};
	
	// cratesData object public, static, non-privileged methods  
	Containers.getAll = function(){
		
		// accès au key store 
		// récupération des données 
		// transformation en objet  
		
		var containersData =
		[
		{
			crate_id:"crate_1",
			weight:"2,1",
			ts:"22/07/2012",
			producer_id:"producer_",
			worker_id:"worker_",
			product:{product_id:"product_1",name:"veget 1"}, 
			field:{field_id:"field_1",name:"field 1"},
			quality:{quality_id:"quality_3",label:"good"}
		}, 
		{
			crate_id:"crate_2",
			weight:"1,9",
			ts:"21/07/2012",
			producer_id:"producer_",
			worker_id:"worker_",
			product:{product_id:"product_2",name:"veget 2"}, 
			field:{field_id:"field_1",name:"field 1"},
			quality:{quality_id:"quality_1",label:"bad"}
		},
		{
			crate_id:"crate_3",
			weight:"1,8",
			ts:"19/07/2012",
			producer_id:"producer_",
			worker_id:"worker_",
			product:{product_id:"product_3",name:"veget 3"}, 
			field:{field_id:"field_1",name:"field 1"},
			quality:{quality_id:"quality_4",label:"excellent"}
		},
		{
			crate_id:"crate_4",
			weight:"2,2",
			ts:"20/07/2012",
			producer_id:"producer_",
			worker_id:"worker_",
			product:{product_id:"product_4",name:"veget 4"}, 
			field:{field_id:"field_2",name:"field 2"},
			quality:{quality_id:"quality_2",label:"poor"}
		}
		];
		
		return containersData;
		
	};
	
	Containers.findById = function(containerId) {
		
	};
	
	Containers.add = function(container) {
		
	};
	
	// uag.data.containers object definition association    
	uag.data.Containers = Containers;
	
}());
*/
/*
//products object declaration scope    
(function(){
	
	var Products = function(){};
	
	/// products object public, static, non-privileged methods  
	Products.get = function() {
		var datas = [
			{product_id:"product_1",name:"veget 1",fields:[]}, 
			{product_id:"product_2",name:"veget 2",fields:[]}, 
			{product_id:"product_3",name:"veget 3",fields:[]}, 
			{product_id:"product_4",name:"veget 4",fields:[]}, 
			{product_id:"product_5",name:"veget 5",fields:[]}, 
			{product_id:"product_6",name:"veget 6",fields:[]} ];
		return datas;
	};
	
	// uag.data.products object definition association    
	uag.data.Products = Products;
	
}());
*/
/*
//qualities object declaration scope   
(function(){
	
	var qualities = function(){};
	
	// qualities object public, static, non-privileged methods  
	qualities.get = function() {
		var datas = [
			{quality_id:"quality_1",label:"bad"}, 
			{quality_id:"quality_2",label:"poor"}, 
			{quality_id:"quality_3",label:"good"}, 
			{quality_id:"quality_4",label:"excellent"} ];
		return datas;
	};
	
	// uag.data.qualities object definition association    
	uag.data.qualities = qualities;
	
}());
*/
/*
//fields object declaration scope   
(function(){
	
	var Fields = function(){};
	
	// fields object public, static, non-privileged methods  
	Fields.getAll = function() {
		var fieldsData = [
			{field_id:"field_1",name:"field 1",products:[]},
			{field_id:"field_2",name:"field 2",products:[]},
			{field_id:"field_3",name:"field 3",products:[]},
			{field_id:"field_4",name:"field 4",products:[]} ];
		return fieldsData;
	};
	
	Fields.findById = function(fieldId) {
		
	};
	
	Fields.add = function(field) {
		
	};
	
	// uag.data.field object definition association    
	uag.data.Fields = Fields;
	
}());
*/
/*
//positions object declaration scope   
(function(){
	
	var Positions = function(){};
	
	// fields object public, static, non-privileged methods  
	Positions.getAll = function() {
		var positionsData = [];
		return positionsData;
	};
	
	Positions.findById = function(containerId) {
		
	};
	
	Positions.add = function(container) {
		
	};
	
	// uag.data.positions object definition association    
	uag.data.Positions = Positions;
	
}());
*/
