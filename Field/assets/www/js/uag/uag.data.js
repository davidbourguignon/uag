/**@fileOverview uag data logic   
 * @author Sébastien Vivier, NSY209, CNAM  
 * @version Copyright (c) 2012
 * */

// Holds data functionality 
uag.data = uag.data || {};
//console.log('uag data (in uag.data.js) : ' + uag.data);


// storage object declaration scope 
//(function() {
	
	/**
	 * @class Storage
	 */
	var Storage = function() {};
	
	/** @description <b>Retrieve methods</b>, get data from local storage
	 * @static
	 * @param key the local storage key 
	 * @returns {Array} json object list 
	 */
	Storage.Retrieve = function(key) {
		
		// get list from local storage 
		var list = JSON.parse(localStorage.getItem(key));

		var valid = 
			undefined !== list &&
			null !== list &&
			uag.util.Type.isArray(list);
		
		if (valid) {
			return list;
		} else {
			return new Array();
		}

	};
	
	/** @description <b>Save method</b>, set data to the local storage 
	 * @static
	 * @param key the local storage key
	 * @param list the data's list, expected an Array
	 */
	Storage.Save =  function(key, list) {
		
		var valid = 
			undefined !== list && 
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
	
	/** @description <b>Delete method</b>, delete data from local storage 
	 * @static
	 * @param key the local storage key
	 */
	Storage.Delete = function(key) {
		// remove item for key from local storage  
		localStorage.removeItem(key);
	};
	
	// uag.data.storage object definition association    
	uag.data.Storage = Storage;
	
//}());


//workers object declaration scope   
//(function(){
	
	/** @class Workers
	 * */
	var Workers = function(){};
	
	// fields object public, static, non-privileged methods  
	
	/** @description <b>getLocalStorageKey method</b>, workers local storage key getter 
	 * @static
	 * @returns {String} key 
	 */
	Workers.getLocalStorageKey = function() { return "workers"; };
	
	/** @description <b>getAll method</b>, fetch all workers method
	 * @static
	 * @returns {Array} workers list
	 */
	Workers.getAll = function() {
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
	
	/** @description <b>findById method</b>, find a worker method 
	 * @static 
	 * @param workerId The worker's Id  
	 * @returns {Object} a worker 
	 */
	Workers.findById = function(workerId) {
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
	
	/** @description <b>add method</b>, add a worker to workers list method
	 * @static
	 * @param name worker's name 
	 * @returns {String} new worker's Id
	 */
	Workers.add = function(name) {
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
				new Array(),
				new Array());
		// get current workers list  
		var currentWorkers = Workers.getAll();
		// add new worker to workers list 
		currentWorkers.push(worker);
		// save new workers list 
		uag.data.Storage.Save(Workers.getLocalStorageKey(), currentWorkers);
		
		return id;
	};
	
	/** @description <b>getContainers method</b>, fetch containers for a worker and a producer 
	 * @static
	 * @param workerId worker's id
	 * @param producerId producer's id 
	 * @returns {Array} containers list 
	 */
	Workers.getContainers = function(workerId, producerId) {
		// get worker 
		var worker = uag.data.Workers.findById(workerId);
		// containers list  
		var currentContainers = new Array();
		// filter container
		for ( var int = 0 ; int < worker.containers.length ; int++ ) {
			// if producer's container , 
			if (worker.containers[int].getProducerId() === producerId) {
				// then add it
				currentContainers.push(
						new uag.data.model.Container(worker.containers[int]));
			}
		}
		return currentContainers;
	};
	
	/** @description <b>findContainerById method</b>, find a container for a worker and a producer 
	 * @static
	 * @param workerId worker's id
	 * @param producerId producer's id 
	 * @param containerId container's id 
	 * @returns {String} container's id 
	 */
	Worker.findContainerById = function(workerId, producerId, containerId) {
		
	};
	
	/** @description <b>addContainer method</b>, create new container for a worker and a producer 
	 * @static
	 * @param workerId worker's id
	 * @param producerId producer's id 
	 * @returns {String} container's id 
	 */
	Worker.addContainer = function(workerId, producerId) {
		
	};
	
	/** @description <b>removeContainer method</b>, remove a container for a worker and a producer 
	 * @static
	 * @param workerId worker's id
	 * @param producerId producer's id 
	 * @param containerId container's id 
	 */
	Worker.removeContainer = function(workerId, producerId, containerId) {
		
	};
	
	/** @description <b>remove method</b>, remove a worker from workers list method 
	 * @static 
	 * @param workerId worker's id
	 */
	Workers.remove = function(workerId) {
		// get current workers list  
		var currentWorkers = Workers.getAll();
		// update workers list 
		var updatedWorkers = [];
		for ( var int = 0 ; int < currentWorkers.length ; int++ ) {
			if (currentWorkers[int].getId() != workerId) {
				updatedWorkers.push(currentWorkers[int]);
			}
			// so else remove implicitly worker for id 
		}
		// save updated workers list  
		uag.data.Storage.Save(Workers.getLocalStorageKey(), updatedWorkers);
	}
	
	/** @description <b>clear method</b>, clear workers list 
	 * @static 
	 */
	Workers.clear = function() {
		// clear 
		uag.data.Storage.Delete(Workers.getLocalStorageKey());
	};
		
	// uag.data.workers object definition association    
	uag.data.Workers = Workers;
	
//}());


//producers object declaration scope   
//(function(){
	
	/** @class Producers
	 * */
	var Producers = function(){};
	
	// fields object public, static, non-privileged methods  
	
	/** @description <b>getLocalStorageKey method</b>, producers local storage key getter method
	 * @static
	 * @returns {String} key 
	 */
	Producers.getLocalStorageKey = function() { return "producers"; };
	
	/** @description <b>getAll method</b>, fetch all producers, 
	 * eventually for a particular worker   
	 * @static
	 * @param workerId worker's id
	 * @returns {Array} producers list 
	 */
	Producers.getAll = function(workerId) {
		// get producer's list 
		var list = uag.data.Storage.Retrieve(Producers.getLocalStorageKey());
		// build producer object list
		var currentProducers = [];
		// if workerId
		if (undefined !== workerId && null !== workerId) {
			// then producers for worker
			var worker = uag.data.Workers.findById(workerId);
			if (null !== worker) {
				// filter producers 
				for ( var int = 0 ; int < list.length ; int++ ) {
					// if producer associate with worker, 
					if (-1 !== worker.getProducersId().indexOf(list[int].id)) {
						// then add id to list 
						currentProducers.push(
								new uag.data.model.Producer(list[int]));
					}
				}
			}
		} else {
			// all producers 
			for ( var int = 0 ; int < list.length ; int++ ) {
				// add to list 
				currentProducers.push(
						new uag.data.model.Producer(list[int]));
			}
		}
		return currentProducers;
	};
	
	/** @description <b>findById method</b>, find a producer with his id
	 * @static 
	 * @param producerId producer's Id  
	 * @param workerId worker's id
	 * @returns {Object} a producer 
	 */
	Producers.findById = function(producerId) {
		// get current Producers list  
		var currentProducers = Producers.getAll();
		// find worker 
		for ( var int = 0; int < currentProducers.length; int++) {
			// if ids match, 
			if (currentProducers[int].getId() === producerId) {
				// then return it 
				return currentProducers[int];
			}
		}
		return null;
	};
	
	/** @description <b>getFields method</b>, fetch fields 
	 * @static
	 * @param producerId producer's id
	 * @returns {Array} fields list 
	 */
	Producers.getFields = function(producerId) {
		// get producer 
		var producer = uag.data.Producers.findById(producerId);
		// 
		var fields = [];
		for ( var int = 0; int < producer.fields.length; int++) {
			fields.push(
					new uag.data.model.Field(producer.fields[int]));
			
		}
		return fields;
	};
	
	/** @description <b>findFieldById method</b>, find a field for a producer
	 * @static 
	 * @param producerId producer's id 
	 * @param fieldId field's id
	 * @returns {Object} field  
	 */
	Producers.findFieldById = function(producerId, fieldId) {
		// get producer's fields
		var fields = uag.data.Producer.getFields(producerId);
		// find field 
		for ( var int = 0; int < fields.length; int++) {
			// if ids match 
			if (fields[int].getId() === fieldId) {
				return fields[int];
			}
		}
	};
	
	/** @description <b>getProductsForField method</b>, fetch products for a field and a producer 
	 * @static
	 * @param producerId producer's id 
	 * @param fieldId field's id
	 * @returns {Array} products list
	 */
	Producers.getProductsForField = function(producerId, fieldId) {
		// get field 
		var field = uag.data.Producers.findFieldById(producerId, fieldId);
		// 
		var products = [];
		for ( var int = 0; int < field.products.length; int++) {
			products.push(
				new uag.data.model.Product(field.products[int]));
		}
		return products;
	};
	
	/** @description <b>findProductsByIdForField method</b>, find product for a field and a producer 
	 * @static
	 * @param producerId producer's id 
	 * @param fieldId field's id
	 * @param productId product's id
	 * @returns {Object} product  
	 */
	Producers.findProductsByIdForField = function(producerId, fieldId, productId) {
		// get products 
		var products = Producers.getProductsForField(producerId, fieldId);
		// find product 
		for ( var int = 0; int < products.length; int++) {
			// if ids match
			if (products[int].getId() === productId) {
				// then return it
				return products[int];
			}
		}
		return null;
	};
	
	/** @description <b>remove method</b>, remove a producer 
	 * @static
	 * @param producerId producer's id
	 */
	Producers.remove = function(producerId) {
		// get current producers list  
		var currentProducers = Producers.getAll();
		// update producers list 
		var updatedProducers = [];
		for ( var int = 0 ; int < currentProducers.length ; int++ ) {
			if (currentProducers[int].getId() != workerId) {
				updatedProducers.push(currentProducers[int]);
			}
			// so else remove implicitly worker for id 
		}
		// save updated workers list  
		uag.data.Storage.Save(Workers.getLocalStorageKey(), updatedProducers);
	};
		
	/** @description <b>clear method</b>, clear all producers 
	 * @static
	 * @param producerId producer's id
	 */
	Producers.clear = function() {
		// delete producer key 
		uag.data.Storage.Delete(Producers.getLocalStorageKey());
	};
	
	// uag.data.producers object definition association    
	uag.data.Producers = Producers;
	
//}());


//setup object declaration scope
//(function(){
	
	/**
	 * @class Setup
	 */
	var Setup = function(){};
	
	// fields object public, static, non-privileged methods  
	/** @description <b>get method</b>, 
	 * 
	 */
	Setup.get = function() {
		
	};
	
	/** @description <b>set method</b>, 
	 * 
	 */
	Setup.set = function() {
		
	};
	
	// uag.data.Setup object definition association    
	uag.data.Setup = Setup;
	
//}());


//import object declaration scope
//(function(){
	
	/**
	 * @class Import
	 */
	var Import = function(){};
	
	// fields object public, static, non-privileged methods  
	/** @description <b>set method</b>, 
	 * @static
	 * @param jsonStringData data
	 */
	Import.set = function(jsonStringData) {
		
		var key = uag.data.Producers.getLocalStorageKey();
		
		// validate json data 
		jsonData = JSON.parse(jsonStringData);
		
		// json producers list 
		var producers = uag.data.Storage.Retrieve(key);
		
		// add json producer data to json producers list 
		producers.push(jsonData);
		
		// set json producers list to local storage   
		localStorage.setItem(key, JSON.stringify(producers));
		
	};
	
	// uag.data.Import object definition association    
	uag.data.Import = Import;
	
//}());


//export object declaration scope 
//(function(){
	
	/**
	 * @class Export
	 */
	var Export = function(){};
	
	// fields object public, static, non-privileged methods  
	/** @description <b>get method</b>, 
	 * 
	 */
	Export.det = function() {
		
	};
	
	// uag.data.Export object definition association    
	uag.data.Export = Export;
	
//}());

/*
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
