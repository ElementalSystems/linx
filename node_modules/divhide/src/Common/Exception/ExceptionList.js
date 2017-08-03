"use strict";

var _               = require("lodash"),
    Type            = require("../Type"),
    Safe            = require("../Safe"),
    Exception       = require("./Exception");

/**
 *
 * Get the stack trace
 *
 * @return {String}
 *
 */
var getStackTrace = function(){

    var error    = new Error(),
        stackStr = Safe.string(error.stack),
        stack    = stackStr.split('\n');

    /// Remove Error message + 2 first lines of the stack trace
    stack.splice(0,3);

    return stack.join('\n');

};

/**
 *
 * Error class that can contain multiple errors
 * @class
 *
 */
var ExceptionList = function() {

    /// instance of error
    var items  = [];

    /// get the stack trace
    var stack = getStackTrace();

    /// define the this.stack to return the created Error
    /// stack
    Object.defineProperty(
        this,
        'stack', {
        get: function() {
            return this.toString() + "\n" + stack;
        }
    });

    Object.defineProperty(
        this,
        "message",
        {
            get: function(){
                return this.toString();
            },
            configurable: false
        }
    );

    Object.defineProperty(
        this,
        "items",
        {
            get: function(){
                return _.clone(items);
            },
            configurable: false
        }
    );

    Object.defineProperty(
        this,
        "length",
        {
            get: function(){
                return items.length;
            },
            configurable: false
        }
    );

    /**
     *
     * Adds an element to the error list
     *
     * @throws {Error} If invalid argument
     *
     * @param {*} errors
     *
     */
    this.push = function(errors){

        var scope = this;

        /// if argument is an ExceptionList
        if(errors instanceof ExceptionList){
            errors = errors.items;
        }

        /// make sure errors is an array
        errors = Safe.array(errors);

        /// adds the elements to the list
        _.each(
            errors,
            function(error){

                /// if error is on string format add it as an Exception
                if( Type.isString(error) ){
                    error = new Exception(error);
                }

                if( !(error instanceof Error) ){
                    throw new Error("Expected instance of type Error");
                }

                items.push(error);

            });

    };

    /**
     *
     * Clear the error list
     *
     * @return
     *
     */
    this.clear = function(){
        while(items.length) items.pop();
    };

    /**
     *
     * ToString
     *
     * @param {Object} translations
     *
     * @return {String}
     *
     */
    this.toString = function(translations){

        var str         = "",
            length      = items.length,
            separator   = ", ";

        _.each(
            items,
            function(error, index){

                if(error instanceof Exception){
                    str += error.toString(translations);
                }
                else {
                    str += error.toString();
                }

                /// add the separator if its not the last element
                if(index != length-1){
                    str += separator;
                }

            });

        return str;

    };

};

ExceptionList.prototype = new Error();
ExceptionList.prototype.constructor = ExceptionList;


module.exports = ExceptionList;
