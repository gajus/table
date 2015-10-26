'use strict';

var _lodashStringTrim2 = require('lodash/string/trim');

var _lodashStringTrim3 = _interopRequireDefault(_lodashStringTrim2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _ansiSlice = require('ansi-slice');

var _ansiSlice2 = _interopRequireDefault(_ansiSlice);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

/**
 * Creates an array of strings split into groups the length of size.
 * This function works with strings that contain ASCII characters.
 *
 * wrapText is different from would-be "chunk" implementation
 * in that whitespace characters that occur on a chunk size limit are trimmed.
 *
 * @param {string} subject
 * @param {number} size
 * @returns {Array}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (subject, size) {
    var chunks = undefined,
        subjectSlice = undefined;

    subjectSlice = subject;

    chunks = [];

    do {
        chunks.push((0, _ansiSlice2['default'])(subjectSlice, 0, size));

        subjectSlice = (0, _lodashStringTrim3['default'])((0, _ansiSlice2['default'])(subjectSlice, size));
    } while ((0, _stringWidth2['default'])(subjectSlice));

    return chunks;
};

module.exports = exports['default'];
//# sourceMappingURL=wrapString.js.map
