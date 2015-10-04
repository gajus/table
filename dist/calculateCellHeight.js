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
 * @param {string} value
 * @param {number} columnWidth
 * @returns {number}
 */

exports['default'] = function (value, columnWidth) {
    if (!_lodash2['default'].isString(value)) {
        throw new Error('Value must be a string.');
    }

    // @todo Replace with _.isString (https://github.com/lodash/lodash/issues/1503).
    if (!Number.isInteger(columnWidth)) {
        throw new Error('Column width must be an integer.');
    }

    if (columnWidth < 1) {
        throw new Error('Column width must be greater than 0.');
    }

    return _lodash2['default'].ceil((0, _stringWidth2['default'])(value) / columnWidth);
};

module.exports = exports['default'];
//# sourceMappingURL=calculateCellHeight.js.map
