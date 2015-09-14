'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _border = require('./border');

var _border2 = _interopRequireDefault(_border);

var _drawTable = require('./drawTable');

var _drawTable2 = _interopRequireDefault(_drawTable);

var _calculateColumnSizeIndex = require('./calculateColumnSizeIndex');

var _calculateColumnSizeIndex2 = _interopRequireDefault(_calculateColumnSizeIndex);

var _makeConfig = require('./makeConfig');

var _makeConfig2 = _interopRequireDefault(_makeConfig);

var _calculateRowSpanIndex = require('./calculateRowSpanIndex');

var _calculateRowSpanIndex2 = _interopRequireDefault(_calculateRowSpanIndex);

var _mapDataUsingRowSpanIndex = require('./mapDataUsingRowSpanIndex');

var _mapDataUsingRowSpanIndex2 = _interopRequireDefault(_mapDataUsingRowSpanIndex);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

var _align = require('./align');

var _align2 = _interopRequireDefault(_align);

var _validateData = require('./validateData');

var _validateData2 = _interopRequireDefault(_validateData);

/**
 * @typedef {String} table~cell
 */

/**
 * @typedef {table~cell[]} table~row
 */

/**
 * @typedef {Object} table~configColumn
 * @property {String} alignment
 * @property {Number} minWidth
 * @property {Number} maxWidth
 */

/**
 * @typedef {Object} table~config
 * @property {table~configColumn[]} column Column specific configuration.
 */

/**
 * Transforms data rows to rows fit for printing in the CLI. Transformation consists of
 * enforcing a fixed text width for values that are shorter than columnWidth and
 * breaking values that are longer than columnWidth into two or more rows.
 *
 * The current implementation assumes RTL text alignment.
 *
 * @param {table~row[]} rows
 * @param {table~config} config
 * @return {Array[]}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (rows) {
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var derivedConfig = undefined,
        safeData = undefined,
        rowSpanIndex = undefined,
        columnSizeIndex = undefined,
        dataMappedUsingRowSpanIndex = undefined;

    (0, _validateData2['default'])(rows);

    safeData = (0, _lodashCollectionMap3['default'])(rows, function (columns) {
        return (0, _lodashCollectionMap3['default'])(columns, String);
    });

    // console.log(`safeData`, safeData);

    derivedConfig = (0, _makeConfig2['default'])(safeData, config);

    // console.log(`derivedConfig`, derivedConfig);

    rowSpanIndex = (0, _calculateRowSpanIndex2['default'])(safeData, derivedConfig);

    // console.log(`rowSpanIndex`, rowSpanIndex);

    dataMappedUsingRowSpanIndex = (0, _mapDataUsingRowSpanIndex2['default'])(safeData, rowSpanIndex, derivedConfig);

    // console.log(`dataMappedUsingRowSpanIndex`, dataMappedUsingRowSpanIndex);

    dataMappedUsingRowSpanIndex = (0, _lodashCollectionMap3['default'])(dataMappedUsingRowSpanIndex, function (cells, index0) {
        return (0, _lodashCollectionMap3['default'])(cells, function (value, index1) {
            var column = undefined;

            column = derivedConfig.column[index1];

            // console.log(column);

            if ((0, _stringWidth2['default'])(value) === column.maxWidth) {
                return value;
            } else {
                return (0, _align2['default'])(value, column.minWidth, column.alignment);
            }
        });
    });

    columnSizeIndex = (0, _calculateColumnSizeIndex2['default'])(dataMappedUsingRowSpanIndex[0]);

    // console.log(`columnSizeIndex`, columnSizeIndex);

    return (0, _drawTable2['default'])(dataMappedUsingRowSpanIndex, _border2['default'], columnSizeIndex, rowSpanIndex);
};

module.exports = exports['default'];
//# sourceMappingURL=table.js.map