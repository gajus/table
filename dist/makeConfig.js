'use strict';

var _lodashLangCloneDeep2 = require('lodash/lang/cloneDeep');

var _lodashLangCloneDeep3 = _interopRequireDefault(_lodashLangCloneDeep2);

var _lodashObjectAssign2 = require('lodash/object/assign');

var _lodashObjectAssign3 = _interopRequireDefault(_lodashObjectAssign2);

var _lodashUtilityTimes2 = require('lodash/utility/times');

var _lodashUtilityTimes3 = _interopRequireDefault(_lodashUtilityTimes2);

var _lodashLangIsUndefined2 = require('lodash/lang/isUndefined');

var _lodashLangIsUndefined3 = _interopRequireDefault(_lodashLangIsUndefined2);

var _lodashObjectMapValues2 = require('lodash/object/mapValues');

var _lodashObjectMapValues3 = _interopRequireDefault(_lodashObjectMapValues2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _border = require('./border');

var _border2 = _interopRequireDefault(_border);

var _validateConfig = require('./validateConfig');

var _validateConfig2 = _interopRequireDefault(_validateConfig);

var _calculateMaximumColumnValueIndex = require('./calculateMaximumColumnValueIndex');

var _calculateMaximumColumnValueIndex2 = _interopRequireDefault(_calculateMaximumColumnValueIndex);

/**
 * @param {Array[]} rows
 * @param {Object} inputConfig
 * @return {Object}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (rows) {
    var inputConfig = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var config = undefined,
        maximumColumnValueIndex = undefined;

    config = (0, _lodashLangCloneDeep3['default'])(inputConfig);

    (0, _validateConfig2['default'])(rows, config);

    if (!config.border) {
        config.border = {};
    }

    config.border = (0, _lodashObjectAssign3['default'])({}, _border2['default'], config.border);

    maximumColumnValueIndex = (0, _calculateMaximumColumnValueIndex2['default'])(rows);

    if (!config.column) {
        config.column = {};
    }

    (0, _lodashUtilityTimes3['default'])(rows[0].length, function (index) {
        if ((0, _lodashLangIsUndefined3['default'])(config.column[index])) {
            config.column[index] = {};
        }
    });

    config.column = (0, _lodashObjectMapValues3['default'])(config.column, function (column, index0) {
        if ((0, _lodashLangIsUndefined3['default'])(column.minWidth) || maximumColumnValueIndex[index0] > config.column[index0].minWidth) {
            column.minWidth = maximumColumnValueIndex[index0];
        }

        if ((0, _lodashLangIsUndefined3['default'])(column.alignment)) {
            column.alignment = 'left';
        }

        if ((0, _lodashLangIsUndefined3['default'])(column.maxWidth)) {
            column.maxWidth = Infinity;
        } else if (column.maxWidth < column.minWidth) {
            column.minWidth = column.maxWidth;
        }

        return column;
    });

    return config;
};

module.exports = exports['default'];
//# sourceMappingURL=makeConfig.js.map