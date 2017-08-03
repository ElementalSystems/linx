'use strict';

var Common = {

    /**
     *
     * Type utility
     *
     * @type {Object}
     *
     */
    Type: require("./Common/Type"),

    /**
     *
     * Safe utility
     *
     * @type {Object}
     *
     */
    Safe: require("./Common/Safe"),

    /**
     *
     * Array utility
     *
     * @type {Object}
     *
     */
    Arr: require("./Common/Arr"),

    /**
     *
     * Object utility
     *
     * @type {Object}
     *
     */
    Obj: require("./Common/Obj"),

    /**
     *
     * I18N utility
     *
     * @type {Object}
     *
     */
    I18N: {

        /**
         *
         * I18NString utility
         *
         * @type {I18NString}
         *
         */
        String: require("./Common/I18N/String"),

    },

    /**
     *
     * Exceptions package
     *
     * @type {Object}
     *
     */
    Exception: {

        /**
         *
         * Exception Class
         *
         * @type {Exception}
         *
         */
        Exception: require("./Common/Exception/Exception"),

        /**
         *
         * ExceptionList
         *
         * @type {ExceptionList}
         *
         */
        ExceptionList: require("./Common/Exception/ExceptionList"),

    },

    /**
     *
     * Url utility
     *
     * @type {Function}
     *
     */
    Url: require("./Common/Url"),

    /**
     *
     * Chain facility
     *
     * @type {Object}
     *
     */
    Chain: require("./Common/Chain"),

    /**
     *
     * Default Assertion instance utility. This provides access to the default
     * Assert functions.
     *
     * @type {Object}
     *
     */
    Assert: require("./Common/Assert"),

    /**
     *
     * Assertion utility
     *
     * @type {Function}
     *
     */
    Assertion: require("./Common/Assertion"),

    /**
     *
     * Schema utility
     *
     * @type {Object}
     *
     */
    Schema: require("./Common/Schema"),

    /**
     *
     * Custom Schema
     *
     * @type {Object}
     *
     */
    CustomSchema: require("./Common/CustomSchema"),


};

module.exports = Common;
