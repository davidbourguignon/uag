/**@fileOverview uag data user input logic 
 * @author Sébastien Vivier, NSY209, CNAM 
 * @version Copyright (c) 2012
 * */

// producer1's id
var _producerId1 = "producer_id_1";

// producer1 full definition string 
var _jsonProducer1DataString = 
	'{' + 
		'"id":"' + _producerId1 +'",' +  
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
		'],' + 
		'"qualities":' +
		'[' + 
			'{' + 
				'"id":"quality_id_1",' + 
				'"name":"bad",' + 
				'"description":"bad quality"' +  
			'},' + 
			'{' + 
				'"id":"quality_id_2",' + 
				'"name":"poor",' + 
				'"description":"poor quality"' +  
			'},' + 
			'{' + 
				'"id":"quality_id_3",' + 
				'"name":"good",' + 
				'"description":"good quality"' +  
			'},' + 
			'{' + 
				'"id":"quality_id_4",' + 
				'"name":"superior",' + 
				'"description":"superior quality"' +  
			'},' + 
			'{' + 
				'"id":"quality_id_5",' + 
				'"name":"excellent",' + 
				'"description":"excellent quality"' +  
			'}' + 
		']' + 
	'}';


// TODO : producer2 full definition string 
