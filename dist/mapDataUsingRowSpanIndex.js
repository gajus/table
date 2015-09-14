'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

var _lodashArrayFill2 = require('lodash/array/fill');

var _lodashArrayFill3 = _interopRequireDefault(_lodashArrayFill2);

var _lodashCollectionForEach2 = require('lodash/collection/forEach');

var _lodashCollectionForEach3 = _interopRequireDefault(_lodashCollectionForEach2);

var _lodashArrayFlatten2 = require('lodash/array/flatten');

var _lodashArrayFlatten3 = _interopRequireDefault(_lodashArrayFlatten2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _ansiSlice = require('ansi-slice');

var _ansiSlice2 = _interopRequireDefault(_ansiSlice);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

var _chunk = require('./chunk');

var _chunk2 = _interopRequireDefault(_chunk);

/**
 * @param {Array} unmappedRows
 * @param {Number[]} rowSpanIndex
 * @param {Object} config
 * @return {Array}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (unmappedRows, rowSpanIndex, config) {
    var tableWidth = undefined,
        mappedRows = undefined;

    tableWidth = unmappedRows[0].length;

    // console.log(`unmappedRows`, unmappedRows, `rowSpanIndex`, rowSpanIndex, `config`, config, `tableWidth`, tableWidth);

    mappedRows = (0, _lodashCollectionMap3['default'])(unmappedRows, function (cells, index0) {
        var rowSpan = undefined;

        rowSpan = (0, _lodashCollectionMap3['default'])(Array(rowSpanIndex[index0]), function () {
            return (0, _lodashArrayFill3['default'])(Array(tableWidth), '');
        });

        // console.log(`rowSpan`, rowSpan);

        // rowSpan
        //     [{row index within rowSaw; index2}]
        //     [{cell index within a virtual row; index1}]

        (0, _lodashCollectionForEach3['default'])(cells, function (value, index1) {
            var chunkedValue = undefined;

            chunkedValue = (0, _chunk2['default'])(value, config.column[index1].maxWidth);

            (0, _lodashCollectionForEach3['default'])(chunkedValue, function (part, index2) {
                rowSpan[index2][index1] = part;
            });
        });

        return rowSpan;
    });

    return (0, _lodashArrayFlatten3['default'])(mappedRows);
};

module.exports = exports['default'];
//# sourceMappingURL=mapDataUsingRowSpanIndex.js.map