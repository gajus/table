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
 * @param {string} input
 * @param {number} size
 * @returns {Array}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (input, size) {
    var chunk = undefined,
        chunks = undefined,
        re = undefined,
        subject = undefined;

    subject = input;

    chunks = [];

    // https://regex101.com/r/gY5kZ1/1
    re = new RegExp('(^.{1,' + size + '}(\\s+|$))|(^.{1,' + (size - 1) + '}(\\\\|/|_|\\.|,|;|\-))');

    do {
        chunk = subject.match(re);

        // console.log('chunk', chunk, re);

        if (chunk) {
            chunk = chunk[0];

            subject = (0, _ansiSlice2['default'])(subject, (0, _stringWidth2['default'])(chunk));

            chunk = (0, _lodashStringTrim3['default'])(chunk);
        } else {
            chunk = (0, _ansiSlice2['default'])(subject, 0, size);
            subject = (0, _ansiSlice2['default'])(subject, size);
        }

        chunks.push(chunk);
    } while ((0, _stringWidth2['default'])(subject));

    return chunks;
};

module.exports = exports['default'];
//# sourceMappingURL=wrapWord.js.map
