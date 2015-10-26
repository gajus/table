'use strict';

var _lodashStringRepeat2 = require('lodash/string/repeat');

var _lodashStringRepeat3 = _interopRequireDefault(_lodashStringRepeat2);

var _lodashMathFloor2 = require('lodash/math/floor');

var _lodashMathFloor3 = _interopRequireDefault(_lodashMathFloor2);

var _lodashLangIsString2 = require('lodash/lang/isString');

var _lodashLangIsString3 = _interopRequireDefault(_lodashLangIsString2);

var _lodashLangIsNumber2 = require('lodash/lang/isNumber');

var _lodashLangIsNumber3 = _interopRequireDefault(_lodashLangIsNumber2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var alignCenter = undefined,
    alignLeft = undefined,
    alignRight = undefined,
    alignments = undefined;

alignments = ['left', 'right', 'center'];

/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */
alignLeft = function (subject, width) {
    return subject + (0, _lodashStringRepeat3['default'])(' ', width);
};

/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */
alignRight = function (subject, width) {
    return (0, _lodashStringRepeat3['default'])(' ', width) + subject;
};

/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */
alignCenter = function (subject, width) {
    var halfWidth = undefined;

    halfWidth = width / 2;

    if (halfWidth % 2 === 0) {
        return (0, _lodashStringRepeat3['default'])(' ', halfWidth) + subject + (0, _lodashStringRepeat3['default'])(' ', halfWidth);
    } else {
        halfWidth = (0, _lodashMathFloor3['default'])(halfWidth);

        return (0, _lodashStringRepeat3['default'])(' ', halfWidth) + subject + (0, _lodashStringRepeat3['default'])(' ', halfWidth + 1);
    }
};

/**
 * Pads a string to the left and/or right to position the subject
 * text in a desired alignment within a container.
 *
 * @param {string} subject
 * @param {number} containerWidth
 * @param {string} alignment (left, right, center)
 * @returns {string}
 */

exports['default'] = function (subject, containerWidth, alignment) {
    var availableWidth = undefined,
        subjectWidth = undefined;

    if (!(0, _lodashLangIsString3['default'])(subject)) {
        throw new Error('Subject parameter value must be a string.');
    }

    if (!(0, _lodashLangIsNumber3['default'])(containerWidth)) {
        throw new Error('Container width parameter value must be a number.');
    }

    subjectWidth = (0, _stringWidth2['default'])(subject);

    if (subjectWidth > containerWidth) {
        // console.log('subjectWidth', subjectWidth, 'containerWidth', containerWidth, 'subject', subject);

        throw new Error('Subject parameter value width cannot be greater than the container width.');
    }

    if (!(0, _lodashLangIsString3['default'])(alignment)) {
        throw new Error('Alignment parameter value must be a string.');
    }

    if (alignments.indexOf(alignment) === -1) {
        throw new Error('Alignment parameter value must be a known alignment parameter value (left, right, center).');
    }

    if (subjectWidth === 0) {
        return (0, _lodashStringRepeat3['default'])(' ', containerWidth);
    }

    availableWidth = containerWidth - subjectWidth;

    if (alignment === 'left') {
        return alignLeft(subject, availableWidth);
    }

    if (alignment === 'right') {
        return alignRight(subject, availableWidth);
    }

    return alignCenter(subject, availableWidth);
};

module.exports = exports['default'];
//# sourceMappingURL=alignString.js.map
