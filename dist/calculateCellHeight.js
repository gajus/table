'use strict';

var _lodashLangIsString2 = require('lodash/lang/isString');

var _lodashLangIsString3 = _interopRequireDefault(_lodashLangIsString2);

var _lodashMathCeil2 = require('lodash/math/ceil');

var _lodashMathCeil3 = _interopRequireDefault(_lodashMathCeil2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

var _wrapWord = require('./wrapWord');

var _wrapWord2 = _interopRequireDefault(_wrapWord);

/**
 * @param {string} value
 * @param {number} columnWidth
 * @param {boolean} useWrapWord
 * @returns {number}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (value, columnWidth) {
    var useWrapWord = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    if (!(0, _lodashLangIsString3['default'])(value)) {
        throw new Error('Value must be a string.');
    }

    // @todo Replace with _.isString (https://github.com/lodash/lodash/issues/1503).
    if (!Number.isInteger(columnWidth)) {
        throw new Error('Column width must be an integer.');
    }

    if (columnWidth < 1) {
        throw new Error('Column width must be greater than 0.');
    }

    if (useWrapWord) {
        return (0, _wrapWord2['default'])(value, columnWidth).length;
    }

    return (0, _lodashMathCeil3['default'])((0, _stringWidth2['default'])(value) / columnWidth);
};

module.exports = exports['default'];
//# sourceMappingURL=calculateCellHeight.js.map
