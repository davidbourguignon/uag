/**@fileOverview uag util logic   
 * @author Sébastien Vivier, NSY209, CNAM  
 * @version Copyright (c) 2012
 * */


//var uag = uag || {};

///**
// * @namespace Holds util functionality
// */
//uag.util = uag.util || {};

// Type object declaration scope
//uag.util = (function(util) {
var uag = (function(parent) {
	"use strict";

	var util = parent.util = parent.util || {}; 
	
	/**
	 * @class Type 
	 * @memberOf uag.util 
	 */
	var Type = function() {};

	/** @description <b>is method</b>, checking object's type
	 * @memberOf uag.util.Type
	 * @static
	 * @private
	 * @param type the type
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	var is = function(type, obj) {
		var classe = Object.prototype.toString.call(obj).slice(8,-1);
		var valid = 
			obj !== undefined &&
			obj !== null &&
			classe === type;
		return valid;
	};

	Type.is = is;
	
	/** @description <b>isArguments method</b>, checking object's type is Arguments
	 * @memberOf uag.util.Type
	 * @static
	 * @public
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	var isArguments = function(obj) {
		return uag.util.Type.is("Arguments",obj);
	};

	Type.isArguments = isArguments; 
	
	/** @description <b>isArray method</b>, checking object's type is Array
	 * @static
	 * @public
	 * @memberOf uag.util.Type
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	var isArray = function(obj) {
		return uag.util.Type.is("Array",obj);
	};

	Type.isArray = isArray;
	
	/** @description <b>isBoolean method</b>, checking object's type is Boolean 
	 * @static
	 * @public
	 * @memberOf uag.util.Type
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	var isBoolean = function(obj) {
		return uag.util.Type.is("Boolean",obj);
	};

	Type.isBoolean = isBoolean;
	
	/** @description <b>isDate method</b>, checking object's type is Date 
	 * @static
	 * @public
	 * @memberOf uag.util.Type
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	var isDate = function(obj) {
		return uag.util.Type.is("Date",obj);
	};

	Type.isDate = isDate;
	
	/** @description <b>isError method</b>, checking object's type is Error 
	 * @static
	 * @public
	 * @memberOf uag.util.Type
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	var isError = function(obj) {
		return uag.util.Type.is("Error",obj);
	};

	Type.isError = isError;
	
	/** @description <b>isFunction method</b>, checking object's type is Function 
	 * @static
	 * @public
	 * @memberOf uag.util.Type
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	var isFunction = function(obj) {
		return uag.util.Type.is("Function",obj);
	};

	Type.isFunction = isFunction;
	
	/** @description <b>isJSON method</b>, checking object's type is JSON 
	 * @static
	 * @public
	 * @memberOf uag.util.Type
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	var isJSON = function(obj) {
		return uag.util.Type.is("JSON",obj);
	};

	Type.isJSON = isJSON;
	
	/** @description <b>isMath method</b>, checking object's type is Math 
	 * @static
	 * @public
	 * @memberOf uag.util.Type
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	var isMath = function(obj) {
		return uag.util.Type.is("Math",obj);
	};

	Type.isMath = isMath;
	
	/** @description <b>isNumber method</b>, checking object's type is Number 
	 * @static
	 * @public
	 * @memberOf uag.util.Type
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	var isNumber = function(obj) {
		return uag.util.Type.is("Number",obj);
	};

	Type.isNumber = isNumber;
	
	/** @description <b>isObject method</b>, checking object's type is Object 
	 * @static
	 * @public
	 * @memberOf uag.util.Type
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	var isObject = function(obj) {
		return uag.util.Type.is("Object",obj);
	};

	Type.isObject = isObject;
	
	/** @description <b>isRegExp method</b>, checking object's type is RegExp 
	 * @static
	 * @public
	 * @memberOf uag.util.Type
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	Type.isRegExp = function(obj) {
		return uag.util.Type.is("RegExp",obj);
	};

	/** @description <b>isString method</b>, checking object's type is String 
	 * @static
	 * @public
	 * @memberOf uag.util.Type
	 * @param obj the object
	 * @returns {Boolean} 
	 */
	var isString = function(obj) {
		return uag.util.Type.is("String",obj);
	};
	
	Type.isString = isString;
	
	//alert(util);
	//alert(Type);
	
	util.Type = Type;
	//alert(util.Type);
	
	parent.util = util; 
	//alert(parent);
	//alert(parent.util);
	//alert(parent.util.Type);
	
	return parent;
	
}(uag || {}));
