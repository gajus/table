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

var _chunkString = require('./chunkString');

var _chunkString2 = _interopRequireDefault(_chunkString);

/**
 * @param {Array} unmappedRows
 * @param {Number[]} rowHeightIndex
 * @param {Object} config
 * @return {Array}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (unmappedRows, rowHeightIndex, config) {
    var tableWidth = undefined,
        mappedRows = undefined;

    tableWidth = unmappedRows[0].length;

    // console.log(`unmappedRows`, unmappedRows, `rowHeightIndex`, rowHeightIndex, `config`, config, `tableWidth`, tableWidth);

    mappedRows = (0, _lodashCollectionMap3['default'])(unmappedRows, function (cells, index0) {
        var rowHeight = undefined;

        rowHeight = (0, _lodashCollectionMap3['default'])(Array(rowHeightIndex[index0]), function () {
            return (0, _lodashArrayFill3['default'])(Array(tableWidth), '');
        });

        // console.log(`rowHeight`, rowHeight);

        // rowHeight
        //     [{row index within rowSaw; index2}]
        //     [{cell index within a virtual row; index1}]

        (0, _lodashCollectionForEach3['default'])(cells, function (value, index1) {
            var chunkedValue = undefined;

            chunkedValue = (0, _chunkString2['default'])(value, config.columns[index1].width);

            (0, _lodashCollectionForEach3['default'])(chunkedValue, function (part, index2) {
                rowHeight[index2][index1] = part;
            });
        });

        return rowHeight;
    });

    return (0, _lodashArrayFlatten3['default'])(mappedRows);
};

module.exports = exports['default'];
//# sourceMappingURL=mapDataUsingRowHeightIndex.js.map
