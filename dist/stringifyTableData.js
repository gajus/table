'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Casts all cell values to a string.
 *
 * @param {table~row[]} rows
 * @return {table~row[]}
 */

exports['default'] = function (rows) {
    return (0, _lodashCollectionMap3['default'])(rows, function (cells) {
        return (0, _lodashCollectionMap3['default'])(cells, String);
    });
};

module.exports = exports['default'];
//# sourceMappingURL=stringifyTableData.js.map
