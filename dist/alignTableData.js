'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _alignString = require('./alignString');

var _alignString2 = _interopRequireDefault(_alignString);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @return {table~row[]}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (rows, config) {
    return (0, _lodashCollectionMap3['default'])(rows, function (cells, index0) {
        return (0, _lodashCollectionMap3['default'])(cells, function (value, index1) {
            var column = undefined;

            column = config.column[index1];

            if ((0, _stringWidth2['default'])(value) === column.width) {
                return value;
            } else {
                return (0, _alignString2['default'])(value, column.width, column.alignment);
            }
        });
    });
};

module.exports = exports['default'];
//# sourceMappingURL=alignTableData.js.map
