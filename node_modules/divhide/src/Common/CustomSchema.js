'use strict';

var _                        = require("lodash"),
    Type                     = require("./Type"),
    Safe                     = require("./Safe"),
    Chain                    = require("./Chain"),
    ChainContext             = require("./Chain/ChainContext"),
    Types                    = require("./Schema/Types"),
    SchemaDefinition         = require("./Schema/SchemaDefinition"),
    SchemaEvaluator          = require("./Schema/SchemaEvaluator");

/**
 *
 * Internal methods wrapper
 *
 * @type {Object}
 *
 */
var Internal = {};

/**
 *
 * Wraps the validation functions in order to change the SchemaDefinition context
 * when applied.
 *
 * @param  {String} name
 *
 * @return {ValidationFunction}
 *
 */
Internal.wrapValidationFunction = function(name){

    /// arguments normalization
    name = Safe.string(name);

    /// return the wrapped function
    return function(){

        /// get the actual arguments
        var args = _.toArray(arguments);

        /// first argument is the eval object, so discard it.
        args.shift();
        
        /// last argument is the chain argument option, so discard it
        args.pop();

        /// add the value definition to the SchemaDefinition list
        this.validations.push({
            name: name,
            args: args
        });

    };

};

/**
 *
 * SchemaDefinition compile options.
 *
 * @type {Object}
 * 
 */
Internal.compileOptions = {

    /**
     *
     * Prepare the given value for the SchemaDefinition 
     * conversion. If the value is instance of Schema get 
     * its SchemaDefinition value for the conversions
     *
     * @param  {*} val
     * 
     * @return {*}
     * 
     */
    prepare: function(val){

        if(Type.instanceOf(val, Types.Schema)){
            var schemaData = val.serialize();
            val = new SchemaDefinition(schemaData, { 
                prepare: function(val){
                    return new SchemaDefinition(val, { compile: false });
                }
            });
        }

        return val;

    }

};

/**
 *
 * The Schema Chainable functions
 *
 * @type {Object}
 *
 */
var SchemaChainableFns = {

    any: function(){
        this.any = true;
        this.schema = null;
    },

    strict: function(){
        this.strict = true;
    },

    string : function(val, obj){
        this.schema = "";
        this.required = true;
        this.any = false;
    },

    object : function(val, obj){
        obj = Safe.object(obj, {});
        this.schema = obj;
        this.required = true;
        this.any = false;
    },

    array : function(val, obj){
        obj = Safe.array(obj, []);
        this.schema = obj;
        this.required = true;
        this.any = false;
    },

    function : function(){
        this.schema = function(){};
        this.required = true;
        this.any = false;
    },

    number : function(){
        this.schema = 0;
        this.required = true;
        this.any = false;
    },

    boolean : function(){
        this.schema = Boolean(true);
        this.required = true;
        this.any = false;
    },

    default : function(val, defaultValue){
        this.default = defaultValue;
    },

    required : function(){
        this.required = true;
    },

    optional : function(){
        this.required = false;
    },

    repeatable: function(){
        this.repeatable = true;
    }

};

/**
 *
 * The default Custom Chainable Functions
 *
 * @type {Object}
 *
 */
var CustomChainableFns = {
    "min": require("./Assert/Min"),
    "max": require("./Assert/Max"),
    "regex": require("./Assert/Regex"),
};

/**
 *
 * The evaluation functions
 *
 * @type {Object}
 *
 */
var EvaluationFns = {

    /**
     *
     * Compile the rule and return the facade
     *
     * @return {SchemaEvaluator}
     *
     */
    compile: function(result, argument, err){

        /// throw error if there was some in the chain
        if(err){
            throw err;
        }

        return new SchemaEvaluator(this, argument, Internal.compileOptions);

    },

    /**
     *
     * Apply the schema rules and return the value.
     *
     * @throws {Error} If the value is invalid
     *
     * @param  {*}      result
     * @param  {Object} argument
     * @return {*}
     *
     */
    value: function(result, argument, err){

        /// throw error if there was some in the chain
        if(err){
            throw err;
        }

        var r = new SchemaEvaluator(this, argument, Internal.compileOptions);
        return r.value(result);

    },

    /**
     *
     * Get the list of errors
     *
     * @param  {*}      result
     * @param  {Object} argument
     * @return {*}
     *
     */
    errors: function(result, argument, err){

        /// throw error if there was some in the chain
        if(err){
            throw err;
        }

        var r = new SchemaEvaluator(this, argument, Internal.compileOptions);
        return r.errors(result);

    },

    /**
     *
     * Check if the object is valid
     *
     * @param  {*}      result
     * @param  {Object} argument
     * @return {Boolean}
     *
     */
    isValid: function(result, argument, err){

        /// throw error if there was some in the chain
        if(err) {
            throw err;
        }

        var r = new SchemaEvaluator(this, argument, Internal.compileOptions);
        return r.isValid(result);

    },

    /**
     *
     * Serialize the schema rule
     *
     * @return {Object}
     *
     */
    serialize: function(result, argument, err){

        var evaluator = new SchemaEvaluator(this, argument, Internal.compileOptions);
        return evaluator.serialize();

    },

    /**
     *
     * Deserialize from the schema from the given value.
     *
     * @return {SchemaEvaluator}
     *
     */
    deserialize: function(value, argument, err){

        var evaluator = new SchemaEvaluator(this, argument, Internal.compileOptions);
        return evaluator.deserialize(value);

    }

};

/**
 *
 * Schema Chain Facility
 *
 * @param {Object} customFns
 *
 *
 */
var Schema = function(customFns){

    customFns = Safe.object(customFns);

    /// get the Schema validation functions. This is an extension point
    /// for the schema validation.
    var validationFns = _.extend({}, customFns, CustomChainableFns);

    /// Get the current ChainContext of the assertion, in order
    /// to keep the assertion state.
    var chainContext = null;
    _.each(arguments, function(arg){
        if(arg instanceof ChainContext){
            chainContext = arg;
            return false;
        }
    });

    /// if there's no chain context initialize the default functions by
    /// wrapping them in a compatible API
    if(!chainContext){

        /// assign the default validation functions
        var schemaFns = _.extend({}, SchemaChainableFns);

        /// transform the custom validation functions, to use the Schema
        /// runner
        var wrappedFns = _.extend({}, CustomChainableFns, customFns);
        _.each(wrappedFns, function(fn, name){
            wrappedFns[name] = Internal.wrapValidationFunction(name);
        });

        /// give precedence to schemaFns
        customFns = _.extend(wrappedFns, schemaFns);

    }

    /// the chain options
    var chainOptions = {

        /// do not pipe the chainable fns objects
        pipe: false,

        /// Use the Schema type for each chaninable return statement
        type: Schema,

        /// set the scope for each chainable function execution.
        scope: function() {
            return new SchemaDefinition(null, { compile: false });
        },

        /// Evaluation argument. This argument will be present in every
        /// evalFn invocation without interfere with the chain scope.
        argument: validationFns

    };

    /// Inherit from Chains
    Chain.apply(this, [ customFns, EvaluationFns, chainOptions, chainContext ]);

    return new Types.Schema(this);

};

module.exports = Schema;
