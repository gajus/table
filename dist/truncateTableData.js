'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

var _lodashStringTrunc2 = require('lodash/string/trunc');

var _lodashStringTrunc3 = _interopRequireDefault(_lodashStringTrunc2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @todo Make it work with ASCII content.
 * @param {table~row[]} rows
 * @param {Object} config
 * @return {table~row[]}
 */

exports['default'] = function (rows, config) {
    return (0, _lodashCollectionMap3['default'])(rows, function (cells) {
        return (0, _lodashCollectionMap3['default'])(cells, function (content, index) {
            return (0, _lodashStringTrunc3['default'])(content, {
                length: config.columns[index].truncate
            });
        });
    });
};

module.exports = exports['default'];
//# sourceMappingURL=truncateTableData.js.map
