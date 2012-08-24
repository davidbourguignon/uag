/**@fileOverview uag data specification logic 
 * @author Sébastien Vivier, NSY209, CNAM 
 * @version Copyright (c) 2012
 * */


describe("no global scope declaration", function() {
	
	it("Should not be able to initialize Storage global object", function() {
		
		expect(function() {
			new Storage();
		}).toThrow();
		
	});
	
	it("Should not be able to initialize Workers global object", function() {
		
		expect(function() {
			new Workers();
		}).toThrow();
		
	});
	
	it("Should not be able to initialize Producers global object", function() {
		
		expect(function() {
			new Producers();
		}).toThrow();
		
	});
	
	it("Should not be able to initialize Setup global object", function() {
		
		expect(function() {
			new Setup();
		}).toThrow();
		
	});
	
	it("Should not be able to initialize Import global object", function() {
		
		expect(function() {
			new Import();
		}).toThrow();
		
	});
	
	it("Should not be able to initialize Export global object", function() {
		
		expect(function() {
			new Export();
		}).toThrow();
		
	});
	
});

describe("Workers basic", function() {
	
	it("Should do all Workers local storage basic actions", function() {
			
		var workers = null;
		var workerName = "workerName";
		var firstGetAllWorker = null;
		var findByIdWorker = null;
		
		// unset local storage
		uag.data.Workers.clear();
		
		// fetch data 
		workers = uag.data.Workers.getAll();
		
		expect(uag.util.Type.isArray(workers)).toEqual(true);
		expect(workers.length).toEqual(0);
		
		// add worker 
		uag.data.Workers.addWorker(workerName);	

		// fetch all data
		workers = uag.data.Workers.getAll();
		
		expect(uag.util.Type.isArray(workers)).toEqual(true);
		expect(workers.length).toEqual(1);
		
		firstGetAllWorker = workers[0];
		expect(firstGetAllWorker).not.toEqual(undefined);
		expect(firstGetAllWorker).not.toEqual(null);
		expect(firstGetAllWorker.getName()).toEqual(workerName);
		
		// find worker by id
		findByIdWorker = uag.data.Workers.findById(firstGetAllWorker.getId());
		
		expect(firstGetAllWorker.getId()).toEqual(findByIdWorker.getId());
		expect(firstGetAllWorker.getName()).toEqual(findByIdWorker.getName());
		expect(firstGetAllWorker.getSmartphoneId()).toEqual(findByIdWorker.getSmartphoneId());
		
		// do not forget remove tests
		var workerId = firstGetAllWorker.getId();
		uag.data.Workers.remove(workerId);
		
		// fetch data 
		workers = uag.data.Workers.getAll();
		
		expect(uag.util.Type.isArray(workers)).toEqual(true);
		expect(workers.length).toEqual(0);
		
	});
	
});


describe("Producers basic",function(){
	
	it("should do all Producers local storage basic actions", function() {

		// unset local storage
		uag.data.Producers.clear();
		
		// fetch data 
		producers = uag.data.Producers.getAll(null);
		
		expect(uag.util.Type.isArray(producers)).toEqual(true);
		expect(producers.length).toEqual(0);

		
	});
	
});


describe("Import", function() {
	
	it("Should import producer data to local storage and fetch it with custom code", function() {
				
		var jsonData = JSON.parse(_jsonProducer1DataString);
		
		uag.data.Producers.clear();
		
		var producerId = uag.data.Import.addProducer(_jsonProducer1DataString);
		
		expect(producerId).toEqual(_producerId1);
		expect(producerId).toEqual(jsonData.id);
		
		// full producer objet construct from storage data with tests 
		var producer = new uag.data.model.Producer(jsonData);
		
		expect(producer.getId()).toEqual(producerId);
		expect(producer.getId()).toEqual(jsonData.id);
		expect(producer.getName()).toEqual(jsonData.name);
		expect(producer.getSmartphoneId()).toEqual(jsonData.smartphoneId);
		expect(producer.getFarmName()).toEqual(jsonData.farmName);
		expect(producer.getWebsiteUrl()).toEqual(jsonData.websiteUrl);
		expect(producer.getWorkersId()).toEqual(jsonData.workersId);
		
		var qualities = new Array();
		for ( var int = 0 ; int < jsonData.qualities.length ; int++ ) {
			qualities.push(
					new uag.data.model.Quality(jsonData.qualities[int]));
		}
		
		expect(qualities[0].getId()).toEqual(jsonData.qualities[0].id);
		expect(qualities[0].getName()).toEqual(jsonData.qualities[0].name);
		expect(qualities[0].getDescription()).toEqual(jsonData.qualities[0].description);
		
		var products = new Array();
		for ( var int = 0 ; int < jsonData.products.length ; int++ ) {
			products.push(
					new uag.data.model.Product(jsonData.products[int]));
		}
		producer.products = products;
		
		var fields = new Array();
		for ( var int = 0 ; int < jsonData.fields.length ; int++ ) {
			var field = new uag.data.model.Field(jsonData.fields[int]);
			var position = new uag.data.model.Position(jsonData.fields[int].position);
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
		
		
	});
	
	it("Should import producer data to local storage and fetch it with api ", function() {
		
		var jsonData = JSON.parse(_jsonProducer1DataString);
		
		uag.data.Producers.clear();
		
		var producerId = uag.data.Import.addProducer(_jsonProducer1DataString);

		// setting the setup 
		var jsonSetup = {"workerId":"worker_id_fake","producerId":producerId};
		uag.data.Setup.set(jsonSetup);

		var producers = uag.data.Producers.getAll();
		
		expect(producers.length).toEqual(1);
		
		var jsonProducer = uag.data.Producers.findById(producerId);
		
		expect(jsonProducer.id).toEqual(jsonData.id);
		
		var jsonFields = uag.data.Producers.getFields();
		
		expect(jsonFields.length).toEqual(jsonData.fields.length);
		
		var jsonField1 = uag.data.Producers.findFieldById(jsonFields[0].id);
		
		expect(jsonField1).not.toEqual(undefined || null);
		expect(jsonField1.id).toEqual(jsonFields[0].id);
		
		var jsonProducts = uag.data.Producers.getProducts();
		
		expect(jsonProducts).not.toEqual(undefined || null);
		expect(jsonProducts.length).toEqual(jsonData.products.length);
		expect(jsonProducts[0].id).toEqual(jsonData.products[0].id);
		
		var jsonProductsField = uag.data.Producers.getProductsForField(jsonField1.id);
		
		expect(jsonProductsField).not.toEqual(undefined || null);
		expect(jsonProductsField.length).toEqual(jsonData.fields[0].productsId.length);
		expect(jsonProductsField[0].id).toEqual(jsonData.fields[0].productsId[0]);
		
		var jsonProductField = uag.data.Producers.findProductsByIdForField(jsonField1.id,jsonProductsField[0].id);
		
		expect(jsonProductField).not.toEqual(undefined || null);
		expect(jsonProductField.id).toEqual(jsonProductsField[0].id);
		
	});
	
});


describe("Field uses cases", function() {
	
	var producerId = null;
	var workerId = null;
	var containerId = null;
	
	it("Should add a first producer only one time", function() {
		
		// clear producers list 
		uag.data.Producers.clear();
		
		// get producers 
		var producers = uag.data.Producers.getAll();
		var initialProducerNumber = producers.length;
		
		expect(uag.util.Type.isArray(producers)).toEqual(true);
		expect(initialProducerNumber).toEqual(0);
		
		// TODO : read an input file (cf mock _jsonProducer#DataString) 
		
		// add producer to producers list (for the first time) 
		producerId = uag.data.Import.addProducer(_jsonProducer1DataString);
		
		// add producer to producers list (for the second time) 
		expect(function(){
			uag.data.Import.addProducer(_jsonProducer1DataString);
		}).toThrow("Producer already imported");
		
		// get producers 
		producers = uag.data.Producers.getAll();
		
		expect(uag.util.Type.isArray(producers)).toEqual(true);
		expect(producers.length).toEqual(initialProducerNumber + 1);
		
	});
	
	it("Should add a first worker and setup", function() {
		
		uag.data.Workers.clear();
		
		// set worker name (ui input)
		var workerName = "workerName1";
		
		// set associate woker's producers 
		var producersId = [producerId];
		
		// add this new worker to workers list 
		workerId = uag.data.Workers.addWorker(workerName, producersId);
		
		// fetch data 
		var workers = uag.data.Workers.getAll();
		
		expect(uag.util.Type.isArray(workers)).toEqual(true);
		expect(workers.length).toEqual(1);
		
		// setting the setup 
		var jsonSetup = {"workerId":workerId,"producerId":producerId};
		uag.data.Setup.set(jsonSetup);
		
		// getting the setup
		var setupJSON = uag.data.Setup.get();
		
		expect(jsonSetup.workerId).toEqual(setupJSON.workerId);
		expect(jsonSetup.producerId).toEqual(setupJSON.producerId);
		
	});
	
	it("Should retrieve empty containers list", function() {
		
		// get worker's containers list 
		var containers = uag.data.Workers.getContainers();
		
		expect(uag.util.Type.isArray(containers)).toEqual(true);
		expect(containers.length).toEqual(0);
		
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
		var products = uag.data.Producers.getProductsForField(selectedField.id);
		// default selected product
		var selectedProduct = products[0]; 
		
		// user selected quality (user select list input)
		selectedQuality = qualities[2];
		// user select a field (user select list input)
		selectedField = fields[1];
		
		// get field products list (depend on selected field)
		products = uag.data.Producers.getProductsForField(selectedField.id);
		// select a product (user select list input)
		selectedProduct = products[1]; 
		
		// set weight (user text input)
		var weight = 2.1;
		// set harvest date (automatic)
		// set field position (automatic, from gps sensor with phonegap/cordova)
		// set temperature (automatic, from sensor with phonegap/cordova)
		
		// add container to worker's containers list 
		//containerId = uag.data.Workers.addContainer();
		
		//var container = null;
		//containerId = null;
		
	});
	
	it("Should update container from worker's containers list", function() {
		
		//position = new Position(1,2,3);
		
	});
	
});