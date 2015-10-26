'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

var alignCenter = undefined,
    alignLeft = undefined,
    alignments = undefined,
    alignRight = undefined;

alignments = ['left', 'right', 'center'];

/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */
alignLeft = function (subject, width) {
    return subject + _lodash2['default'].repeat(' ', width);
};

/**
 * @param {string} subject
 * @param {number} width
 * @returns {string}
 */
alignRight = function (subject, width) {
    return _lodash2['default'].repeat(' ', width) + subject;
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
        return _lodash2['default'].repeat(' ', halfWidth) + subject + _lodash2['default'].repeat(' ', halfWidth);
    } else {
        halfWidth = _lodash2['default'].floor(halfWidth);

        return _lodash2['default'].repeat(' ', halfWidth) + subject + _lodash2['default'].repeat(' ', halfWidth + 1);
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

    if (!_lodash2['default'].isString(subject)) {
        throw new Error('Subject parameter value must be a string.');
    }

    if (!_lodash2['default'].isNumber(containerWidth)) {
        throw new Error('Container width parameter value must be a number.');
    }

    subjectWidth = (0, _stringWidth2['default'])(subject);

    if (subjectWidth > containerWidth) {
        // console.log('subjectWidth', subjectWidth, 'containerWidth', containerWidth, 'subject', subject);

        throw new Error('Subject parameter value width cannot be greater than the container width.');
    }

    if (!_lodash2['default'].isString(alignment)) {
        throw new Error('Alignment parameter value must be a string.');
    }

    if (alignments.indexOf(alignment) === -1) {
        throw new Error('Alignment parameter value must be a known alignment parameter value (left, right, center).');
    }

    if (subjectWidth === 0) {
        return _lodash2['default'].repeat(' ', containerWidth);
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
