'use strict';

var _lodashObjectAssign2 = require('lodash/object/assign');

var _lodashObjectAssign3 = _interopRequireDefault(_lodashObjectAssign2);

var _lodashUtilityTimes2 = require('lodash/utility/times');

var _lodashUtilityTimes3 = _interopRequireDefault(_lodashUtilityTimes2);

var _lodashLangIsUndefined2 = require('lodash/lang/isUndefined');

var _lodashLangIsUndefined3 = _interopRequireDefault(_lodashLangIsUndefined2);

var _lodashLangCloneDeep2 = require('lodash/lang/cloneDeep');

var _lodashLangCloneDeep3 = _interopRequireDefault(_lodashLangCloneDeep2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _getBorderCharacters = require('./getBorderCharacters');

var _getBorderCharacters2 = _interopRequireDefault(_getBorderCharacters);

var _validateStreamConfig = require('./validateStreamConfig');

var _validateStreamConfig2 = _interopRequireDefault(_validateStreamConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var makeBorder = undefined,
    makeColumns = undefined;

/**
 * Merges user provided border characters with the default border ("honeywell") characters.
 *
 * @param {Object} border
 * @returns {Object}
 */
makeBorder = function () {
    var border = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _lodashObjectAssign3['default'])({}, (0, _getBorderCharacters2['default'])('honeywell'), border);
};

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 *
 * @param {number} columnCount
 * @param {Object} columns
 * @param {Object} columnDefault
 * @returns {Object}
 */
makeColumns = function (columnCount) {
    var columns = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
    var columnDefault = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

    (0, _lodashUtilityTimes3['default'])(columnCount, function (index) {
        if ((0, _lodashLangIsUndefined3['default'])(columns[index])) {
            columns[index] = {};
        }

        columns[index] = (0, _lodashObjectAssign3['default'])({
            alignment: 'left',
            // width: columnDefault.width,
            wrapWord: false,
            truncate: Infinity,
            paddingLeft: 1,
            paddingRight: 1
        }, columnDefault, columns[index]);
    });

    return columns;
};

/**
 * @typedef {Object} columnConfig
 * @property {string} alignment
 * @property {number} width
 * @property {number} truncate
 * @property {number} paddingLeft
 * @property {number} paddingRight
 */

/**
 * @typedef {Object} streamConfig
 * @property {columnConfig} columnDefault
 * @property {Object} border
 * @property {columnConfig[]}
 * @property {number} columnCount Number of columns in the table (required).
 */

/**
 * Makes a new configuration object out of the userConfig object
 * using default values for the missing configuration properties.
 *
 * @param {streamConfig} userConfig
 * @returns {Object}
 */

exports['default'] = function () {
    var userConfig = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    var config = undefined;

    (0, _validateStreamConfig2['default'])(userConfig);

    config = (0, _lodashLangCloneDeep3['default'])(userConfig);

    if (!config.columnDefault || !config.columnDefault.width) {
        throw new Error('Must provide config.columnDefault.width when creating a stream.');
    }

    if (!config.columnCount) {
        throw new Error('Must provide config.columnCount.');
    }

    config.border = makeBorder(config.border);
    config.columns = makeColumns(config.columnCount, config.columns, config.columnDefault);

    return config;
};

module.exports = exports['default'];
//# sourceMappingURL=makeStreamConfig.js.map
