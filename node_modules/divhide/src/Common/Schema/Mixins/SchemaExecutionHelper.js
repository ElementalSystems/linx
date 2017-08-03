"use strict";

var _                   = require("lodash"),
    Safe                = require("../../Safe"),
    Type                = require("../../Type"),
    Assert              = require("../../Assert"),
    ExceptionList       = require("../../Exception/ExceptionList"),
    Exception           = require("../../Exception/Exception"),
    Types               = require("../Types");
    

/**
 *
 * Prepares and validates the SchemaDefinition for the given 
 * value.
 *
 * @throw {ExceptionList}
 *
 * @param  {SchemaDefinition} schema
 * @param  {*}      value
 * @param  {Object} validationFns
 *
 * @return {SchemaDefinition}
 *
 */
var prepareSchema = function(schema, value, validationFns){

    value           = Safe.value(value);
    validationFns   = Safe.object(validationFns);

    /* jshint -W064 */
    var errors = new ExceptionList();

    /// If not defined and its required throw
    /* jshint -W041 */
    if(schema.required && value == null){
        errors.push(
            new Exception("VALIDATION_REQUIRED"));
    }
    /* jshint -W041 */
    else if(!schema.required && value == null){
        /// continue (optional parameter)
    }
    /// check for compatibility of types if any flag is not used
    else if(!schema.any && Type.of(schema.schema) !== Type.of(value)){
        errors.push(
            new Exception("VALIDATION_TYPE", { expected: Type.of(schema.schema), value: Type.of(value) }));
    }

    /// if there's error throw them
    if(errors.length){
        throw errors;
    }

    return schema;

};

/**
 *
 * Prepares and validates the SchemaDefinition for the given 
 * object.
 *
 * @throws {ExceptionList} If a validation function occurs
 * 
 * @param  {SchemaDefinition} schema
 * @param  {Object} value
 *
 * @return {SchemaDefinition}
 *
 */
var prepareObject = function(schema, value){

    value = Safe.object(value);

    /* jshint -W064 */
    var errors      = new ExceptionList(),
        result      = {},
        valueKeys   = _.keys(value);

    _.each(
        schema.schema,
        function(schemaValue, key){

            var isRegExp = Type.isRegExpStr(key),
                keys     = [];

            /// key is not a regexp string
            if(!isRegExp){
                keys = [ key ];
            }
            else {
                /// key is a regexp string
                var regexp  = Safe.regexp(key);
                keys = _.filter(
                    valueKeys,
                    function(key){

                        /// if there's a definition of the schema don't include it
                        if(schema.schema[key] !== undefined){
                            return false;
                        }

                        /// test if the regex match
                        return !!regexp.exec(key);

                    });
            }

            _.each(keys, function(val) {
                result[val] = schemaValue;
            });

        });

    return schema.clone({
        schema: result
    });

};

/**
 *
 * Prepares and validates the SchemaDefinition for the given 
 * array.
 *
 * @throws {ExceptionList} If a validation error occurs
 *
 * @param  {SchemaDefinition} schema
 * @param  {Array} value
 *
 * @return {SchemaDefinition}
 *
 */
var prepareArray = function(schema, value){

    value = Safe.array(value);

    /* jshint -W064 */
    var errors  = new ExceptionList(),
        result  = [],
        index   = 0;

    if( !schema.repeatable && schema.schema.length != value.length ){
        errors.push(
            new Exception("VALIDATION_INVALID_LIST_LENGTH", { value: value.length, expected: schema.schema.length }));
    }

    if(schema.repeatable){

        var isRepeatable = true;

        /// if the value contains elements check if its divisible by 
        /// the repeat count
        if(value.length > 0 && value.length != schema.schema.length){
            isRepeatable = value.length % schema.schema.length === 0;
        }
        /// otherwise is only repeatable if the array contains no 
        /// element
        else {
            isRepeatable = (value.length === schema.schema.length) && (value.length === 0);
        }

        if(!isRepeatable){
            errors.push(
                new Exception("VALIDATION_INVALID_LIST_LENGTH_MULTIPLE_OF", { value: value.length, expected: schema.schema.length }));    
        }
        
    }

    /// if errors exist throw them
    if(errors.length){
        throw errors;
    }

    /// create the result array
    for(var i=0; i<value.length; i++){

        if(schema.repeatable && index >= schema.schema.length){
            index = 0;
        }

        result.push(schema.schema[index++]);

    }

    return schema.clone({
        schema: result
    });

};

/**
 *
 * Schema Conversion conversion methods
 * 
 * @type {Object}
 * 
 */
var SchemaExecutionHelper = {

    /**
     *
     * Get the value according to the given schema, by applying 
     * default values, coercing values, ...
     *
     * @throws {ExceptionList} If the validation fails
     * 
     * @param  {SchemaDefinition} schema
     * @param  {*} value
     *
     * @return {*}
     *
     */
    prepareValue: function(schema, value, validationFns){

        /// validate and normalize arguments
        Assert.instanceOf(Types.SchemaDefinition)
            .assert(schema);

        value = Safe.value(value);

        /// initalize the list of errors
        var errors = new ExceptionList();

        /// if not strict tries to normalize
        /// the value (e.g. a number can be on string representation )
        if(!schema.strict){
            value = Safe.coerce(value, schema.schema);
        }

        /// if the value is required and it has no value, throw error
        /* jshint -W041 */
        if(schema.required && value == null){
            errors.push(
                new Exception("VALIDATION_REQUIRED"));
        }
        else if(!schema.required && value == null){
            /// ignore, and not fallback on the other else's
        }
        /// if a value exists find out if types are compatible
        else if(!schema.any && Type.of(schema.schema) !== Type.of(value)){
            errors.push(
                new Exception("VALIDATION_TYPE", { expected: Type.of(schema.schema), value: Type.of(value) }));
        }

        /// always run if value is required or value is specified.
        if(schema.required || value !=null){

            _.each(
                schema.validations,
                function(v){

                    v = Safe.object(v);

                    var fn      = Safe.function(validationFns[v.name]),
                        args    = Safe.array(v.args);

                    try{
                        fn.apply({}, [value].concat(args));
                    }catch(e){
                        var error = new Exception(e.message);
                        errors.push(error);
                    }

            });

        }

        /// check if any error was detected
        if(errors.length){
            throw errors;
        }

        return value;

    },

    /**
     *
     * Gets the schema for the given value. If the schema is an object it 
     * will expand its keys regular expressions. If the schema is an array 
     * it will apply its properties to the given value.
     *
     * @throws {ExceptionList} If a validation error occurs
     *
     * @param  {SchemaDefinition} schema
     * @param  {*}      value
     * @param  {Object} validationFns
     * 
     * @return {SchemaDefinition}
     * 
     */
    prepareSchema: function(schema, value, validationFns){

        Assert.instanceOf(Types.SchemaDefinition)
            .assert(schema);

        /// prepare the schema
        schema = prepareSchema(schema, value, validationFns);

        /// prepare the object
        if(schema.isObject()){
            return prepareObject(schema, value);
        }
        /// prepare the array
        else if(schema.isArray()){
            return prepareArray(schema, value);
        }

        return schema;

    }

};

module.exports = SchemaExecutionHelper;
