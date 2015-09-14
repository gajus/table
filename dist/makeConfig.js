'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

var _lodashLangIsUndefined2 = require('lodash/lang/isUndefined');

var _lodashLangIsUndefined3 = _interopRequireDefault(_lodashLangIsUndefined2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _validateConfig = require('./validateConfig');

var _validateConfig2 = _interopRequireDefault(_validateConfig);

var _calculateMaximumColumnValueIndex = require('./calculateMaximumColumnValueIndex');

var _calculateMaximumColumnValueIndex2 = _interopRequireDefault(_calculateMaximumColumnValueIndex);

/**
 * @param {Array[]} rows
 * @param {formatData~config} config
 * @return {formatData~config}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (rows) {
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var maximumColumnValueIndex = undefined;

    (0, _validateConfig2['default'])(rows, config);

    maximumColumnValueIndex = (0, _calculateMaximumColumnValueIndex2['default'])(rows);

    config.columnConfig = config.columnConfig || Array(rows[0].length);

    config.columnConfig = (0, _lodashCollectionMap3['default'])(config.columnConfig, function (column, index0) {
        if (column === undefined) column = {};

        if ((0, _lodashLangIsUndefined3['default'])(column.minWidth) || maximumColumnValueIndex[index0] > config.columnConfig[index0].minWidth) {
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