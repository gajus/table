'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ansiSlice = require('ansi-slice');

var _ansiSlice2 = _interopRequireDefault(_ansiSlice);

var _stringWidth = require('string-width');

var _stringWidth2 = _interopRequireDefault(_stringWidth);

/**
 * @param {String} subject
 * @param {Number} size
 */

exports['default'] = function (subject, size) {
    var chunks = undefined,
        subjectSlice = undefined;

    subjectSlice = subject;

    chunks = [];

    do {
        chunks.push((0, _ansiSlice2['default'])(subjectSlice, 0, size));

        subjectSlice = (0, _ansiSlice2['default'])(subjectSlice, size);
    } while ((0, _stringWidth2['default'])(subjectSlice));

    return chunks;
};

module.exports = exports['default'];
//# sourceMappingURL=chunk.js.map