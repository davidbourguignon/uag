/**@fileOverview uag data model specification logic 
 * @author Sébastien Vivier, NSY209, CNAM 
 * @version Copyright (c) 2012
 * */
	
// remember possibly useful methods
//console.log(uag.data.model.position.toSource());
//console.log(uag.data.model.position.prototype.toSource());
//console.log(p1.toSource());
 
describe("position", function() {

	// 4 arguments constructor 
	it("should be able to initialize object position with 4 arguments", function() {
		var id1 = "position_id_1"; 
		var lat1 = 2; 
		var lon1 = 4;
		var alt1 = 8;
		var position = new uag.data.model.position(id1, lat1, lon1, alt1);
		expect(position.getId()).toEqual(id1);
		expect(position.getLatitude()).toEqual(lat1);
		expect(position.getLongitude()).toEqual(lon1);
		expect(position.getAltitude()).toEqual(alt1);
	});
	
	// 1 arguments constructor 
	it("should be able to initialize object position with 1 json argument", function() {
		var jsonData = { "id":"position_id_2","latitude":1,"longitude":2,"altitude":4 }
		var position = new uag.data.model.position( jsonData );
		expect(position.getId()).toEqual(jsonData.id);
		expect(position.getLatitude()).toEqual(jsonData.latitude);
		expect(position.getLongitude()).toEqual(jsonData.longitude);
		expect(position.getAltitude()).toEqual(jsonData.altitude);
	});
	
	// other constructors based on arguments bad number (0, 2, 3, 5 arguments) or type (1+ null arguments, ...) 
	it("should throw exception if bad arguments", function() {
		expect(function(){
			var position = new uag.data.model.position();
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		expect(function(){
			var position = new uag.data.model.position("", 10);
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		expect(function(){
			var position = new uag.data.model.position("", 10, 20);
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		expect(function(){
			var position = new uag.data.model.position("", 10, 20, 30, 40);
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		expect(function(){
			var position = new uag.data.model.position("", 10, 20, null);
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
	});
	
	// others constructor based on bad json input data 
	it("should throw exception if bad json arguments", function() {
		expect(function(){
			var jsonData = { "id":null,"latitude":1,"longitude":2,"altitude":4 }
			var position = new uag.data.model.position( jsonData );
			alert(position.getId());
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		expect(function(){
			var jsonData = { "latitude":1,"longitude":2,"altitude":4 }
			var position = new uag.data.model.position( jsonData );
			alert(position.getId());
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
		expect(function(){
			var jsonData = { "identifier":"position_id_2","latitude":1,"longitude":2,"altitude":4 }
			var position = new uag.data.model.position( jsonData );
			alert(position.getId());
		}).toThrow("bad arguments exception : position expected 1 or 4 arguments !!");
	});

});


describe("field", function() {

	// 6 arguments constructor
	it("should be able to initialize object position with 4 arguments", function() {
		var id = "field_id_1"; 
		var name = "nom"; 
		var description = "description"; 
		var positionId = "position_id_1"; 
		var productsId = ["product_id_1","product_id_2","product_id_3"]; 
		var producerId = "procucer_id_1"; 
		var field = new uag.data.model.field(id, name, description, positionId, productsId, producerId);
		expect(field.getId()).toEqual(id);
		expect(field.getName()).toEqual(name);
		expect(field.getDescription()).toEqual(description);
		expect(field.getPositionId()).toEqual(positionId);
		expect(field.getProductsId()).toEqual(productsId);
		expect(field.getProducerId()).toEqual(producerId);
	});
	
	// 1 json arguments constructor
	it("should be able to initialize object position with 1 json arguments", function() {
		var jsonData = {
			"id":"field_id_1", 
			"name":"nom",
			"description":"une description", 
			"positionId":"position_id_1", 
			"productsId":["product_id_1","product_id_2","product_id_3"], 
			"producerId":"procucer_id_1" 
		};
		var field = new uag.data.model.field(jsonData);
		expect(field.getId()).toEqual(jsonData.id);
		expect(field.getName()).toEqual(jsonData.name);
		expect(field.getDescription()).toEqual(jsonData.description);
		expect(field.getPositionId()).toEqual(jsonData.positionId);
		expect(field.getProductsId()).toEqual(jsonData.productsId);
		expect(field.getProducerId()).toEqual(jsonData.producerId);
	});
	
});


describe("producer", function() {

	// 7 arguments constructor
	it("should be able to initialize object position with 4 arguments", function() {
		var id = "producer_id_1";
		var name = "nom";
		var smartphoneId = "smart_phone_id";
		var farmName = "farm_name";
		var websiteUrl = "http://www.domaine.ext";
		var workersId = ["worker_id_1","worker_id_2","worker_id_3"];
		var fieldsId = ["field_id_1","field_id_2","field_id_3"];
		
		var producer = 
			new uag.data.model.producer(
				id, 
				name, 
				smartphoneId, 
				farmName, 
				websiteUrl, 
				workersId, 
				fieldsId);
		
		expect(producer.getId()).toEqual(id);
		expect(producer.getName()).toEqual(name);
		expect(producer.getSmartphoneId()).toEqual(smartphoneId);
		expect(producer.getFarmName()).toEqual(farmName);
		expect(producer.getWebsiteUrl()).toEqual(websiteUrl);
		expect(producer.getWorkersId()).toEqual(workersId);
		expect(producer.getFieldsId()).toEqual(fieldsId);
	});
	
	// 1 json arguments constructor
	it("should be able to initialize object position with 1 json arguments", function() {
		var jsonData = {
			"id":"producer_id_1", 
			"name":"nom", 
			"smartphoneId":"smart_phone_id", 
			"farmName":"farm_name", 
			"websiteUrl":"http://www.domaine.ext", 
			"workersId":["worker_id_1","worker_id_2","worker_id_3"], 
			"fieldsId":["field_id_1","field_id_2","field_id_3"], 
		};
		
		var producer = new uag.data.model.producer(jsonData);
		
		expect(producer.getId()).toEqual(jsonData.id);
		expect(producer.getName()).toEqual(jsonData.name);
		expect(producer.getSmartphoneId()).toEqual(jsonData.smartphoneId);
		expect(producer.getFarmName()).toEqual(jsonData.farmName);
		expect(producer.getWebsiteUrl()).toEqual(jsonData.websiteUrl);
		expect(producer.getWorkersId()).toEqual(jsonData.workersId);
		expect(producer.getFieldsId()).toEqual(jsonData.fieldsId);
	});

});


describe("worker", function() {

});


describe("product", function() {

});


describe("crate", function() {

});
