"use strict";

var Type = require("../../Type");

/**
 *
 * Schema type methods
 *
 * @scope {SchemaDefinition}
 * 
 * @type {Object}
 *
 */
var SchemaType = function(){

    /**
     *
     * Checks if the schema is an array
     * 
     * @return {Boolean}
     * 
     */
    this.isArray = function(){
        return Type.isArray(this.schema);
    };

    /**
     *
     * Checks if the schema is an object
     * 
     * @return {Boolean}
     * 
     */
    this.isObject = function(){
        return Type.isObject(this.schema);
    };

};

module.exports = SchemaType;
