/**@fileOverview uag data specification logic 
 * @author Sébastien Vivier, NSY209, CNAM 
 * @version Copyright (c) 2012
 * */


describe("Workers", function() {
	
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
		uag.data.Workers.add(workerName);	

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


describe("Producers",function(){
	
	
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
	
	var _jsonDataString1 = 
		'{' + 
			'"id":"producer_id_1",' +  
			'"name":"producerName",' + 
			'"smartphoneId":"producerSmartphoneId",' +  
			'"farmName":"producerFarmname",' + 
			'"websiteUrl":"http://www.producerDomaine.ext",' +  
			'"workersId":[],' + 
			'"fieldsId":' + 
			'[' + 
				'"field_id_1",' + 
				'"field_id_2",' + 
				'"field_id_3"' + 
			'],' + 
			'"fields":' + 
			'[' + 
				'{' + 
					'"id":"field_id_1",' + 
					'"name":"fieldName1",' + 
					'"description":"fieldDescription1",' +  
					'"producerId":"producer_id_1",' + 
					'"positionId":"position_id_1",' +  
					'"position":{"id":"position_id_1","latitude":1,"longitude":2,"altitude":4},' +
					'"productsId":' + 
					'[' + 
						'"product_id_1",' + 
						'"product_id_2",' + 
						'"product_id_3"' + 
					']' + 
				'},' +  
				'{' + 
					'"id":"field_id_2",' + 
					'"name":"fieldName2",' + 
					'"description":"fieldDescription2",' +  
					'"producerId":"producer_id_1",' + 
					'"positionId":"position_id_2",' +   
					'"position":{"id":"position_id_2","latitude":2,"longitude":4,"altitude":8},' +
					'"productsId":' + 
					'[' + 
						'"product_id_2",' + 
						'"product_id_3"' + 
					']' + 
				'},' +  
				'{' + 
					'"id":"field_id_3",' + 
					'"name":"fieldName3",' + 
					'"description":"fieldDescription3",' +  
					'"producerId":"producer_id_1",' + 
					'"positionId":"position_id_3",' +   
					'"position":{"id":"position_id_3","latitude":3,"longitude":6,"altitude":12},' +
					'"productsId":' + 
					'[' + 
						'"product_id_3",' + 
						'"product_id_4",' + 
						'"product_id_5",' + 
						'"product_id_6"' + 
					']' + 
				'}' +  
			'],' + 
			'"productsId":' + 
			'[' + 
				'"product_id_1",' + 
				'"product_id_2",' + 
				'"product_id_3",' + 
				'"product_id_4",' + 
				'"product_id_5",' + 
				'"product_id_6"' + 
			'],' + 
			'"products":' + 
			'[' + 
				'{' +
					'"id":"product_id_1",' + 
					'"name":"productName1",' + 
					'"description":"productDescription1"' +  
				'},' + 
				'{' +
					'"id":"product_id_2",' + 
					'"name":"productName2",' + 
					'"description":"productDescription2"' +  
				'},' + 
				'{' +
					'"id":"product_id_3",' + 
					'"name":"productName3",' + 
					'"description":"productDescription3"' +  
				'},' + 
				'{' +
					'"id":"product_id_4",' + 
					'"name":"productName4",' + 
					'"description":"productDescription4"' +  
				'},' + 
				'{' +
					'"id":"product_id_5",' + 
					'"name":"productName5",' + 
					'"description":"productDescription5"' +  
				'},' + 
				'{' +
					'"id":"product_id_6",' + 
					'"name":"productName6",' + 
					'"description":"productDescription6"' +  
				'}' + 
			']' + 
		'}';


	
	it("Should import data to local storage", function() {
		
		uag.data.Producers.clear();
		
		//var key = uag.data.Producers.getLocalStorageKey();		
		uag.data.Import.set(_jsonDataString1);
		//var producers = localStorage.getItem(key);
		//alert(producers);
		
		var jsonData = JSON.parse(_jsonDataString1);
		
		var producer = new uag.data.model.Producer(jsonData);
		
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
	
});
