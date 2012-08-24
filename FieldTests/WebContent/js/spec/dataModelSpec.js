/**@fileOverview uag data model specification logic 
 * @author Sébastien Vivier, NSY209, CNAM 
 * @version Copyright (c) 2012
 * */
	
// remember possibly useful methods
//console.log(uag.data.model.position.toSource());
//console.log(uag.data.model.position.prototype.toSource());
//console.log(p1.toSource());
 
describe("Position", function() {
	
	// 4 arguments constructor 
	it("should be able to initialize position object with 4 arguments", function() {
		
		var id1 = "position_id_1"; 
		var lat1 = 2; 
		var lon1 = 4;
		var alt1 = 8;
		
		var position = new uag.data.model.Position(id1, lat1, lon1, alt1);
		
		expect(position.getId()).toEqual(id1);
		expect(position.getLatitude()).toEqual(lat1);
		expect(position.getLongitude()).toEqual(lon1);
		expect(position.getAltitude()).toEqual(alt1);
		
		jsonPosition = JSON.parse(position.toString());
		
		expect(position.getId()).toEqual(jsonPosition.id);
		expect(position.getLatitude()).toEqual(+jsonPosition.latitude);
		expect(position.getLongitude()).toEqual(+jsonPosition.longitude);
		expect(position.getAltitude()).toEqual(+jsonPosition.altitude);
		
	});
	
	// 1 arguments constructor 
	it("should be able to initialize position object with 1 json argument", function() {
		
		var jsonData = { "id":"position_id_2","latitude":1,"longitude":2,"altitude":4 };
		var position = new uag.data.model.Position( jsonData );
		expect(position.getId()).toEqual(jsonData.id);
		expect(position.getLatitude()).toEqual(jsonData.latitude);
		expect(position.getLongitude()).toEqual(jsonData.longitude);
		expect(position.getAltitude()).toEqual(jsonData.altitude);
		
	});

	it ("Should not be able to initialize position global object", function() {
		
		expect(function() { 
			new Position("position_id_",1,2,3); 
		}).toThrow();
		
	});
	
	// other constructors based on arguments bad number (0, 2, 3, 5 arguments) or type (1+ null arguments, ...) 
	it("should throw exception if bad arguments", function() {
		
		expect(function(){
			new uag.data.model.Position();
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		expect(function(){
			new uag.data.model.Position("", 10);
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		expect(function(){
			new uag.data.model.Position("", 10, 20);
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		expect(function(){
			new uag.data.model.Position("", 10, 20, 30, 40);
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		expect(function(){
			new uag.data.model.Position("", 10, 20, null);
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		
	});
	
	// others constructor based on bad json input data 
	it("should throw exception if bad json arguments", function() {
		
		expect(function(){
			var jsonData = { "id":null,"latitude":1,"longitude":2,"altitude":4 };
			var position = new uag.data.model.Position( jsonData );
			alert(position.getId());
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		expect(function(){
			var jsonData = { "latitude":1,"longitude":2,"altitude":4 };
			var position = new uag.data.model.Position( jsonData );
			alert(position.getId());
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		expect(function(){
			var jsonData = { "identifier":"position_id_2","latitude":1,"longitude":2,"altitude":4 };
			var position = new uag.data.model.Position( jsonData );
			alert(position.getId());
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		
	});

});


describe("Field", function() {

	// 6 arguments constructor
	it("should be able to initialize field object with 6 arguments", function() {
		
		var id = "field_id_1"; 
		var name = "nom"; 
		var description = "description"; 
		var positionId = "position_id_1"; 
		var productsId = ["product_id_1","product_id_2","product_id_3"]; 
		var producerId = "procucer_id_1"; 
		
		var field = new uag.data.model.Field(id, name, description, positionId, productsId, producerId);
		
		expect(field.getId()).toEqual(id);
		expect(field.getName()).toEqual(name);
		expect(field.getDescription()).toEqual(description);
		expect(field.getPositionId()).toEqual(positionId);
		expect(field.getProductsId()).toEqual(productsId);
		expect(field.getProducerId()).toEqual(producerId);
		
		jsonField = JSON.parse(field.toString());
		
		expect(field.getId()).toEqual(jsonField.id);
		expect(field.getName()).toEqual(jsonField.name);
		expect(field.getDescription()).toEqual(jsonField.description);
		expect(field.getPositionId()).toEqual(jsonField.positionId);
		expect(field.getProductsId()).toEqual(jsonField.productsId);
		expect(field.getProducerId()).toEqual(jsonField.producerId);

	});
	
	// 1 json arguments constructor
	it("should be able to initialize field object with 1 json arguments", function() {
		
		var jsonData = {
			"id":"field_id_1", 
			"name":"nom",
			"description":"une description", 
			"positionId":"position_id_1", 
			"productsId":["product_id_1","product_id_2","product_id_3"], 
			"producerId":"procucer_id_1" 
		};
		var field = new uag.data.model.Field(jsonData);
		expect(field.getId()).toEqual(jsonData.id);
		expect(field.getName()).toEqual(jsonData.name);
		expect(field.getDescription()).toEqual(jsonData.description);
		expect(field.getPositionId()).toEqual(jsonData.positionId);
		expect(field.getProductsId()).toEqual(jsonData.productsId);
		expect(field.getProducerId()).toEqual(jsonData.producerId);
		
	});

	it ("Should not be able to initialize field global object", function() {
		
		var id = "field_id_1"; 
		var name = "nom"; 
		var description = "description"; 
		var positionId = "position_id_1"; 
		var productsId = ["product_id_1","product_id_2","product_id_3"]; 
		var producerId = "procucer_id_1"; 

		expect(function() { 
			new Field(id, name, description, positionId, productsId, producerId);
		}).toThrow();
		
	});
	
});


describe("Producer", function() {

	// 7 arguments constructor
	it("should be able to initialize producer object with 8 arguments", function() {
		
		var id = "producer_id_1";
		var name = "nom";
		var smartphoneId = "smart_phone_id";
		var farmName = "farm_name";
		var websiteUrl = "http://www.domaine.ext";
		var workersId = ["worker_id_1","worker_id_2","worker_id_3"];
		var fieldsId = ["field_id_1","field_id_2","field_id_3"];
		var productsId = ["product_id_1","product_id_2","product_id_3"];
		
		var producer = 
			new uag.data.model.Producer(
				id, 
				name, 
				smartphoneId, 
				farmName, 
				websiteUrl, 
				workersId, 
				fieldsId,
				productsId);
		
		expect(producer.getId()).toEqual(id);
		expect(producer.getName()).toEqual(name);
		expect(producer.getSmartphoneId()).toEqual(smartphoneId);
		expect(producer.getFarmName()).toEqual(farmName);
		expect(producer.getWebsiteUrl()).toEqual(websiteUrl);
		expect(producer.getWorkersId()).toEqual(workersId);
		expect(producer.getFieldsId()).toEqual(fieldsId);
		expect(producer.getProductsId()).toEqual(productsId);
		
		jsonProducer = JSON.parse(producer.toString());
		
		expect(producer.getId()).toEqual(jsonProducer.id);
		expect(producer.getName()).toEqual(jsonProducer.name);
		expect(producer.getSmartphoneId()).toEqual(jsonProducer.smartphoneId);
		expect(producer.getFarmName()).toEqual(jsonProducer.farmName);
		expect(producer.getWebsiteUrl()).toEqual(jsonProducer.websiteUrl);
		expect(producer.getWorkersId()).toEqual(jsonProducer.workersId);
		expect(producer.getFieldsId()).toEqual(jsonProducer.fieldsId);
		expect(producer.getProductsId()).toEqual(jsonProducer.productsId);
		
	});
	
	// 1 json arguments constructor
	it("should be able to initialize producer object with 1 json arguments", function() {
		
		var jsonData = {
			"id":"producer_id_1", 
			"name":"nom", 
			"smartphoneId":"smart_phone_id", 
			"farmName":"farm_name", 
			"websiteUrl":"http://www.domaine.ext", 
			"workersId":["worker_id_1","worker_id_2","worker_id_3"], 
			"fieldsId":["field_id_1","field_id_2","field_id_3"], 
			"productsId":["product_id_1","product_id_2","product_id_3"]
		};
		
		var producer = new uag.data.model.Producer(jsonData);
		
		expect(producer.getId()).toEqual(jsonData.id);
		expect(producer.getName()).toEqual(jsonData.name);
		expect(producer.getSmartphoneId()).toEqual(jsonData.smartphoneId);
		expect(producer.getFarmName()).toEqual(jsonData.farmName);
		expect(producer.getWebsiteUrl()).toEqual(jsonData.websiteUrl);
		expect(producer.getWorkersId()).toEqual(jsonData.workersId);
		expect(producer.getFieldsId()).toEqual(jsonData.fieldsId);
		expect(producer.getProductsId()).toEqual(jsonData.productsId);
		
	});

	it ("Should not be able to initialize Producer global object", function() {
		
		var id = "producer_id_1";
		var name = "nom";
		var smartphoneId = "smart_phone_id";
		var farmName = "farm_name";
		var websiteUrl = "http://www.domaine.ext";
		var workersId = ["worker_id_1","worker_id_2","worker_id_3"];
		var fieldsId = ["field_id_1","field_id_2","field_id_3"];
		var productsId = ["product_id_1","product_id_2","product_id_3"];
		
		expect(function() { 
				new Producer(
					id, 
					name, 
					smartphoneId, 
					farmName, 
					websiteUrl, 
					workersId, 
					fieldsId,
					productsId);
		}).toThrow();
		
	});

});


describe("worker", function() {

	// 5 arguments constructor
	it("should be able to initialize worker object with 5 arguments", function() {
		
		var id = "worker_id_1";
		var name = "workerName";
		var smartphoneId = "smart_phone_id";
		var containersId = ["container_id_1","container_id_2","container_id_3"];
		var producersId = ["producer_id_1","producer_id_2","producer_id_3"];
		
		var worker = 
			new uag.data.model.Worker(
				id, 
				name, 
				smartphoneId, 
				containersId, 
				producersId);
		
		expect(worker.getId()).toEqual(id);
		expect(worker.getName()).toEqual(name);
		expect(worker.getSmartphoneId()).toEqual(smartphoneId);
		expect(worker.getContainersId()).toEqual(containersId);
		expect(worker.getProducersId()).toEqual(producersId);
		
	});
	
	// 1 json arguments constructor
	it("should be able to initialize worker object with 1 json arguments", function() {
		
		var jsonData = {
			"id":"worker_id_1", 
			"name":"workerName", 
			"smartphoneId":"smart_phone_id", 
			"containersId":["container_id_1","container_id_2","container_id_3"], 
			"producersId":["producer_id_1","producer_id_2","producer_id_3"]
		};
		
		var worker = new uag.data.model.Worker(jsonData);
		
		expect(worker.getId()).toEqual(jsonData.id);
		expect(worker.getName()).toEqual(jsonData.name);
		expect(worker.getSmartphoneId()).toEqual(jsonData.smartphoneId);
		expect(worker.getContainersId()).toEqual(jsonData.containersId);
		expect(worker.getProducersId()).toEqual(jsonData.producersId);
		
	});

	it ("Should not be able to initialize Worker global object", function() {
		// this test can't pass, because Worker object already exist in global scope as web Worker 
		/*
		var id = "worker_id_";
		var name = "workerName";
		var smartphoneId = "smart_phone_id";
		var containersId = ["container_id_1","container_id_2","container_id_3"];
		var producersId = ["producer_id_1","producer_id_2","producer_id_3"];
		
		expect(function() { 
			var worker = 
				new Worker(
					id, 
					name, 
					smartphoneId, 
					containersId, 
					producersId);
		}).toThrow();
		*/
	});

});


describe("Product", function() {

	// 3 arguments constructor
	it("should be able to initialize Product object with 3 arguments", function() {
		
		var id = "product_id_1"; 
		var name = "productName"; 
		var description = "productDescription"; 
		
		var product = 
			new uag.data.model.Product(id, name, description);
		
		expect(product.getId()).toEqual(id);
		expect(product.getName()).toEqual(name);
		expect(product.getDescription()).toEqual(description);
		
		jsonProduct = JSON.parse(product.toString());
		
		expect(product.getId()).toEqual(jsonProduct.id);
		expect(product.getName()).toEqual(jsonProduct.name);
		expect(product.getDescription()).toEqual(jsonProduct.description);

	});
	
	// 1 json arguments constructor
	it("should be able to initialize Product object with 1 json arguments", function() {
		
		var jsonData = {
			"id":"product_id_1", 
			"name":"productName",
			"description":"productDescription"};
		
		var product = new uag.data.model.Product(jsonData);
		
		expect(product.getId()).toEqual(jsonData.id);
		expect(product.getName()).toEqual(jsonData.name);
		expect(product.getDescription()).toEqual(jsonData.description);
		
	});

	it ("Should not be able to initialize Product global object", function() {
		
		var id = "product_id_1"; 
		var name = "productName"; 
		var description = "productDescription"; 
		
		expect(function() { 
			new Product(id, name, description);
		}).toThrow();
		
	});
	
});


describe("Container", function() {

	// 8 arguments constructor
	it("should be able to initialize Container object with 7 arguments", function() {
		
		var id = "container_id_1";
		var weight = 1.5;
		var ts = Date.now();
		var qualityId = "quality_id_1";
		//var workerId = "worker_id_1";
		//var producerId = "producer_id_1";
		var fieldId = "field_id_1";
		var productId = "product_id_1";
		
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
		
		expect(container.getId()).toEqual(id);
		expect(container.getWeight()).toEqual(weight);
		expect(container.getTs()).toEqual(ts);
		expect(container.getQualityId()).toEqual(qualityId);
		//expect(container.getWorkerId()).toEqual(workerId);
		//expect(container.getProducerId()).toEqual(producerId);
		expect(container.getFieldId()).toEqual(fieldId);
		expect(container.getProductId()).toEqual(productId);
		
		jsonContainer = JSON.parse(container.toString());
		
		expect(container.getId()).toEqual(jsonContainer.id);
		expect(container.getWeight()).toEqual(jsonContainer.weight);
		expect(container.getTs()).toEqual(jsonContainer.ts);
		expect(container.getQualityId()).toEqual(jsonContainer.qualityId);
		//expect(container.getWorkerId()).toEqual(jsonContainer.workerId);
		//expect(container.getProducerId()).toEqual(jsonContainer.producerId);
		expect(container.getFieldId()).toEqual(jsonContainer.fieldId);
		expect(container.getProductId()).toEqual(jsonContainer.productId);

	});
	
	// 1 json arguments constructor
	it("should be able to initialize Container object with 1 json arguments", function() {
		
		var jsonData = {
			"id":"container_id_1",
			"weight":1.5,
			"ts":Date.now(),
			"qualityId":"quality_id_1",
			//"workerId":"worker_id_1",
			//"producerId":"producer_id_1",
			"fieldId":"field_id_1",
			"productId":"product_id_1"};
		
		var container = new uag.data.model.Container(jsonData);
		
		expect(container.getId()).toEqual(jsonData.id);
		expect(container.getWeight()).toEqual(jsonData.weight);
		expect(container.getTs()).toEqual(jsonData.ts);
		expect(container.getQualityId()).toEqual(jsonData.qualityId);
		//expect(container.getWorkerId()).toEqual(jsonData.workerId);
		//expect(container.getProducerId()).toEqual(jsonData.producerId);
		expect(container.getFieldId()).toEqual(jsonData.fieldId);
		expect(container.getProductId()).toEqual(jsonData.productId);
		
	});

	it ("Should not be able to initialize Container global object", function() {
		
		var id = "container_id_1";
		var weight = 1.5;
		var ts = Date.now();
		var qualityId = "quality_id_1";
		//var workerId = "worker_id_1";
		//var producerId = "producer_id_1";
		var fieldId = "field_id_1";
		var productId = "product_id_1";
		
		expect(function() { 
			new Container(
					id, 
					weight, 
					ts,
					qualityId,
					//workerId,
					//producerId,
					fieldId,
					productId);
		}).toThrow();
		
	});

});


describe("Quality", function() {

	// 3 arguments constructor
	it("should be able to initialize Product object with 3 arguments", function() {
		
		var id = "quality_id_1"; 
		var name = "qualityName"; 
		var description = "qualityDescription"; 
		
		var quality = 
			new uag.data.model.Quality(id, name, description);
		
		expect(quality.getId()).toEqual(id);
		expect(quality.getName()).toEqual(name);
		expect(quality.getDescription()).toEqual(description);
		
		jsonQuality = JSON.parse(quality.toString());
		
		expect(quality.getId()).toEqual(jsonQuality.id);
		expect(quality.getName()).toEqual(jsonQuality.name);
		expect(quality.getDescription()).toEqual(jsonQuality.description);

	});
	
	// 1 json arguments constructor
	it("should be able to initialize Product object with 1 json arguments", function() {
		
		var jsonData = {
			"id":"quality_id_1", 
			"name":"qualityName",
			"description":"qualityDescription"};
		
		var quality = new uag.data.model.Quality(jsonData);
		
		expect(quality.getId()).toEqual(jsonData.id);
		expect(quality.getName()).toEqual(jsonData.name);
		expect(quality.getDescription()).toEqual(jsonData.description);
		
	});

	it ("Should not be able to initialize Quality global object", function() {
		
		var id = "quality_id_1"; 
		var name = "qualityName"; 
		var description = "qualityDescription"; 
		
		expect(function() { 
			new Quality(id, name, description);
		}).toThrow();
		
	});

});
