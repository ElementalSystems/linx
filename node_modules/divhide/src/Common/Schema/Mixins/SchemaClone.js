"use strict";


var _                 = require("lodash"),
    Assert            = require("../../Assert"),
    Types             = require("../Types");

/**
 *
 * Schema clone methods
 *
 * @type {Object}
 *
 */
var SchemaClone = function(Class){

    /**
     *
     * Clone the current schema. If `options` is defined it will override the
     * current instance data of the new SchemaDefinition.
     * 
     * @param  {Object} options
     * @return {Class}
     * 
     */
    this.clone = function(options){

        Assert.instanceOf(Types.SchemaDefinition)
            .assert(this);

        var instance = new Class(
            _.extend({}, this, options));

        return instance;

    };

};

module.exports = SchemaClone;

