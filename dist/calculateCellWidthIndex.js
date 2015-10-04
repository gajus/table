'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

/**
 * Calculates width of each cell contents.
 *
 * @param {string[]} cells
 * @return {number[]}
 */

exports['default'] = function (cells) {
    return _lodash2['default'].map(cells, function (value) {
        return (0, _stringWidth2['default'])(value);
    });
};

module.exports = exports['default'];
//# sourceMappingURL=calculateCellWidthIndex.js.map
