'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

var _lodashArrayFill2 = require('lodash/array/fill');

var _lodashArrayFill3 = _interopRequireDefault(_lodashArrayFill2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _makeConfig = require('./makeConfig');

var _makeConfig2 = _interopRequireDefault(_makeConfig);

/* eslint-disable no-loop-func */

var _ansiSlice = require('ansi-slice');

var _ansiSlice2 = _interopRequireDefault(_ansiSlice);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

var _align = require('./align');

var _align2 = _interopRequireDefault(_align);

/**
 * @typedef formatData~columnConfig
 * @property {String} align
 * @property {Number} minWidth
 * @property {Number} maxWidth
 */

/**
 * @typedef formatData~config
 * @property {formatData~columnConfig[]} columnConfig Column specific configuration.
 */

/**
 * Transforms data rows to rows fit for printing in the CLI. Transformation consists of
 * enforcing a fixed text width for values that are shorter than columnWidth and
 * breaking values that are longer than columnWidth into two or more rows.
 *
 * The current implementation assumes RTL text alignment.
 *
 * @param {Array[]} rows
 * @param {formatData~config} config
 * @return {Array[]}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (rows) {
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var derivedConfig = undefined,
        formattedData = undefined,
        index0 = undefined;

    index0 = 0;

    formattedData = (0, _lodashCollectionMap3['default'])(rows, function (columns) {
        return (0, _lodashCollectionMap3['default'])(columns, function (cell) {
            return String(cell);
        });
    });

    derivedConfig = (0, _makeConfig2['default'])(formattedData, config);

    var _loop = function () {
        var nextRow = undefined,
            row = undefined;

        row = formattedData[index0];

        formattedData[index0] = (0, _lodashCollectionMap3['default'])(formattedData[index0], function (value, index1) {
            var columnConfig = undefined;

            columnConfig = derivedConfig.columnConfig[index1];

            if ((0, _stringWidth2['default'])(value) > columnConfig.maxWidth) {
                if (!nextRow) {
                    nextRow = (0, _lodashArrayFill3['default'])([], '', 0, row.length);

                    formattedData.splice(index0 + 1, 0, nextRow);
                }

                nextRow[index1] = (0, _ansiSlice2['default'])(value, columnConfig.maxWidth);

                return (0, _ansiSlice2['default'])(value, 0, columnConfig.maxWidth);
            }

            return (0, _align2['default'])(value, columnConfig.minWidth, columnConfig.alignment);
        });

        index0++;
    };

    while (index0 < formattedData.length) {
        _loop();
    }

    return formattedData;
};

module.exports = exports['default'];
//# sourceMappingURL=formatData.js.map