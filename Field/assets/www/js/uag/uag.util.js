/**@fileOverview uag util logic   
 * @author Sébastien Vivier, NSY209, CNAM  
 * @version Copyright (c) 2012
 * */

// Holds util functionality 
uag.util = uag.util || {};
//console.log('uag data (in uag.data.js) : ' + uag.data);
	
/**
 * @class Type 
 */
var Type = function() {};

/** @description <b>is method</b>, checking object's type
 * @static
 * @private
 * @param type the type
 * @param obj the object
 * @returns {Boolean} 
 */
Type.is = function(type, obj) {
	var classe = Object.prototype.toString.call(obj).slice(8,-1);
	var valid = 
		obj !== undefined &&
		obj !== null &&
		classe === type;
	return valid;
};

/** @description <b>isArguments method</b>, checking object's type is Arguments
 * @static
 * @public
 * @param obj the object
 * @returns {Boolean} 
 */
Type.isArguments = function(obj) {
	return uag.util.Type.is("Arguments",obj);
};

/** @description <b>isArray method</b>, checking object's type is Array
 * @static
 * @public
 * @param obj the object
 * @returns {Boolean} 
 */
Type.isArray = function(obj) {
	return uag.util.Type.is("Array",obj);
};

/** @description <b>isBoolean method</b>, checking object's type is Boolean 
 * @static
 * @public
 * @param obj the object
 * @returns {Boolean} 
 */
Type.isBoolean = function(obj) {
	return uag.util.Type.is("Boolean",obj);
};

/** @description <b>isDate method</b>, checking object's type is Date 
 * @static
 * @public
 * @param obj the object
 * @returns {Boolean} 
 */
Type.isDate = function(obj) {
	return uag.util.Type.is("Date",obj);
};

/** @description <b>isError method</b>, checking object's type is Error 
 * @static
 * @public
 * @param obj the object
 * @returns {Boolean} 
 */
Type.isError = function(obj) {
	return uag.util.Type.is("Error",obj);
};

/** @description <b>isFunction method</b>, checking object's type is Function 
 * @static
 * @public
 * @param obj the object
 * @returns {Boolean} 
 */
Type.isFunction = function(obj) {
	return uag.util.Type.is("Function",obj);
};

/** @description <b>isJSON method</b>, checking object's type is JSON 
 * @static
 * @public
 * @param obj the object
 * @returns {Boolean} 
 */
Type.isJSON = function(obj) {
	return uag.util.Type.is("JSON",obj);
};

/** @description <b>isMath method</b>, checking object's type is Math 
 * @static
 * @public
 * @param obj the object
 * @returns {Boolean} 
 */
Type.isMath = function(obj) {
	return uag.util.Type.is("Math",obj);
};

/** @description <b>isNumber method</b>, checking object's type is Number 
 * @static
 * @public
 * @param obj the object
 * @returns {Boolean} 
 */
Type.isNumber = function(obj) {
	return uag.util.Type.is("Number",obj);
};

/** @description <b>isObject method</b>, checking object's type is Object 
 * @static
 * @public
 * @param obj the object
 * @returns {Boolean} 
 */
Type.isObject = function(obj) {
	return uag.util.Type.is("Object",obj);
};

/** @description <b>isRegExp method</b>, checking object's type is RegExp 
 * @static
 * @public
 * @param obj the object
 * @returns {Boolean} 
 */
Type.isRegExp = function(obj) {
	return uag.util.Type.is("RegExp",obj);
};

/** @description <b>isString method</b>, checking object's type is String 
 * @static
 * @public
 * @param obj the object
 * @returns {Boolean} 
 */
Type.isString = function(obj) {
	return uag.util.Type.is("String",obj);
};

// uag.util.Type object definition association    
uag.util.Type = Type;
