"use strict";

var _       = require("lodash"),
    Safe    = require("../../Safe");

/**
 *
 * Serialization methods for SchemaDefinition.
 *
 * @scope {SchemaDefinition}
 * 
 * @type {Object}
 *
 */
var Serialization = function(){

    /**
     *
     * Serializes the schema definition.
     *
     * @return {Object}
     *
     */
    this.serialize = function(){
        return _.cloneDeep(this);
    };

    /**
     *
     * Deserializes the object into a SchemaDefinition
     *
     * @return {SchemaDefinition}
     *
     */
    this.deserialize = function(value){
        return new this.constructor(value);
    };

};

module.exports = Serialization;