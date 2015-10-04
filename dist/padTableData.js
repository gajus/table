'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

var _lodashStringRepeat2 = require('lodash/string/repeat');

var _lodashStringRepeat3 = _interopRequireDefault(_lodashStringRepeat2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @return {table~row[]}
 */

exports['default'] = function (rows, config) {
    return (0, _lodashCollectionMap3['default'])(rows, function (cells, index0) {
        return (0, _lodashCollectionMap3['default'])(cells, function (value, index1) {
            var column = undefined;

            column = config.columns[index1];

            return (0, _lodashStringRepeat3['default'])(' ', column.paddingLeft) + value + (0, _lodashStringRepeat3['default'])(' ', column.paddingRight);
        });
    });
};

module.exports = exports['default'];
//# sourceMappingURL=padTableData.js.map
