"use strict";

var _       = require("lodash"),
    Safe    = require("../Safe");


/**
 *
 * Internal methdos
 *
 * @type {Object}
 *
 */
var Internal = {};

/**
 *
 * Apply the template. The scope of the function is the string.
 *
 * @throws {Error} If template data its missing or wrong
 *
 * @param  {String} name
 * @param  {Object} data
 * @param  {Object} messages
 * @param  {Object} customMessages
 *
 * @return {String}
 *
 */
Internal.applyTemplate = function(name, data, messages, customMessages){

    name            = Safe.string(name);
    data            = Safe.object(data);
    messages        = Safe.object(messages);
    customMessages  = Safe.object(customMessages);

    messages = _.extend({}, messages, customMessages);

    var tmplStr = Safe.string(messages[name]) || name;

    return _.template(tmplStr)(data);

};

/**
 *
 * Template String class. Each string is identified by a name. The template string
 * can be changed when calling toString.
 *
 * @param {String} name
 * @param {Object} data
 * @param {Object} messages
 *
 * @example
 * var str = new I18nString("asas", {}, {});
 *
 */
var I18NString = function(name, data, messages){

    name        = Safe.string(name);
    data        = Safe.object(data);
    messages    = Safe.object(messages);

    /**
     *
     * toString()
     *
     * @throws {Error} If template is not correct
     *
     * @param  {String} messages
     * @param  {Object} data
     * @return {String}
     *
     */
    this.toString = function(customMessages){

        try{

            return Internal.applyTemplate.apply(this, [ name, data, messages, customMessages ]);

        } catch(e){

            var error = _.template(
                "Error on template '<%= name %>': <%= error %>")({
                    name: name,
                    error: e.message
                });

            throw new Error(error);

        }

    };

    /// Initialize string by calling .super()
    String.call( this, this.toString() );

};

/// inherit from String
/* jshint -W053 */
I18NString.prototype = new String();
I18NString.prototype.constructor = I18NString;

module.exports = I18NString;
