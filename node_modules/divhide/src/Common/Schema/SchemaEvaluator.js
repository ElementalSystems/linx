"use strict";


var _                       = require("lodash"),
    Type                    = require("../Type"),
    Safe                    = require("../Safe"),
    ExceptionList           = require("../Exception/ExceptionList"),
    Types                   = require("./Types"),
    SchemaDefinition        = require("./SchemaDefinition");

/**
 *
 * @class
 * The schema evaluator facade. This will serve as interface to the Schema
 * execution.
 *
 * @param {*}       schema
 * @param {Object}  validationFns
 * @param {Object}  cOptions        The SchemaDefinition compilation options
 *
 */
var SchemaEvaluator = function(schema, validationFns, cOptions){

    /* jshint -W064 */
    /**
     *
     * The compiled schema
     *
     * @type {SchemaDefinition}
     * 
     */
    schema = SchemaDefinition(schema, cOptions);

    /**
     *
     * The custom validation functions
     *
     * @type {Object}
     *
     */
    validationFns = Safe.object(validationFns);

    /**
     *
     * SchemaEvaluator external API
     *
     * @type {Object}
     *
     */
    var self = {

        /**
         *
         * Evaluate and get the errors
         *
         * @param  {*}      value
         * @param  {Object} validationFns
         *
         * @return {[Error]}
         *
         */
        errors: function(value){

            var result = schema.execute(value, validationFns);
            return result.getErrors();

        },

        /**
         *
         * Tests if the schema is valid against the given value.
         *
         * @param  {*}  value
         *
         * @return {Boolean}
         *
         */
        isValid: function(value){

            var result = schema.execute(value, validationFns);
            return result.isValid();

        },

        /**
         *
         * Gets the value after applying the schema.
         *
         * @throws {ExceptionList}
         *
         * @param  {*} value
         *
         * @return {*}
         *
         */
        value: function(value){

            var result = schema.execute(value, validationFns);

            if(!result.isValid()){
                throw result.getErrors();
            }

            return result.getValue();

        },

        /**
         *
         * Serialize the current Schema
         *
         * @return {Object}
         *
         */
        serialize: function(){

            return schema.serialize();

        },

        /**
         *
         * Deserialize the value. Returns a new instance of SchemaEvaluator.
         *
         * @return {SchemaEvaluator}
         *
         */
        deserialize: function(value){

            /// use a prepare option that builds the SchemaDefinition to 
            /// avoid fallback on the Default object builder
            var cOptions = {
                prepare: function(val){
                    
                    /// make sure that that the return value is a SchemaDefinition
                    /// NOTE: don't compile the inner structures because the SchemaEvaluator will 
                    /// do it
                    if(!Type.instanceOf(val, Types.SchemaDefinition)){
                        return SchemaDefinition(val, { compile: false });    
                    }

                    return val;
                    
                }
            };

            return new SchemaEvaluator(value, validationFns, cOptions);

        }

    };

    return new Types.SchemaEvaluator(self);

};


module.exports = SchemaEvaluator;
