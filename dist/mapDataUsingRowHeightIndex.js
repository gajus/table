'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _wrapString = require('./wrapString');

var _wrapString2 = _interopRequireDefault(_wrapString);

/**
 * @param {Array} unmappedRows
 * @param {Number[]} rowHeightIndex
 * @param {Object} config
 * @return {Array}
 */

exports['default'] = function (unmappedRows, rowHeightIndex, config) {
    var tableWidth = undefined,
        mappedRows = undefined;

    tableWidth = unmappedRows[0].length;

    // console.log(`unmappedRows`, unmappedRows, `rowHeightIndex`, rowHeightIndex, `config`, config, `tableWidth`, tableWidth);

    mappedRows = _lodash2['default'].map(unmappedRows, function (cells, index0) {
        var rowHeight = undefined;

        rowHeight = _lodash2['default'].map(Array(rowHeightIndex[index0]), function () {
            return _lodash2['default'].fill(Array(tableWidth), '');
        });

        // console.log(`rowHeight`, rowHeight);

        // rowHeight
        //     [{row index within rowSaw; index2}]
        //     [{cell index within a virtual row; index1}]

        _lodash2['default'].forEach(cells, function (value, index1) {
            var chunkedValue = undefined;

            chunkedValue = (0, _wrapString2['default'])(value, config.columns[index1].width);

            _lodash2['default'].forEach(chunkedValue, function (part, index2) {
                rowHeight[index2][index1] = part;
            });
        });

        return rowHeight;
    });

    return _lodash2['default'].flatten(mappedRows);
};

module.exports = exports['default'];
//# sourceMappingURL=mapDataUsingRowHeightIndex.js.map
