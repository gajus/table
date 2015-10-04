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

var _validateConfig = require('./validateConfig');

var _validateConfig2 = _interopRequireDefault(_validateConfig);

var _calculateMaximumColumnWidthIndex = require('./calculateMaximumColumnWidthIndex');

var _calculateMaximumColumnWidthIndex2 = _interopRequireDefault(_calculateMaximumColumnWidthIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var makeBorder = undefined,
    makeColumns = undefined;

/**
 * Merges user provided border characters with the default border ("honeywell") characters.
 *
 * @param {Object} border
 * @return {Object}
 */
makeBorder = function () {
    var border = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _lodashObjectAssign3['default'])({}, (0, _getBorderCharacters2['default'])('honeywell'), border);
};

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 *
 * @param {Array[]} rows
 * @param {Object} columns
 * @return {Object}
 */
makeColumns = function (rows) {
    var columns = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var maximumColumnWidthIndex = undefined;

    maximumColumnWidthIndex = (0, _calculateMaximumColumnWidthIndex2['default'])(rows);

    (0, _lodashUtilityTimes3['default'])(rows[0].length, function (index) {
        if ((0, _lodashLangIsUndefined3['default'])(columns[index])) {
            columns[index] = {};
        }

        if ((0, _lodashLangIsUndefined3['default'])(columns[index].alignment)) {
            columns[index].alignment = 'left';
        }

        if ((0, _lodashLangIsUndefined3['default'])(columns[index].width)) {
            columns[index].width = maximumColumnWidthIndex[index];
        }

        if ((0, _lodashLangIsUndefined3['default'])(columns[index].paddingLeft)) {
            columns[index].paddingLeft = 1;
        }

        if ((0, _lodashLangIsUndefined3['default'])(columns[index].paddingRight)) {
            columns[index].paddingRight = 1;
        }
    });

    return columns;
};

/**
 * Makes a new configuration object out of the userConfig object
 * using default values for the missing configuration properties.
 *
 * @param {Array[]} rows
 * @param {Object} userConfig
 * @return {Object}
 */

exports['default'] = function (rows) {
    var userConfig = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var config = undefined;

    (0, _validateConfig2['default'])(userConfig);

    config = (0, _lodashLangCloneDeep3['default'])(userConfig);

    config.border = makeBorder(config.border);
    config.columns = makeColumns(rows, config.columns);

    return config;
};

module.exports = exports['default'];
//# sourceMappingURL=makeConfig.js.map
