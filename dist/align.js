'use strict';

var _lodashLangIsString2 = require('lodash/lang/isString');

var _lodashLangIsString3 = _interopRequireDefault(_lodashLangIsString2);

var _lodashLangIsNumber2 = require('lodash/lang/isNumber');

var _lodashLangIsNumber3 = _interopRequireDefault(_lodashLangIsNumber2);

var _lodashStringRepeat2 = require('lodash/string/repeat');

var _lodashStringRepeat3 = _interopRequireDefault(_lodashStringRepeat2);

var _lodashMathFloor2 = require('lodash/math/floor');

var _lodashMathFloor3 = _interopRequireDefault(_lodashMathFloor2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var alignments = undefined;

alignments = ['left', 'right', 'center'];

/**
 * @param {String} subject
 * @param {Number} containerWidth
 * @param {String} alignment (left, right, center)
 * @return {String}
 */

exports['default'] = function (subject, containerWidth, alignment) {
    var availableWidth = undefined,
        halfAvailableWidth = undefined,
        subjectWidth = undefined;

    if (!(0, _lodashLangIsString3['default'])(subject)) {
        throw new Error('Subject parameter value must be a string.');
    }

    if (!(0, _lodashLangIsNumber3['default'])(containerWidth)) {
        throw new Error('Container width parameter value must be a number.');
    }

    subjectWidth = (0, _stringWidth2['default'])(subject);

    if (subjectWidth > containerWidth) {
        throw new Error('Subject parameter value width cannot be greater than the container width.');
    }

    if (!(0, _lodashLangIsString3['default'])(alignment)) {
        throw new Error('Alignment parameter value must be a string.');
    }

    if (alignments.indexOf(alignment) === -1) {
        throw new Error('Alignment parameter value must be a known alignment parameter value (left, right, center).');
    }

    availableWidth = containerWidth - subjectWidth;

    if (alignment === 'left') {
        return subject + (0, _lodashStringRepeat3['default'])(' ', availableWidth);
    }

    if (alignment === 'right') {
        return (0, _lodashStringRepeat3['default'])(' ', availableWidth) + subject;
    }

    halfAvailableWidth = availableWidth / 2;

    if (halfAvailableWidth % 2 === 0) {
        return (0, _lodashStringRepeat3['default'])(' ', halfAvailableWidth) + subject + (0, _lodashStringRepeat3['default'])(' ', halfAvailableWidth);
    } else {
        halfAvailableWidth = (0, _lodashMathFloor3['default'])(halfAvailableWidth);

        return (0, _lodashStringRepeat3['default'])(' ', halfAvailableWidth) + subject + (0, _lodashStringRepeat3['default'])(' ', halfAvailableWidth + 1);
    }
};

module.exports = exports['default'];
//# sourceMappingURL=align.js.map