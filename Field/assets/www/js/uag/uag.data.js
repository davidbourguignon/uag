/**@fileOverview uag data logic   
 * @author Sébastien Vivier, NSY209, CNAM  
 * @version Copyright (c) 2012
 * */

/** @namespace Holds data functionality 
 * */
uag.data = uag.data || {};
//console.log('uag data (in uag.data.js) : ' + uag.data);



// containers object declaration scope   
(function() {
	
	/** @class containers  
	 * */
	var containers = function(){};
	
	// cratesData object public, static, non-privileged methods  
	containers.getAll = function(){
		
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
	
	containers.findById = function(containerId) {
		
	};
	
	containers.add = function(container) {
		
	};
	
	// uag.data.containers object definition association    
	uag.data.containers = containers;
	
}());


// products object declaration scope    
(function(){
	
	/** @class products
	 * */
	var products = function(){};
	
	/// products object public, static, non-privileged methods  
	products.get = function() {
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
	uag.data.products = products;
	
}());


// qualities object declaration scope   
(function(){
	
	/** @class qualities
	 * */
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


//fields object declaration scope   
(function(){
	
	/** @class fields
	 * */
	var fields = function(){};
	
	// fields object public, static, non-privileged methods  
	fields.get = function() {
		var datas = [
			{field_id:"field_1",name:"field 1",products:[]},
			{field_id:"field_2",name:"field 2",products:[]},
			{field_id:"field_3",name:"field 3",products:[]},
			{field_id:"field_4",name:"field 4",products:[]} ];
		return datas;
	};
	
	// uag.data.field object definition association    
	uag.data.fields = fields;
	
}());


//positions object declaration scope   
(function(){
	
	/** @class positions
	 * */
	var positions = function(){};
	
	// fields object public, static, non-privileged methods  
	positions.getAll = function() {
		var positionsData = [];
		return positionsData;
	};
	
	positions.findById = function(containerId) {
		
	};
	
	positions.add = function(container) {
		
	};
	
	// uag.data.positions object definition association    
	uag.data.positions = positions;
	
}());


//workers object declaration scope   
(function(){
	
	/** @class workers
	 * */
	var workers = function(){};
	
	// fields object public, static, non-privileged methods  
	workers.getLocalStorageKey = function() { return "workers"; };
	
	workers.getAll = function() {
		
		// get current workers from local storage 
		var currentWorkers = JSON.parse(localStorage.getItem(workers.getLocalStorageKey()));

		// create worker  
		var workersData = [];
		if (null != currentWorkers && Array.isArray(currentWorkers)) {
			for ( var int = 0; int < currentWorkers.length; int++) {
				workersData.push(new uag.data.model.worker(currentWorkers[int]));
			}
		}
		return workersData;
	};
	
	workers.findById = function(workerId) {
		
		// get current workers from local storage 
		var currentWorkers = workers.getAll();
		
		// find worker  
		for ( var int = 0; int < currentWorkers.length; int++) {
			if (currentWorkers[int].getId() == workerId) {
				return currentWorkers[int];
			}
		}
		return null;
	};
	
	workers.add = function(name) {
		
		// read from phonegap/cordova device  
		var smartphoneId = "uuid";//device.uuid;
		
		// worker_id_ts_name_smartphoneId
		var id = "worker_id_" + Date.now() + "_" + name + "_" + smartphoneId;
		
		var worker = 
			new uag.data.model.worker(
				id,
				name, 
				smartphoneId, 
				new Array(),
				new Array());
		
		// get workers from local storage 
		var currentWorkers = workers.getAll();
		
		// add worker to workers 
		currentWorkers.push(worker);
		
		//alert(worker.toJSON());
		//alert(id + " " + name + " " + smartphoneId);
		//alert(currentWorkers.length + " " + JSON.stringify(worker) + " " +JSON.stringify(currentWorkers));
				
		// set workers in local storage 
		localStorage.setItem(workers.getLocalStorageKey(), JSON.stringify(currentWorkers));
		
		
	};
	
	workers.remove = function(workerId) {
		
		// get current workers from local storage 
		var currentWorkers = workers.getAll();
		
		// remove workers 
		var updatedWorkers = [];
		for ( var worker in currentWorkers) {
			if (worker.id != workerId) {
				updatedWorkers.push(worker);
			}
		}
		
		// set updated workers in local storage 
		localStorage.setItem(workers.getLocalStorageKey(), JSON.stringify(updatedWorkers));
		
	}
	
	workers.clear = function() {
		// clear local storage content
		localStorage.removeItem(workers.getLocalStorageKey());
	};
	
	// uag.data.workers object definition association    
	uag.data.workers = workers;
	
}());


//producers object declaration scope   
(function(){
	
	/** @class producers
	 * */
	var producers = function(){};
	
	// fields object public, static, non-privileged methods  
	producers.getAll = function() {
		var producersData = [];
		return producersData;
	};
	
	producers.findById = function(producerId) {
		
	};
	
	producers.add = function(producer) {
		
	};
	
	// uag.data.producers object definition association    
	uag.data.producers = producers;
	
}());
