'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

/**
 * Calculates width of each cell contents.
 *
 * @param {string[]} cells
 * @return {number[]}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (cells) {
    return (0, _lodashCollectionMap3['default'])(cells, function (value) {
        return (0, _stringWidth2['default'])(value);
    });
};

module.exports = exports['default'];
//# sourceMappingURL=calculateCellWidthIndex.js.map
