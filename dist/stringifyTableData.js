'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * Casts all cell values to a string.
 *
 * @param {table~row[]} rows
 * @return {table~row[]}
 */

exports['default'] = function (rows) {
    return _lodash2['default'].map(rows, function (cells) {
        return _lodash2['default'].map(cells, String);
    });
};

module.exports = exports['default'];
//# sourceMappingURL=stringifyTableData.js.map
