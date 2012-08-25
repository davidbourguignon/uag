/**@fileOverview uag data specification logic 
 * @author Sébastien Vivier, NSY209, CNAM 
 * @version Copyright (c) 2012
 * */


describe("Namespace like basics",function(){
	
	it("should do check namespaces and classes availability", function() {
		
		expect(uag).not.toEqual(null || undefined);
		
		expect(uag.util).not.toEqual(null || undefined);
		expect(uag.util.Storage).not.toEqual(null || undefined);
		
		expect(uag.data).not.toEqual(null || undefined);
		expect(uag.data.Producers).not.toEqual(null || undefined);
		expect(uag.data.WorkerContainers).not.toEqual(null || undefined);
		expect(uag.data.Import).not.toEqual(null || undefined);
		expect(uag.data.Export).not.toEqual(null || undefined);
		
		expect(function() {
			Storage.Retrive("");
		}).toThrow();
		
		expect(function() {
			Producers.getLocalStorageKey();
		}).toThrow();
		
		expect(function() {
			WorkerContainers.getLocalStorageKey();
		}).toThrow();
		
		expect(function() {
			Import.addProducer("");
		}).toThrow();
		
		expect(function() {
			Export.get();
		}).toThrow();
		
		//uag.util.Storage.Delete(uag.data.Producers.getLocalStorageKey());
		//uag.util.Storage.Delete(uag.data.WorkerContainers.getLocalStorageKey());
		//uag.util.Storage.Delete("setup");
		//uag.util.Storage.Delete("workers");
		
	});
	
});


describe("Producers basic",function(){
	
	it("should do all Producers local storage basic actions", function() {
		
		uag.data.Producers.clear();
		
		var producers = null;
		expect(function() {
			producers = uag.data.Producers.get();
		}).not.toThrow();
		
		expect(producers).not.toEqual(null || undefined);
		expect(Array.isArray(producers)).toEqual(true);
		expect(producers.length).toEqual(0);
		
		var producer = null;
		expect(function() {
			producer = uag.data.Producers.find();
		}).not.toThrow();

		expect(producer).toEqual(null);
		
		var fields = null;
		expect(function() {
			fields = uag.data.Producers.getFields();
		}).not.toThrow();
		
		expect(fields).toEqual([]);
		
		var fieldId = "field_id_fake";
		
		var field = null;
		expect(function() {
			field = uag.data.Producers.findField(fieldId);
		}).not.toThrow();
		
		expect(field).toEqual(null);
		
		var products = null;
		expect(function() {
			products = uag.data.Producers.getProducts();
		}).not.toThrow();
		
		expect(products).toEqual([]);
		
		var fieldProducts = null;
		expect(function() {
			fieldProducts = uag.data.Producers.getFieldProducts(fieldId);
		}).not.toThrow();
		
		expect(fieldProducts).toEqual([]);
		
		var productId = "product_id_fake";
		
		var fieldProduct = null;
		expect(function() {
			fieldProduct = uag.data.Producers.findFieldProduct(fieldId, productId);
		}).not.toThrow();
		
		expect(fieldProduct).toEqual(null);
		
		var qualities = null;
		expect(function() {
			qualities = uag.data.Producers.getQualities();
		}).not.toThrow();
		
		expect(qualities).toEqual([]);
		
	});
	
});


describe("workerContainers basic", function() {
	
	it("Should do all WorkerContainers local storage basic actions", function() {
		
		uag.data.WorkerContainers.clear();
		
		var worker = null;
		expect(function() {
			worker = uag.data.WorkerContainers.getWorker();
		}).not.toThrow();
		
		expect(worker.isAvailable).toEqual(false);
		
		var containers = null;
		expect(function() {
			containers = uag.data.WorkerContainers.getContainers();
		}).not.toThrow();
		
		expect(containers).not.toEqual(null);
		expect(containers).toEqual([]);

		var container = null;
		expect(function() {
			container = uag.data.WorkerContainers.findContainer("container_id_fake");
		}).not.toThrow();

		expect(container).toEqual(null);
		
	});
	
	it("Should do WorkerContainers add container action ",function() {
		
		var workerId = uag.data.WorkerContainers.setWorker("fakeWorker");
		
		worker = uag.data.WorkerContainers.getWorker();
		
		expect(worker.isAvailable).toEqual(true);
		expect(worker.id).toEqual(workerId);
		
		var containerId = 
			uag.data.WorkerContainers.addContainer(
					2.1, 
					"quality_id_fake", 
					"field_id_fake", 
					"product_id_fake");
		
		var containers = uag.data.WorkerContainers.getContainers();
		
		expect(containers.length).toEqual(1);
		
		var container = uag.data.WorkerContainers.findContainer(containerId);

		expect(container.id).toEqual(containerId);
		expect(container.id).toEqual(containers[0].id);
		
		uag.data.WorkerContainers.removeContainer(containerId);
		
		containers = uag.data.WorkerContainers.getContainers();
		
		expect(containers).not.toEqual(null);
		expect(containers.length).toEqual(0);		
		
	});
	
});


describe("Import", function() {
	
	it("Should import producer data to local storage, only one", function() {
		
		uag.data.Producers.clear();
		
		var producers = uag.data.Producers.get();
		
		expect(producers).not.toEqual(null);
		expect(producers).toEqual([]);
		expect(producers.length).toEqual(0);
		
		var initialProducerNumber = producers.length;
		
		// add producer to producers list (for the first time) 
		var producerId = uag.data.Import.addProducer(_jsonProducer1Data);
		
		expect(producerId).toEqual(_producerId1);
		expect(producerId).toEqual(_jsonProducer1Data.id);
		
		producers = uag.data.Producers.get();
		
		expect(producers).not.toEqual(null);
		expect(producers).not.toEqual([]);
		expect(producers.length).toEqual(initialProducerNumber + 1);
		expect(producers[0].id).toEqual(_producerId1);
		
		// add the same producer to producers list (for the second time) 
		expect(function(){
			uag.data.Import.addProducer(_jsonProducer1Data);
		}).toThrow("Producer already imported");
		
		// get producers 
		producers = uag.data.Producers.get();
		
		expect(producers).not.toEqual(null);
		expect(producers).not.toEqual([]);
		expect(producers.length).toEqual(initialProducerNumber + 1);
		expect(producers[0].id).toEqual(_producerId1);
		
		/*
		var qualities = uag.data.Producers.getQualities();
		
		expect(qualities[0].id).toEqual(_jsonProducer1Data.qualities[0].id);
		expect(qualities[0].name).toEqual(_jsonProducer1Data.qualities[0].name);
		expect(qualities[0].description).toEqual(_jsonProducer1Data.qualities[0].description);
		
		var products = new Array();
		for ( var int = 0 ; int < _jsonProducer1Data.products.length ; int++ ) {
			products.push(
					new uag.data.model.Product(_jsonProducer1Data.products[int]));
		}
		producer.products = products;
		
		var fields = new Array();
		for ( var int = 0 ; int < _jsonProducer1Data.fields.length ; int++ ) {
			var field = new uag.data.model.Field(_jsonProducer1Data.fields[int]);
			var position = new uag.data.model.Position(_jsonProducer1Data.fields[int].position);
			field.position = position;
			
			for (var i = 0 ; i < products.length ; i++) {
				field.products = new Array();
				if (-1 !== field.getProductsId().indexOf(products[i].getId())) {
					field.products.push(products[i]);
				}
			}
			
			fields.push(field);
		}
		producer.fields = fields;
		*/
	});

});


describe("Field app uses cases", function() {
	
	it("Should add a first worker and retrieve empty containers list", function() {
		
		uag.data.WorkerContainers.clear();
		
		// worker name (ui input)
		var workerName = "workerName1";
		
		// set worker  
		var workerId = uag.data.WorkerContainers.setWorker(workerName, _producerId1);
		
		// fetch data 
		var worker = uag.data.WorkerContainers.getWorker();
		
		expect(worker.isAvailable).toEqual(true);
		expect(worker.id).toEqual(workerId);
		
		// get worker's containers list 
		var containers = uag.data.WorkerContainers.getContainers();
		
		expect(containers).not.toEqual(null);
		expect(containers.length).toEqual(0);
		
	});
	
	it("Should fetch imported data with api ", function() {
		
		var producers = uag.data.Producers.get();
		
		expect(producers.length).toEqual(1);
		
		var producer = uag.data.Producers.find();
		
		expect(producer.id).toEqual(producers[0].id);
		
		var fields = uag.data.Producers.getFields();
		
		expect(fields).not.toEqual(null);
		expect(fields).not.toEqual([]);
		expect(fields.length).toEqual(producers[0].fields.length);
		
		var field1 = uag.data.Producers.findField(fields[0].id);
		
		expect(field1).not.toEqual(undefined || null);
		expect(field1.id).toEqual(fields[0].id);
		
		var products = uag.data.Producers.getProducts();
		
		expect(products).not.toEqual(undefined || null);
		expect(products.length).toEqual(producers[0].products.length);
		
		var productsField = uag.data.Producers.getFieldProducts(field1.id);
		
		expect(productsField).not.toEqual(undefined || null);
		expect(productsField.length).toEqual(producers[0].fields[0].productsId.length);
		expect(productsField[0].id).toEqual(producers[0].fields[0].productsId[0]);
		
		var productField = uag.data.Producers.findFieldProduct(field1.id,productsField[0].id);
		
		expect(productField).not.toEqual(undefined || null);
		expect(productField.id).toEqual(productsField[0].id);
		
	});
	
	it("Should add a container to worker's containers list", function() {
		
		// get qualities list 
		var qualities = uag.data.Producers.getQualities();
		// default selected quality 
		var selectedQuality = qualities[0]; 
		// get fields list 
		var fields = uag.data.Producers.getFields();
		// default selected field 
		var selectedField = fields[0]; 
		// get field products list (depend on selected field)
		var products = uag.data.Producers.getFieldProducts(selectedField.id);
		// default selected product
		var selectedProduct = products[0]; 
		
		// user selected quality (user select list input)
		selectedQuality = qualities[2];
		// user select a field (user select list input)
		selectedField = fields[1];
		// get field products list (depend on selected field)
		products = uag.data.Producers.getFieldProducts(selectedField.id);
		// select a product (user select list input)
		selectedProduct = products[1]; 
		
		// set weight (user text input)
		var weight = 2.1;
		// set harvest date (automatic)
		// set field position (automatic, from gps sensor with phonegap/cordova)
		// set temperature (automatic, from sensor with phonegap/cordova)
		
		// add container to worker's containers list 
		var containerId = 
			uag.data.WorkerContainers.addContainer(
					weight,
					selectedQuality, 
					selectedField, 
					selectedProduct);
		
		var containers = uag.data.WorkerContainers.getContainers();
		
		expect(containers).not.toEqual(undefined || null);
		expect(containers).not.toEqual([]);
		expect(containers.length).toEqual(1);
		
		var container = uag.data.WorkerContainers.findContainer(containerId);
		
		expect(container).not.toEqual(undefined || null);
		expect(container).not.toEqual({});
		expect(container.id).toEqual(containerId);
		
		uag.data.WorkerContainers.removeContainer(containerId);
				
		containers = uag.data.WorkerContainers.getContainers();
		
		expect(containers).not.toEqual(undefined || null);
		expect(containers).toEqual([]);
		expect(containers.length).toEqual(0);
		
		
	});
	
	it("Should update container from worker's containers list", function() {
		
		//position = new Position(1,2,3);
		
	});
	
});

