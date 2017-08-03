"use strict";

var _               = require("lodash"),
    Types           = require("./Types"),
    Type            = require("../Type"),
    Safe            = require("../Safe"),
    Assert          = require("../Assert");

/**
 *
 * Default conversion between the value and a SchemaDefinition.
 * This converts a primitive value to a SchemaDefinition with defaults
 * value.
 *
 * @type {Object}
 *
 */
var Defaults = {

    array: function(value){

        if(!Type.isArray(value)){
            return;
        }

        // no default value and its required!
        value = new SchemaDefinition({
            schema: value,
            required: true
        });

        return value;

    },

    object: function(value){

        if(!Type.isObject(value)){
            return;
        }

        // no default value and its required!
        value = new SchemaDefinition({
            schema: value,
            required: true
        });

        return value;

    },

    string: function(value){

        if(!Type.isString(value)){
            return;
        }

        // no default value and its required!
        value = new SchemaDefinition({
            schema: "",
            required: true
        });

        return value;

    },

    number: function(value){

        if(!Type.isNumber(value)){
            return;
        }

        // no default value and its required!
        value = new SchemaDefinition({
            schema: 0,
            required: true
        });

        return value;

    },

    boolean: function(value){

        if(!Type.isBoolean(value)){
            return;
        }

        // no default value and its required!
        value = new SchemaDefinition({
            schema: Boolean(value),
            required: true
        });

        return value;

    },

    function: function(value){

        if(!Type.isFunction(value)){
            return;
        }

        // no default value and its required!
        value = new SchemaDefinition({
            schema: function(){},
            required: true
        });

        return value;

    },

};

/**
 *
 * Normalize the schema value in order to avoid storing unnecessary 
 * data and keep the values consistent across usages.
 * 
 * @param  {String} value
 * @return {*}
 * 
 */
var normalizeSchemaValue = function(value){

    value = Safe.value(value);

    if(Type.isString(value)){
        return "";
    }

    if(Type.isNumber(value)){
        return 0;
    }

    if(Type.isBoolean(value)){
        return true;
    }

    return value;

};

/**
 *
 * Compile the given schema definition or compatible 
 * structure.
 *
 * @param {*}       schema
 * @param {Object}  options
 *
 * @return {SchemaDefinition}
 *
 */
var compile = function(schema, options){

    /// extensibility point - prepare the value before the 
    /// compilation
    schema = options.prepare(schema);

    /// apply the defaults and create the SchemaDefinition if an object 
    /// has been provided
    if(!Type.instanceOf(schema, Types.SchemaDefinition)){
        schema = Defaults.object(schema) || Defaults.array(schema) ||
                Defaults.string(schema) || Defaults.number(schema) ||
                Defaults.boolean(schema) || Defaults.function(schema);
    }

    /// convert the schema
    var isArray  = Type.isArray(schema.schema),
        isObject = Type.isObject(schema.schema);

    /// iterate over the structure in order to compile the schema
    if(isArray || isObject){

        _.each(schema.schema, function(val, index){
            var innerSchema = compile(val, options);
            schema.schema[index] = innerSchema;
        });

    }

    return schema;

};

/**
 *
 * A SchemaDefinition class. Contains all the rules that should be applied when
 * evaluating it against a value.
 *
 * @param {Object} options
 *
 */
var SchemaDefinition = function(options){

    options = Safe.object(options);

    /**
     *
     * SchemaDefinition module API
     * 
     * @type {Object}
     * 
     */
    var self = {

        /**
         *
         * The type of schema
         *
         * @type {SchemaDefinition}
         *
         */
        schema: normalizeSchemaValue(options.schema),

        /**
         *
         * Flag that enables strict convertion.
         *
         * @type {Boolean}
         *
         */
        strict: Safe.boolean(options.strict, false),

        /**
         *
         * Any flag. This means that any value is accepted.
         *
         * @type {Boolean}
         *
         */
        any: Safe.boolean(options.any, false),

        /**
         *
         * The default value of the schema
         *
         * @type {*}
         */
        default: options.default,

        /**
         *
         * IsRequired flag
         *
         * @type {Boolean}
         *
         */
        required: Safe.boolean(options.required, true),

        /**
         *
         * Repeatable flag. This means, e.g. if the schema is an array the inner schema can
         * be repeatable by elements.
         *
         * @type {Boolean}
         */
        repeatable: Safe.boolean(options.repeatable),

        /**
         *
         * The validation functions to apply to this Schema node. Each validation function is
         * represented by: { name: 'fn', args: '' }
         *
         * @type {Array}
         *
         */
        validations: Safe.array(options.validations),

    };

    return new Types.SchemaDefinition(self);

};

/**
 *
 * @class
 * A SchemaDefinition compiled class. This represents a fully compiled 
 * instance of all inner structures that represents a Schema.
 *
 * A full iteration over the entire schema structure will be performed.
 * 
 * @param {Object} options  The SchemaDefinition data 
 * @param {Object} cOptions The compilation options
 *
 */
var CompiledSchemaDefinition = function(options, cOptions){

    /// normalize the given compilation options
    cOptions = Safe.object(cOptions);
    cOptions.compile = Safe.boolean(cOptions.compile, true);
    cOptions.prepare = Safe.function(cOptions.prepare, function(v){ return v; });

    /* jshint -W064 */
    var schema = SchemaDefinition(options);

    /// traverse the schema structure compiling its inner elements
    if(cOptions.compile){
        return compile(schema, cOptions);    
    }
    
    return schema;

};

/// include type checking Mixin
require("./Mixins/SchemaType")
    .call(Types.SchemaDefinition.prototype);

/// include clone Mixin functionality
require("./Mixins/SchemaClone")
    .apply(Types.SchemaDefinition.prototype, [ CompiledSchemaDefinition ]);

/// include execution Mixin functionality
require("./Mixins/SchemaExecution")
    .call(Types.SchemaDefinition.prototype);

/// include serialization functionality
require("./Mixins/SchemaSerialization")
    .call(Types.SchemaDefinition.prototype);

module.exports = CompiledSchemaDefinition;
