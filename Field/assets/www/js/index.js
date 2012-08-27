/**
 * @fileOverview index javascript logic  
 * @author Sébastien Vivier, NSY209, CNAM  
 * @version Copyright (c) 2012
 * */

//alert("index.js");

$(document).bind('mobileinit', function() {
	alert("mobileinit");
});

$(document).bind('pageinit', function() {
	//alert("pageinit");
});

/*$(document).bind("pagebeforeload", function(event, data) {
	alert("pagebeforeload");
});

$(document).bind("pageload", function(event, data) {
	alert("pageload");
});*/

$(document).bind("pagebeforechange", function(event, data) {
	//alert("pagebeforechange");
});

$(document).bind("pagechange", function(event, data) {
	alert("pagechange");
});
