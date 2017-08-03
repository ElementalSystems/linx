"use strict";

var _       = require("lodash"),
    Divhide = require("./Index.js");

/**
 *
 * Specs main module.
 *
 * This exposes the specs that are on .readme folder. Note that the
 * spec files are included on the generated documentation
 *
 */
var SpecIndex = _.extend({}, Divhide, {

    /**
     *
     * Expose sub-modules. These will be used for unit-tests
     *
     * @type {Object}
     *
     */
    SubModules: {

        Url: {
            Parser: require("./Common/Url/Parser")
        },

        Assert: {
            Array: require("./Common/Assert/Array"),
            Max: require("./Common/Assert/Max"),
            Min: require("./Common/Assert/Min"),
            Number: require("./Common/Assert/Number"),
            Regex: require("./Common/Assert/Regex"),
            Required: require("./Common/Assert/Required"),
            String: require("./Common/Assert/String"),
            Object: require("./Common/Assert/Object"),
            InstanceOf: require("./Common/Assert/InstanceOf"),
        },

        Chain: {
            ChainContext: require("./Common/Chain/ChainContext"),
            ChainFunction: require("./Common/Chain/ChainFunction"),
        },

        Schema: {

            SchemaDefinition: require("./Common/Schema/SchemaDefinition"),

            Mixins: {
                SchemaExecution: require("./Common/Schema/Mixins/SchemaExecution"),
                SchemaExecutionHelper: require("./Common/Schema/Mixins/SchemaExecutionHelper")
            }

        }

    },

    Specs: {

        ArrExample                  : function() { require("../.readme/includes/Arr/ArrExample"); },
        AssertionExample            : function() { require("../.readme/includes/Assertion/AssertionExample"); },
        AssertExample               : function() { require("../.readme/includes/Assert/AssertExample"); },
        ChainExample                : function() { require("../.readme/includes/Chain/ChainExample"); },
        ExceptionDocExample         : function() { require("../.readme/includes/Exception/ExceptionDocExample"); },
        ExceptionListDocExample     : function() { require("../.readme/includes/Exception/ExceptionListDocExample"); },
        I18NStringDocExample        : function() { require("../.readme/includes/I18N/I18NStringDocExample"); },
        ObjExample                  : function() { require("../.readme/includes/Obj/ObjExample"); },
        SafeArrayExample            : function() { require("../.readme/includes/Safe/SafeArrayExample"); },
        SafeBooleanExample          : function() { require("../.readme/includes/Safe/SafeBooleanExample"); },
        SafeFunctionExample         : function() { require("../.readme/includes/Safe/SafeFunctionExample"); },
        SafeLengthExample           : function() { require("../.readme/includes/Safe/SafeLengthExample"); },
        SafeNumberExample           : function() { require("../.readme/includes/Safe/SafeNumberExample"); },
        SafeObjectExample           : function() { require("../.readme/includes/Safe/SafeObjectExample"); },
        SafeRegexExample            : function() { require("../.readme/includes/Safe/SafeRegexExample"); },
        SafeStringExample           : function() { require("../.readme/includes/Safe/SafeStringExample"); },
        SafeValueExample            : function() { require("../.readme/includes/Safe/SafeValueExample"); },
        SchemaAnyExample            : function() { require("../.readme/includes/Schema/SchemaAnyExample"); },
        SchemaArrayExample          : function() { require("../.readme/includes/Schema/SchemaArrayExample"); },
        SchemaNumberExample         : function() { require("../.readme/includes/Schema/SchemaNumberExample"); },
        SchemaObjectExample         : function() { require("../.readme/includes/Schema/SchemaObjectExample"); },
        SchemaOverview              : function() { require("../.readme/includes/Schema/SchemaOverview"); },
        SchemaStringExample         : function() { require("../.readme/includes/Schema/SchemaStringExample"); },
        SchemaSerializationExample  : function() { require("../.readme/includes/Schema/SchemaSerializationExample"); },
        TypeExample                 : function() { require("../.readme/includes/Type/TypeExample"); },

    }

});

module.exports = SpecIndex;
