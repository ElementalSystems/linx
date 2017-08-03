"use strict";

var Messages = {};

/**
 *
 * Invalid value
 *
 * @type {String}
 *
 */
Messages.VALIDATION_INVALID_VALUE = "<%= value %> is invalid.";

/**
 *
 * Required value
 *
 * @type {String}
 */
Messages.VALIDATION_REQUIRED = "Value is required.";

/**
 *
 * Array expected
 *
 * @type {String}
 *
 */
Messages.VALIDATION_TYPE = "'<%= expected %>' was expected but found '<%= value %>' instead.";

/**
 *
 * Max exceed
 *
 * @type {String}
 *
 */
Messages.VALIDATION_MAX = "The maximum value allowed is <%= value %>.";

/**
 *
 * Min exceed
 *
 * @type {String}
 *
 */
Messages.VALIDATION_MIN = "The minimum value allowed is <%= value %>.";

/**
 *
 * Min exceed
 *
 * @type {String}
 *
 */
Messages.REGEXP = "Regular expression '<%= value %>' doesn't match.";

/**
 *
 * Invalid List lenght
 *
 * @type {String}
 *
 */
Messages.VALIDATION_INVALID_LIST_LENGTH = "Expected list with <%= expected %> items but found <%= value %>.";

/**
 *
 * Invalid List
 *
 * @type {String}
 *
 */
Messages.VALIDATION_INVALID_LIST_LENGTH_MULTIPLE_OF = "Expected list length to be multiple of <%= expected %> but found length of <%= value %>.";

/**
 *
 * Invalid List
 *
 * @type {String}
 *
 */
Messages.VALIDATION_INSTANCEOF = "Expected instance of '<%= value %>'.";

module.exports = Messages;
