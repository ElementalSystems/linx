'use strict';

var _    = require("lodash"),
    Type = require("./Type"),
    Safe = require("./Safe"),
    ChainContext    = require("./Chain/ChainContext");



/**
 *
 * Module internal code
 *
 * @type {Object}
 *
 */
var Internal = {};

/**
 *
 * Gets the argument list
 *
 * @param  {Object} argsObj
 * @return {Array}
 *
 */
Internal.getArgumentList = function(argsObj){

    var args = [];

    _.each(argsObj, function(obj, index){
        args.push(obj);
    });

    return args;

};

/**
 *
 * Wraps the chainable function
 *
 * @param {Internal.ChainContext} context
 * @param {Function}    fn
 * @param {Object}      chainableFns
 * @param {Object}      evaluationFns
 * @param {Object}      options
 *
 * @return {Function}
 *
 */
Internal.wrapChainableFunction = function(context, fn, chainableFns, evaluationFns, options){

    options = Safe.object(options);

    return function() {

        var curContext  = context,
            args        = Internal.getArgumentList(arguments);

        /// initialize context if needed
        if(!curContext){
            curContext = new ChainContext(options);
        }

        /// add the function to the curContext
        curContext.add(fn, args);

        /// this is usefull to create "typed" instances of the Chain
        var ChainClass = Safe.function(options.type, Chain);

        return new ChainClass(chainableFns, evaluationFns, options, curContext);

    };

};

/**
 *
 * Wraps a returnable function. The last argument of the function is always the error, or null
 * if doesn't exists.
 *
 * @param {Internal.ChainContext} context
 * @param {Function}    fn
 * @param {Object}      chainableFns
 * @param {Object}      evaluationFns
 * @param {Object}      options
 *
 * @return {Function}
 *
 */
Internal.wrapReturnableFunction = function(context, fn, chainableFns, evaluationFns, options){

    options = Safe.object(options);

    return function() {

        var curContext  = context,
            args        = Internal.getArgumentList(arguments);

        /// initialize context if needed
        if(!curContext){
            curContext = new ChainContext(options);
        }

        var result  = null,
            err     = null;

        /// wrap the arguments to .apply call. The last argument should be the one defined
        /// on the options.
        var _args = [ args.shift() ];

        /// sets the scope of the context
        var scope = curContext.setScope(options.scope);

        try {
            /// execute all the chained functions
            result = curContext.exec(_args, options.argument);
        }
        catch(e){
            err = e;
        }

        /// if its on pipe mode, wrap the result so it can be correctly .apply()
        if(options.pipe){
            result = [ result ];
        }

        /// create the evaluation function arguments
        var fnArgs = Safe.array(result, [ null ])
            /// concat the arguments if they are not undefined
            .concat(Safe.array(args))
            /// concat the argument if is not undefined
            .concat(Safe.array(options.argument))
            /// concat the err as last argument
            .concat([err]);

        return fn.apply(scope, fnArgs);

    };

};

/**
 *
 * Get chain functions
 *
 * @param  {Internal.CurrentAssertionContext} assertionContext
 * @param  {Object} chainableFns
 * @param  {Object} evaluationFns
 * @param  {Object} options
 *
 * @return {Object}
 *
 */
Internal.getChainFunctions = function(context, chainableFns, evaluationFns, options){

    /// merge the default fns and the custom functions
    var fns = _.assign({}, chainableFns);

    /// wrap the chainable functions
    _.each(
        fns,
        function(fn, name){

            if(Type.isFunction(fn)){
                fns[name] = Internal.wrapChainableFunction(context, fn, chainableFns, evaluationFns, options);
            }

        });

    /// wrap the returning functions
    _.each(
        evaluationFns,
        function(fn, name){

            if(Type.isFunction(fn)){
                fns[name] = Internal.wrapReturnableFunction(context, fn, chainableFns, evaluationFns, options);
            }

        });

    return fns;

};

/**
 *
 * Chain constructor
 * @class
 *
 * @param {Object}          chainableFns
 * @param {Object}          evaluationFns
 * @param {Object}          options
 * @param {ChainContext}    context
 *
 * @return {Object}
 *
 *
 * @example
 *
 * new Chain(
 *
 *     /// chainable fns
 *     {
 *         "fn": function(){}
 *     },
 *
 *     /// evaluation fns
 *     {},
 *
 *     /// options fns
 *     {
 *         type         : {},
 *         pipe         : [true|false],
 *         scope        : Function,
 *         argument     : undefined
 *     },
 *
 *     /// context
 *     {}
 *
 * );
 *
 *
 */
var Chain = function(chainableFns, evaluationFns, options, context){

    var scope   = this;

    /// chain the functions
    var fns = Internal.getChainFunctions(context, chainableFns, evaluationFns, options);

    /// initialize this context
    _.each(fns, function(val, key){
        scope[key] = val;
    });

};

Chain.prototype = {};


module.exports = Chain;

