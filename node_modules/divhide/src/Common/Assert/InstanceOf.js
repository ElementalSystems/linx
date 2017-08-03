'use strict';

var _           = require("lodash"),
    Type        = require("../Type"),
    Exception   = require("../Exception/Exception");

/**
 *
 * Get function name
 * 
 * @param  {Function} fn
 * @return {String}
 * 
 */
var getFnName = function(fun) {

	var ret = fun.toString();
	ret = ret.substr('function '.length);
	ret = ret.substr(0, ret.indexOf('('));
	return ret;

};


/**
 *
 * InstanceOf assertion. 
 *
 * @throws {Exception}
 *
 * @param {*} val
 * @param {*} value
 * 
 * @return {*}
 *
 */
var InstanceOf = function(val, value){

	/// test with instanceof
	if(!Type.instanceOf(val, value)){
		throw new Exception("VALIDATION_INSTANCEOF", { value: getFnName(value) });
	}

    return val;

};

module.exports = InstanceOf;
