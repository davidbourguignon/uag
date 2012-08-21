/**@fileOverview uag data model logic   
 * @author Sébastien Vivier, NSY209, CNAM  
 * @version Copyright (c) 2012
 * */

// @namespace Holds data model functionality 
uag.data.model = uag.data.model || {};
//console.log('uag data model  (in uag.data.model.js) : ' + uag.data.model);


//position object declaration scope   
//(function(){
	
	/**
	 * <p>2 constructor usage with 1 or 4 arguments :  
	 * <ul><li>args1 
	 * 	{String} id or <br/>
	 * 	JSON { "id":"position_id_","latitude":#,"longitude":#,"altitude":# }</li>
	 * <li>args2 {Number} latitude </li>
	 * <li>args3 {Number} longitude </li>
	 * <li>args4 {Number} altitude </li></ul></p> 
	 * @class Position  
	 */
	var Position = function() {
		
		// fields (private attributes)
		var _id = null;
		var _latitude = null;
		var _longitude = null;
		var _altitude = null;

		// initialization 
		try {
			
			var isValidJSON = 
				null !== arguments && 
				1 === arguments.length && 
				null !== arguments[0] && 
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isObject(arguments[0]) && 
				uag.util.Type.isString(arguments[0].id) &&
				uag.util.Type.isNumber(arguments[0].latitude) &&
				uag.util.Type.isNumber(arguments[0].longitude) &&
				uag.util.Type.isNumber(arguments[0].altitude);
			
			var isValidArgumentArray =  
				null !== arguments && 
				4 === arguments.length &&
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isString(arguments[0]) &&
				uag.util.Type.isNumber(arguments[1]) &&
				uag.util.Type.isNumber(arguments[2]) &&
				uag.util.Type.isNumber(arguments[3]);
			
			
			if (isValidJSON) {
				// 1 json arguments    
				_id = arguments[0].id;
				_latitude = arguments[0].latitude;
				_longitude = arguments[0].longitude;
				_altitude = arguments[0].altitude;
			} else if (isValidArgumentArray) {
				// arguments array 
				_id  = arguments[0];
				_latitude = arguments[1];
				_longitude = arguments[2];
				_altitude = arguments[3];
			} 
			
			if (!isValidJSON && !isValidArgumentArray) {
				throw new Error('position expected 1 or 4 arguments !!');
			}
		} catch(e) {
			throw new Error('bad arguments exception : ' + e.message);
		}
		
		// (read only public) properties (privileged  methods) 
		/**
		 * position identifier 
		 * @type String
		 */
		this.getId = function() { return _id; };
		/**
		 * position latitude getter   
		 * @type Number
		 */
		this.getLatitude = function() { return _latitude; };
		/**
		 * position longitude getter   
		 * @type Number
		 */
		this.getLongitude = function() { return _longitude; };
		/**
		 * position altitude getter   
		 * @type Number
		 */
		this.getAltitude = function() { return _altitude; };
		
	};

	// position object publics, non-privileged methods  
	Position.prototype = {
		
		/** @description <b>toString method</b>
		 * @returns {String} 
		 */
		toString : function() {
			var positionToString = 
				'{"id":"' + this.getId() + 
				'","latitude":"' + this.getLatitude() + 
				'","longitude":"' + this.getLongitude() + 
				'","altitude":"' + this.getAltitude() + '" }';
			return positionToString;
		}
	
	};

	// uag.data.model.position object definition association    
	uag.data.model.Position = Position;
	
//}());


// field object declaration scope   
//(function(){
	
	/**
	 * <p>2 constructor usage with 1 or 6 arguments :  
	 * <ul><li>args1 
	 * 	{String} id or <br/> 
	 * 	JSON {
	 * 		"id":"field_id_",
	 * 		"name":"fieldName",
	 * 		"description":"fieldDescription",
	 * 		"positionId":"position_id_",
	 * 		"productsId":["product_id_","product_id_","product_id_"],
	 * 		"producerId":"procucer_id_"}</li>
	 * <li>args2 {String} name</li>
	 * <li>args3 {String} description</li>
	 * <li>args4 {String} position identifier</li>
	 * <li>args5 {Array} products identifier</li>
	 * <li>args5 {String} producer identifier</li>
	 * @class Field  
	 */
	var Field = function () {
		
		// fields (private attributes)
		var _id = null;
		var _name = null;
		var _description = null;
		var _positionId = null;
		var _productsId = null;
		var _producerId = null;
		
		// initialization
		try {
			
			var isValidJSON = 
				null !== arguments && 
				1 === arguments.length && 
				null !== arguments[0] && 
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isObject(arguments[0]) && 
				uag.util.Type.isString(arguments[0].id) &&
				uag.util.Type.isString(arguments[0].name) &&
				uag.util.Type.isString(arguments[0].description) &&
				uag.util.Type.isString(arguments[0].positionId) &&
				uag.util.Type.isArray(arguments[0].productsId) && 
				uag.util.Type.isString(arguments[0].producerId);
			
			var isValidArgumentArray =  
				null !== arguments && 
				6 === arguments.length &&
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isString(arguments[0]) &&
				uag.util.Type.isString(arguments[1]) &&
				uag.util.Type.isString(arguments[2]) &&
				uag.util.Type.isString(arguments[3]) &&
				uag.util.Type.isArray(arguments[4]) &&
				uag.util.Type.isString(arguments[5]);
			
			if (isValidJSON) {
				// JSON argument 
				_id = arguments[0].id;
				_name = arguments[0].name;
				_description = arguments[0].description;
				_positionId = arguments[0].positionId;
				_productsId = arguments[0].productsId;
				_producerId = arguments[0].producerId;
			} else if (isValidArgumentArray) {
				// arguments array   
				_id = arguments[0];
				_name = arguments[1];
				_description = arguments[2];
				_positionId = arguments[3];
				_productsId = arguments[4];
				_producerId = arguments[5];
			} else {
				throw new Error('field expected 1 or 6 arguments !!');
			}
		} catch(e) {
			throw new Error('bad arguments exception : ' + e.message);
		}
		
		// privileged  methods (read only public properties)
		/**
		 * field identifier 
		 * @type String
		 */
		this.getId = function() { return _id; };
		/**
		 * field name
		 * @type String
		 */
		this.getName = function() { return _name; };
		/**
		 * field description
		 * @type String
		 */
		this.getDescription = function() { return _description; };
		/**
		 * field position identifier
		 * @type String
		 */
		this.getPositionId = function() { return _positionId; };
		/**
		 * field products id list
		 * @type Array
		 */
		this.getProductsId = function() { return _productsId; };
		/**
		 * field producer identifier 
		 * @type String
		 */
		this.getProducerId = function() { return _producerId; };
		
		// public properties  
		/**
		 * field position
		 * @type Object
		 */
		this.position = null;
		/**
		 * field products list
		 * @type Array
		 */
		this.products = new Array();
		/**
		 * field producer
		 * @type Object
		 */
		this.producer = null;
		
	};

	// field object publics, non-privileged methods  
	Field.prototype = {
			
		/** @description <b>toString method</b>
		 * @returns {String} 
		 */
		toString : function() {
			var fieldToString = 
				'{"id":"' + this.getId() + '",' + 
				'"name":"' + this.getName() +'",' + 
				'"description":"' + this.getDescription() + '",' +  
				'"positionId":"' + this.getPositionId() + '",' + 
				'"productsId":'+ JSON.stringify(this.getProductsId()) +',' +  
				'"producerId":"' + this.getProducerId() + '"}'; 
			return fieldToString;
		}
	
	};
		
	// uag.data.model.field object definition association    
	uag.data.model.Field = Field;
	
//}());


// producer object declaration scope   
//(function(){
	
	/**
	 * <p>2 constructor usage with 1 or 7 arguments :  
	 * <ul><li>args1 
	 * 	{String} id or <br/> 
	 * 	JSON {
			"id":"producer_id_", 
			"name":"producerName", 
			"smartphoneId":"smart_phone_id", 
			"farmName":"producerFarmName", 
			"websiteUrl":"http://www.domaine.ext", 
			"workersId":["worker_id_","worker_id_","worker_id_"], 
			"fieldsId":["field_id_","field_id_","field_id_"]}</li>
	 * <li>args2 {String} name</li>
	 * <li>args3 {String} smartphone identifier (uuid)</li>
	 * <li>args4 {String} farm name</li>
	 * <li>args5 {String} web site url</li>
	 * <li>args5 {Array} workers identifier</li>
	 * <li>args6 {Array} fields identifier</li>
	 * @class Producer  
	 */
	var Producer = function () {
		
		// fields (private attributes)
		var _id = null;
		var _name = null;
		var _smartphoneId = null;
		var _farmName = null;
		var _websiteUrl = null;
		var _workersId = null;
		var _fieldsId = null;
		var _productsId = null;
		
		// initialization
		try {
			
			var isValidJSON = 
				null !== arguments && 
				1 === arguments.length && 
				null !== arguments[0] && 
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isObject(arguments[0]) && 
				uag.util.Type.isString(arguments[0].id) &&
				uag.util.Type.isString(arguments[0].name) &&
				uag.util.Type.isString(arguments[0].smartphoneId) &&
				uag.util.Type.isString(arguments[0].farmName) &&
				uag.util.Type.isString(arguments[0].websiteUrl) &&
				uag.util.Type.isArray(arguments[0].workersId) &&
				uag.util.Type.isArray(arguments[0].productsId) &&
				uag.util.Type.isArray(arguments[0].fieldsId);
			
			var isValidArgumentArray =  
				null !== arguments && 
				8 === arguments.length &&
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isString(arguments[0]) &&
				uag.util.Type.isString(arguments[1]) &&
				uag.util.Type.isString(arguments[2]) &&
				uag.util.Type.isString(arguments[3]) &&
				uag.util.Type.isString(arguments[4]) &&
				uag.util.Type.isArray(arguments[5]) &&
				uag.util.Type.isArray(arguments[6]) &&
				uag.util.Type.isArray(arguments[7]);
			
			if (isValidJSON) {
				// 1 JSON argument
				_id = arguments[0].id;
				_name = arguments[0].name;
				_smartphoneId = arguments[0].smartphoneId;
				_farmName = arguments[0].farmName;
				_websiteUrl = arguments[0].websiteUrl;
				_workersId = arguments[0].workersId;
				_fieldsId = arguments[0].fieldsId;
				_productsId = arguments[0].productsId;
			} else if (isValidArgumentArray) {
				// arguments array   
				_id = arguments[0];
				_name = arguments[1];
				_smartphoneId = arguments[2];
				_farmName = arguments[3];
				_websiteUrl = arguments[4];
				_workersId = arguments[5];
				_fieldsId  = arguments[6];
				_productsId = arguments[7];
			} else {
				throw new Error('producer expected 1 or 8 arguments !!');
			}
		} catch(e) {
			throw new Error('bad arguments exception : ' + e.message);
		}
		
		// privileged  methods (read only public properties)
		/**
		 * producer identifier 
		 * @type String
		 */
		this.getId = function() { return _id; };
		/**
		 * producer name
		 * @type string
		 */
		this.getName = function() { return _name; };
		/**
		 * producer smartphone identifier 
		 * @type String
		 */
		this.getSmartphoneId = function() { return _smartphoneId; };
		/**
		 * producer farm name
		 * @type String
		 */
		this.getFarmName = function() { return _farmName; };
		/**
		 * producer web site url 
		 * @type String
		 */
		this.getWebsiteUrl = function() { return _websiteUrl; };
		/**
		 * producer workers identifier list
		 * @type Array
		 */
		this.getWorkersId = function() { return _workersId; };
		/**
		 * producer fields identifier list
		 * @type Array
		 */
		this.getFieldsId = function() { return _fieldsId; };
		/**
		 * producer products identifier list
		 * @type Array
		 */
		this.getProductsId = function() { return _productsId; };
		
		// public properties 
		/**
		 * producer workers list 
		 * @type Array
		 */
		this.workers = new Array();
		/**
		 * producer fields list
		 * @type Array
		 */
		this.fields = new Array();
		/**
		 * producer products list
		 * @type Array
		 */
		this.products = new Array();
		
	};

	// producer object publics, non-privileged methods  
	Producer.prototype = {
		
		/** @description <b>toString method</b>
		 * @returns {String} 
		 */
		toString : function() {
			var producerToString = 
				'{"id":"' + this.getId() + '",' +  
				'"name":"' + this.getName() + '",' + 
				'"smartphoneId":"' + this.getSmartphoneId() + '",' +  
				'"farmName":"' + this.getFarmName() + '",' +  
				'"websiteUrl":"' + this.getWebsiteUrl() + '",' + 
				'"workersId":' + JSON.stringify(this.getWorkersId()) + ',' + 
				'"fieldsId":' + JSON.stringify(this.getFieldsId()) + ',' +  
				'"productsId":' + JSON.stringify(this.getProductsId()) + '}';
			return producerToString;
		}
	
	};
		
	// uag.data.model.producer object definition association    
	uag.data.model.Producer = Producer;

//}());


// worker object declaration scope   
//(function(){
	
	/**
	 * @class Worker  
	 */
	var Worker = function () {
		
		// fields (private attributes)
		var _id = null;
		var _name = null;
		var _smartphoneId = null;
		var _containersId = null;
		var _producersId = null;
		
		// initialization
		try {
			
			var isValidJSON = 
				null !== arguments && 
				1 === arguments.length && 
				null !== arguments[0] && 
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isObject(arguments[0]) && 
				uag.util.Type.isString(arguments[0].id) &&
				uag.util.Type.isString(arguments[0].name) &&
				uag.util.Type.isString(arguments[0].smartphoneId) &&
				uag.util.Type.isArray(arguments[0].containersId) &&
				uag.util.Type.isArray(arguments[0].producersId);
			
			var isValidArgumentArray =  
				null !== arguments && 
				5 === arguments.length &&
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isString(arguments[0]) &&
				uag.util.Type.isString(arguments[1]) &&
				uag.util.Type.isString(arguments[2]) &&
				uag.util.Type.isArray(arguments[3]) &&
				uag.util.Type.isArray(arguments[4]);
			
			if (isValidJSON) {
				// 1 JSON argument
				_id = arguments[0].id;
				_name = arguments[0].name;
				_smartphoneId = arguments[0].smartphoneId;
				_containersId = arguments[0].containersId;
				_producersId = arguments[0].producersId;				
			} else if (isValidArgumentArray) {
				// arguments array
				_id = arguments[0];
				_name = arguments[1];
				_smartphoneId = arguments[2];
				_containersId = arguments[3];
				_producersId = arguments[4];
			} else {
				throw new Error('worker expected 1 or 5 arguments !!');
			}
		} catch(e) {
			throw new Error('bad arguments exception : ' + e.message);
		}
		
		// privileged  methods (read only public properties)
		/**
		 * worker identifier 
		 * @type String
		 */
		this.getId = function() { return _id; };
		/**
		 * worker name 
		 * @type String
		 */
		this.getName = function() { return _name; };
		/**
		 * worker smartphone identifier (uuid) 
		 * @type String
		 */
		this.getSmartphoneId = function() { return _smartphoneId; };
		/**
		 * worker containers identifier list
		 * @type Array
		 */
		this.getContainersId = function() { return _containersId; };
		/**
		 * worker producers identifier list
		 * @type Array
		 */
		this.getProducersId = function() { return _producersId; };
		
		// public properties
		/**
		 * worker containers list 
		 * @type Array
		 */
		this.containers = new Array();
		/**
		 * worker producers list 
		 * @type Array
		 */
		this.producers = new Array();
		
	};

	// worker object publics, non-privileged methods  
	Worker.prototype = {
			
		/** @description <b>toString method</b>
		 * @returns {String} 
		 */
		toString : function() {
			var workerToString = 
				'{"id":"' + this.getId() + '",' +
				'"name":"' + this.getName() + '",' +  
				'"smartphoneId":"' + this.getSmartphoneId() + '",' +  
				'"containersId":' + JSON.stringify(this.getContainersId()) + ',' +  
				'"producersId":' + JSON.stringify(this.getProducersId()) + '}';
			return workerToString;
		},
			
	};
		
	// uag.data.model.worker object definition association    
	uag.data.model.Worker = Worker;
	
//}());


// product object declaration scope   
//(function(){
	
	/**
	 * @class Product  
	 */
	var Product = function () {
		
		// fields (private attributes)
		var _id = null;
		var _name = null;
		var _description = null; 
		
		// initialization
		try {
			
			var isValidJSON = 
				null !== arguments && 
				1 === arguments.length && 
				null !== arguments[0] && 
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isObject(arguments[0]) && 
				uag.util.Type.isString(arguments[0].id) &&
				uag.util.Type.isString(arguments[0].name) &&
				uag.util.Type.isString(arguments[0].description);
			
			var isValidArgumentArray =  
				null !== arguments && 
				3 === arguments.length &&
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isString(arguments[0]) &&
				uag.util.Type.isString(arguments[1]) &&
				uag.util.Type.isString(arguments[2]);
			
			if (isValidJSON) {
				// JSON argument 
				_id = arguments[0].id;
				_name = arguments[0].name;
				_description = arguments[0].description;
			} else if (isValidArgumentArray) {
				// arguments array
				_id = arguments[0];
				_name = arguments[1];
				_description = arguments[2];
			} else {
				throw new Error('product expected 1 or 3 arguments !!');
			}
		} catch(e) {
			throw new Error('bad arguments exception : ' + e.message);
		}
		
		// privileged  methods (read only public properties)
		/**
		 * product identifier 
		 * @type String
		 */
		this.getId = function() { return _id; };
		/**
		 * product name
		 * @type String
		 */
		this.getName = function() { return _name; };
		/**
		 * product description
		 * @type String
		 */
		this.getDescription = function() { return _description; };
		
		// public properties
		
	};

	// product object publics, non-privileged methods  
	Product.prototype = {
			
		/** @description <b>toString method</b>
		 * @returns {String} 
		 */
		toString : function() {
			var producerToString = 
				'{"id":"' + this.getId() + '",' +  
				'"name":"' + this.getName() + '",' + 
				'"description":"' + this.getDescription() + '"}'; 
			return producerToString;
		}
			
	};
		
	// uag.data.model.product object definition association    
	uag.data.model.Product = Product;

//}());


//quality object declaration scope
//(function(){
	
	/**
	 * @class Quality 
	 */
	var Quality = function () {
		
		// fields (private attributes)
		/**
		 * @field
		 */
		var _id = null;
		/**
		 * @field
		 */
		var _name = null;
		/**
		 * @field
		 */
		var _description = null; 
		
		// initialization
		try {

			var isValidJSON = 
				null !== arguments && 
				1 === arguments.length && 
				null !== arguments[0] && 
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isObject(arguments[0]) && 
				uag.util.Type.isString(arguments[0].id) &&
				uag.util.Type.isString(arguments[0].name) &&
				uag.util.Type.isString(arguments[0].description);
			
			var isValidArgumentArray =  
				null !== arguments && 
				3 === arguments.length &&
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isString(arguments[0]) &&
				uag.util.Type.isString(arguments[1]) &&
				uag.util.Type.isString(arguments[2]);
			
			if (isValidJSON) {
				// JSON argument 
				_id = arguments[0].id;
				_name = arguments[0].name;
				_description = arguments[0].description;
			} else if (isValidArgumentArray) {
				// arguments array
				_id = arguments[0];
				_name = arguments[1];
				_description = arguments[2];
			} else {
				throw new Error('quality expected 1 or # arguments !!');
			}
		} catch(e) {
			throw new Error('bad arguments exception : ' + e.message);
		}
		
		// privileged methods (read only public properties)
		/**
		 * product identifier 
		 * @type String
		 */
		this.getId = function() { return _id; };
		/**
		 * product name
		 * @type String
		 */
		this.getName = function() { return _name; };
		/**
		 * product description
		 * @type String
		 */
		this.getDescription = function() { return _description; };

		// public properties
		
	};

	// container object publics, non-privileged methods  
	Quality.prototype = {
			
		/** @description <b>toString method</b>
		 * @returns {String} 
		 */
		toString : function() {
			var qualityToString = 
				'{"id":"' + this.getId() + '",' +  
				'"name":"' + this.getName() + '",' + 
				'"description":"' + this.getDescription() + '"}'; 
			return qualityToString;
		}
			
	};
		
	// uag.data.model.quality object definition association    
	uag.data.model.Quality = Quality;

//}());


// container object declaration scope
//(function(){
	
	/**
	 * @class Container 
	 */
	var Container = function () {
		
		// fields (private attributes)
		var _id = null;
		var _weight = null;
		var _ts = null;
		var _qualityId = null;
		var _workerId = null;
		var _producerId = null;
		var _fieldId = null;
		var _productId = null;
		// need producerId 
		
		
		// initialization
		try {
			
			var isValidJSON = 
				null !== arguments && 
				1 === arguments.length && 
				null !== arguments[0] && 
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isObject(arguments[0]) && 
				uag.util.Type.isString(arguments[0].id) &&
				uag.util.Type.isNumber(arguments[0].weight) &&
				uag.util.Type.isNumber(arguments[0].ts) &&
				uag.util.Type.isString(arguments[0].qualityId) &&
				uag.util.Type.isString(arguments[0].workerId) &&
				uag.util.Type.isString(arguments[0].producerId) &&
				uag.util.Type.isString(arguments[0].fieldId) &&
				uag.util.Type.isString(arguments[0].productId);
			
			var isValidArgumentArray =  
				null !== arguments && 
				8 === arguments.length &&
				uag.util.Type.isArguments(arguments) &&
				uag.util.Type.isString(arguments[0]) &&
				uag.util.Type.isNumber(arguments[1]) &&
				uag.util.Type.isNumber(arguments[2]) &&
				uag.util.Type.isString(arguments[3]) &&
				uag.util.Type.isString(arguments[4]) &&
				uag.util.Type.isString(arguments[5]) &&
				uag.util.Type.isString(arguments[6]) &&
				uag.util.Type.isString(arguments[7]);
			
			if (isValidJSON) {
				// JSON argument
				_id = arguments[0].id;
				_weight = arguments[0].weight;
				_ts = arguments[0].ts;
				_qualityId = arguments[0].qualityId;
				_workerId = arguments[0].workerId;
				_producerId = arguments[0].producerId;
				_fieldId = arguments[0].fieldId;
				_productId = arguments[0].productId;
			} else if (isValidArgumentArray) {
				// arguments array
				_id = arguments[0];
				_weight = arguments[1];
				_ts = arguments[2];
				_qualityId = arguments[3];
				_workerId = arguments[4];
				_producerId = arguments[5];
				_fieldId = arguments[6];
				_productId = arguments[7];			
			} else {
				throw new Error('container expected 1 or 8 arguments !!');
			}
			
		} catch(e) {
			throw new Error('bad arguments exception : ' + e.message);
		}
		
		// privileged methods (read only public properties)
		/**
		 * container identifier 
		 * @type String
		 */
		this.getId = function() { return _id; };
		/**
		 * container weight
		 * @type Number
		 */
		this.getWeight = function() { return _weight; };
		/**
		 * container timestamp
		 * @type Date
		 */
		this.getTs = function() { return _ts; };
		/**
		 * container quality's id 
		 * @type String
		 */
		this.getQualityId = function() { return _qualityId; };
		/**
		 * container worker's id
		 * @type String
		 */
		this.getWorkerId = function() { return _workerId; };
		/**
		 * container producer's id
		 * @type String
		 */
		this.getProducerId = function() { return _producerId; };
		/**
		 * container field's id
		 * @type String
		 */
		this.getFieldId = function() { return _fieldId; };
		/**
		 * container product's id
		 * @type String
		 */
		this.getProductId = function() { return _productId; };
		
		// public properties
		/**
		 * container quality
		 * @type Object
		 */
		this.quality = null;
		/**
		 * container worker 
		 * @type Object
		 */
		this.worker = null;
		/**
		 * container producer
		 * @type Object
		 */
		this.producer = null;
		/**
		 * container field
		 * @type Object
		 */
		this.field = null;
		/**
		 * container product
		 * @type Object
		 */
		this.product = null;
		
	};

	// container object publics, non-privileged methods  
	Container.prototype = {
			
		/** @description <b>toString method</b>
		 * @returns {String} 
		 */
		toString : function() {
			var containerToString = 
				'{"id":"' + this.getId() + '",' + 
				'"weight":' + this.getWeight() + ',' + 
				'"ts":' + this.getTs() + ',' + 
				'"qualityId":"' + this.getQualityId() + '",' + 
				'"workerId":"' + this.getWorkerId() + '",' + 
				'"producerId":"' + this.getProducerId() + '",' + 
				'"fieldId":"' + this.getFieldId() + '",' + 
				'"productId":"' + this.getProductId() + '"}'; 
			return containerToString;
		}
			
	};
		
	// uag.data.model.container object definition association    
	uag.data.model.Container = Container;

//}());
