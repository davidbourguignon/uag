/**@fileOverview uag data specification logic 
 * @author Sébastien Vivier, NSY209, CNAM 
 * @version Copyright (c) 2012
 * */
	
 
describe("workers", function() {
	
	it("Should ... ", function() {
				
		var workers = null;
		var workerName = "workerName";
		var workerGetAll = null;
		var workerFindById = null;
		
		// unset local storage
		uag.data.workers.clear();
		
		// fetch data 
		workers = uag.data.workers.getAll();
		
		expect(Array.isArray(workers)).toEqual(true);
		expect(workers.length).toEqual(0);
		
		// add worker 
		uag.data.workers.add(workerName);	
		
		//alert(localStorage.getItem("workers"));

		// fetch all data
		workers = uag.data.workers.getAll();
		
		expect(Array.isArray(workers)).toEqual(true);
		expect(workers.length).toEqual(1);
		
		//alert(workers[0].getId());
		workerGetAll = workers[0];
		expect(workerGetAll.getName()).toEqual(workerName);
		
		
		// find worker by id
		workerFindById = uag.data.workers.findById(workerGetAll.getId());
		
		
		expect(workerGetAll.getId()).toEqual(workerFindById.getId());
		expect(workerGetAll.getName()).toEqual(workerFindById.getName());
		expect(workerGetAll.getSmartphoneId()).toEqual(workerFindById.getSmartphoneId());
		
		//expect(workerGetAll).toEqual(workerFindById);
		
		//expect(workerGetAll.).toEqual(workerFindById.);
		
		
	});
	
});