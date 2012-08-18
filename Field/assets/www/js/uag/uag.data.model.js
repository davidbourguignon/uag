/**@fileOverview uag data model logic   
 * @author Sébastien Vivier, NSY209, CNAM  
 * @version Copyright (c) 2012
 * */

/** @namespace Holds data model functionality 
 * */
uag.data.model = uag.data.model || {};
//console.log('uag data model  (in uag.data.model.js) : ' + uag.data.model);


//position object declaration scope   
(function(){
	
	/**
	 * <p>2 constructor usage with 1 or 4 arguments :  
	 * <ul><li>args1 {String} id or JSON { "id":"position_id_#","latitude":#,"longitude":#,"altitude":# }</li>
	 * <li>args2 {number} latitude </li>
	 * <li>args3 {number} longitude </li>
	 * <li>args4 {number} altitude </li></ul></p> 
	 * @class position class 
	 */
	var position = function() {
		
		// fields (private attributes)
		/**
		 * @field
		 */
		var _id = null;
		/**
		 * @field
		 */
		var _latitude = null;
		/**
		 * @field
		 */
		var _longitude = null;
		/**
		 * @field
		 */
		var _altitude = null;

		// initialization 
		try {
			
			var isValidJSON = 
				null != arguments && 
				1 == arguments.length && 
				null != arguments[0] && 
				typeof(arguments[0]) == "object" && 
				typeof(arguments[0].id) == "string" &&
				typeof(arguments[0].latitude) == "number" &&
				typeof(arguments[0].longitude) == "number" &&
				typeof(arguments[0].altitude) == "number";
			
			var isValidArgumentArray =  
				null != arguments && 
				4 == arguments.length &&
				typeof(arguments[0]) == "string" &&
				typeof(arguments[1]) == "number" &&
				typeof(arguments[2]) == "number" &&
				typeof(arguments[3]) == "number";
			
			
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
		 * @type string
		 */
		this.getId = function() { return _id; };
		/**
		 * position latitude getter   
		 * @type number
		 */
		this.getLatitude = function() { return _latitude; };
		/**
		 * position longitude getter   
		 * @type number
		 */
		this.getLongitude = function() { return _longitude; };
		/**
		 * position altitude getter   
		 * @type number
		 */
		this.getAltitude = function() { return _altitude; };
		
	};

	// position object publics, non-privileged methods  
	position.prototype = {
		
		/** toString method
		 * @returns {String} 
		 */
		toString : function() {
			var positionToString = 
				'Latitude : ' + this.getLatitude() + ' ; ' + 
				'Longitude : ' + this.getLongitude() + ' ; ' + 
				'Altitude : ' + this.getAltitude() + ' ; ' ;
			return positionToString;
		}
	
	};

	// uag.data.model.position object definition association    
	uag.data.model.position = position;
	
}());


// field object declaration scope   
(function(){
	
	/**
	 * @class field class 
	 */
	var field = function () {
		
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
				null != arguments && 
				1 == arguments.length && 
				null != arguments[0] && 
				typeof(arguments[0]) == "object" && 
				typeof(arguments[0].id) == "string" &&
				typeof(arguments[0].name) == "string" &&
				typeof(arguments[0].description) == "string" &&
				typeof(arguments[0].positionId) == "string" &&
				typeof(arguments[0].productsId) == "object" &&
				typeof(arguments[0].producerId) == "string";
			
			var isValidArgumentArray =  
				null != arguments && 
				6 == arguments.length &&
				typeof(arguments[0]) == "string" &&
				typeof(arguments[1]) == "string" &&
				typeof(arguments[2]) == "string" &&
				typeof(arguments[3]) == "string" &&
				typeof(arguments[4]) == "object" &&
				typeof(arguments[5]) == "string";
			
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
		this.getId = function() { return _id; };
		this.getName = function() { return _name; };
		this.getDescription = function() { return _description; };
		this.getPositionId = function() { return _positionId; };
		this.getProductsId = function() { return _productsId; };
		this.getProducerId = function() { return _producerId; };
		
		// public properties  
		this.position = null;
		this.products = null;
		this.producer = null;
		
	};

	// field object publics, non-privileged methods  
	field.prototype = {
			
		/** toString method
		 * @returns {String} 
		 */
		toString : function() {
			var fieldStr = 'not imlemented'; 
			return fieldStr;
		}
	
	};
		
	// uag.data.model.field object definition association    
	uag.data.model.field = field;
	
}());


// producer object declaration scope   
(function(){
	
	/**
	 * @class producer class 
	 */
	var producer = function () {
		
		// fields (private attributes)
		var _id = null;
		var _name = null;
		var _smartphoneId = null;
		var _farmName = null;
		var _websiteUrl = null;
		var _workersId = null;
		var _fieldsId = null;
		
		// initialization
		try {
			
			var isValidJSON = 
				null != arguments && 
				1 == arguments.length && 
				null != arguments[0] && 
				typeof(arguments[0]) == "object" && 
				typeof(arguments[0].id) == "string" &&
				typeof(arguments[0].name) == "string" &&
				typeof(arguments[0].smartphoneId) == "string" &&
				typeof(arguments[0].farmName) == "string" &&
				typeof(arguments[0].websiteUrl) == "string" &&
				typeof(arguments[0].workersId) == "object" &&
				typeof(arguments[0].fieldsId) == "object";
			
			var isValidArgumentArray =  
				null != arguments && 
				7 == arguments.length &&
				typeof(arguments[0]) == "string" &&
				typeof(arguments[1]) == "string" &&
				typeof(arguments[2]) == "string" &&
				typeof(arguments[3]) == "string" &&
				typeof(arguments[4]) == "string" &&
				typeof(arguments[5]) == "object" &&
				typeof(arguments[6]) == "object";
			
			if (isValidJSON) {
				// 1 JSON argument
				_id = arguments[0].id;
				_name = arguments[0].name;
				_smartphoneId = arguments[0].smartphoneId;
				_farmName = arguments[0].farmName;
				_websiteUrl = arguments[0].websiteUrl;
				_workersId = arguments[0].workersId;
				_fieldsId = arguments[0].fieldsId;
			} else if (isValidArgumentArray) {
				// arguments array   
				_id = arguments[0];
				_name = arguments[1];
				_smartphoneId = arguments[2];
				_farmName = arguments[3];
				_websiteUrl = arguments[4];
				_workersId = arguments[5];
				_fieldsId  = arguments[6];
			} else {
				throw new Error('producer expected 1 or 7 arguments !!');
			}
		} catch(e) {
			throw new Error('bad arguments exception : ' + e.message);
		}
		
		// privileged  methods (read only public properties)
		this.getId = function() { return _id; };
		this.getName = function() { return _name; };
		this.getSmartphoneId = function() { return _smartphoneId; };
		this.getFarmName = function() { return _farmName; };
		this.getWebsiteUrl = function() { return _websiteUrl; };
		this.getWorkersId = function() { return _workersId; };
		this.getFieldsId = function() { return _fieldsId; };
		
		// public properties 
		this.workers = null;
		this.fields = null;
		
	};

	// producer object publics, non-privileged methods  
	producer.prototype = {
		
		/** toString method
		 * @returns {String} 
		 */
		toString : function() {
			var producerStr = 'not imlemented'; 
			return producerStr;
		}
	
	};
		
	// uag.data.model.producer object definition association    
	uag.data.model.producer = producer;

}());


// worker object declaration scope   
(function(){
	
	/**
	 * @class worker class 
	 */
	var worker = function () {
		
		// fields (private attributes)
		var _id = null;
		var _name = null;
		var _smartphoneId = null;
		var _containersId = null;
		var _producersId = null;
		
		// initialization
		try {
			
			var isValidJSON = 
				null != arguments && 
				1 == arguments.length && 
				null != arguments[0] && 
				typeof(arguments[0]) == "object" && 
				typeof(arguments[0].id) == "string" &&
				typeof(arguments[0].name) == "string" &&
				typeof(arguments[0].smartphoneId) == "string" &&
				typeof(arguments[0].containersId) == "object" &&
				typeof(arguments[0].producersId) == "object";
			
			var isValidArgumentArray =  
				null != arguments && 
				5 == arguments.length &&
				typeof(arguments[0]) == "string" &&
				typeof(arguments[1]) == "string" &&
				typeof(arguments[2]) == "string" &&
				typeof(arguments[3]) == "object" &&
				typeof(arguments[4]) == "object";
			
			//alert(isValidJSON + " " + isValidArgumentArray + " " + arguments.length);
			//alert(arguments[0]);
			//alert("constructeur " + arguments);
			
			if (isValidJSON) {
				// 1 JSON argument
				//alert("json constructeur " + arguments[0]);
				_id = arguments[0].id;
				_name = arguments[0].name;
				_smartphoneId = arguments[0].smartphoneId;
				_containersId = arguments[0].containersId;
				_producersId = arguments[0].producersId;				
			} else if (isValidArgumentArray) {
				// arguments array
				//alert("array constructeur " + arguments[0]);
				_id = arguments[0];
				_name = arguments[1];
				_smartphoneId = arguments[2];
				_containersId = arguments[3];
				_producersId = arguments[4];
			} else {
				throw new Error('worker expected 1 or # arguments !!');
			}
		} catch(e) {
			throw new Error('bad arguments exception : ' + e.message);
		}
		
		// privileged  methods (read only public properties)
		this.getId = function() { return _id; };
		this.getName = function() { return _name; };
		this.getSmartphoneId = function() { return _smartphoneId; };
		this.getContainersId = function() { return _containersId; };
		this.getProducersId = function() { return _producersId; };
		
		// public properties
		//this.id = this.getId();
		//this.name = this.getName();
		//this.smartphoneId = this.getSmartphoneId();
		this.containers = null;
		this.producers = null;
		
	};

	// worker object publics, non-privileged methods  
	worker.prototype = {
			
		/** toString method
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
	
		/** toJSON method
		 * @returns {String} 
		 */
		toJSON : function() {
			return JSON.parse(this.toString());
		}
			
	};
		
	// uag.data.model.worker object definition association    
	uag.data.model.worker = worker;
	
}());


// product object declaration scope   
(function(){
	
	/**
	 * @class product class 
	 */
	var product = function () {
		
		// fields (private attributes)
		
		// initialization
		try {
			
			var isValidJSON = false;
			
			var isValidArgumentArray = false;
			
			if (isValidJSON) {
				// 1 JSON argument
				
			} else if (isValidArgumentArray) {
				// arguments array
				
			} else {
				throw new Error('product expected 1 or # arguments !!');
			}
		} catch(e) {
			throw new Error('bad arguments exception : ' + e.message);
		}
		
		// privileged  methods (read only public properties)
		
		// public properties
		
	};

	// product object publics, non-privileged methods  
	product.prototype = {
			
		/** toString method
		 * @returns {String} 
		 */
		toString : function() {
			var producerStr = 'not imlemented'; 
			return producerStr;
		}
			
	};
		
	// uag.data.model.product object definition association    
	uag.data.model.product = product;

}());


// container object declaration scope
(function(){
	
	/**
	 * @class container 
	 */
	var container = function () {
		
		// fields (private attributes)
		
		// initialization
		try {

			var isValidJSON = false;
			
			var isValidArgumentArray = false;
			
			if (isValidJSON) {
				// 1 JSON argument
				
			} else if (isValidArgumentArray) {
				// arguments array
				
			} else {
				throw new Error('container expected 1 or # arguments !!');
			}
		} catch(e) {
			throw new Error('bad arguments exception : ' + e.message);
		}
		
		// privileged methods (read only public properties)
		
		// public properties
		
	};

	// container object publics, non-privileged methods  
	container.prototype = {
			
		/** toString method
		 * @returns {String} 
		 */
		toString : function() {
			var producerStr = 'not imlemented'; 
			return producerStr;
		}
			
	};
		
	// uag.data.model.container object definition association    
	uag.data.model.container = container;

}());


//quality object declaration scope
(function(){
	
	/**
	 * @class quality 
	 */
	var quality = function () {
		
		// fields (private attributes)
		
		// initialization
		try {

			var isValidJSON = false;
			
			var isValidArgumentArray = false;
			
			if (isValidJSON) {
				// 1 JSON argument
				
			} else if (isValidArgumentArray) {
				// arguments array
				
			} else {
				throw new Error('quality expected 1 or # arguments !!');
			}
		} catch(e) {
			throw new Error('bad arguments exception : ' + e.message);
		}
		
		// privileged methods (read only public properties)
		
		// public properties
		
	};

	// container object publics, non-privileged methods  
	quality.prototype = {
			
		/** toString method
		 * @returns {String} 
		 */
		toString : function() {
			var qualityToString = 'not imlemented'; 
			return qualityToString;
		}
			
	};
		
	// uag.data.model.quality object definition association    
	uag.data.model.quality = quality;

}());

