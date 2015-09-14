'use strict';

var _lodashCollectionMap2 = require('lodash/collection/map');

var _lodashCollectionMap3 = _interopRequireDefault(_lodashCollectionMap2);

var _lodashStringRepeat2 = require('lodash/string/repeat');

var _lodashStringRepeat3 = _interopRequireDefault(_lodashStringRepeat2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var drawBorder = undefined,
    drawBorderBottom = undefined,
    drawBorderJoin = undefined,
    drawBorderTop = undefined;

/**
 * @typedef drawBorder~parts
 * @property {String} left
 * @property {String} right
 * @property {String} body
 * @property {String} join
 */

/**
 * @param {Number[]} columnSizeIndex
 * @param {drawBorder~parts} parts
 * @return {String}
 */
exports.drawBorder = drawBorder = function (columnSizeIndex, parts) {
    var columns = undefined;

    columns = (0, _lodashCollectionMap3['default'])(columnSizeIndex, function (size) {
        return (0, _lodashStringRepeat3['default'])(parts.body, size);
    });

    columns = columns.join(parts.join);

    return '' + parts.left + columns + parts.right + '\n';
};

/**
 * @typedef drawBorderTop~parts
 * @property {String} topLeft
 * @property {String} topRight
 * @property {String} topBody
 * @property {String} topJoin
 */

/**
 * @param {Number[]} columnSizeIndex
 * @param {drawBorderTop~parts} parts
 * @return {String}
 */
exports.drawBorderTop = drawBorderTop = function (columnSizeIndex, parts) {
    return drawBorder(columnSizeIndex, {
        left: parts.topLeft,
        right: parts.topRight,
        body: parts.topBody,
        join: parts.topJoin
    });
};

/**
 * @typedef drawBorderJoin~parts
 * @property {String} joinLeft
 * @property {String} joinRight
 * @property {String} joinBody
 * @property {String} joinJoin
 */

/**
 * @param {Number[]} columnSizeIndex
 * @param {drawBorderJoin~parts} parts
 * @return {String}
 */
exports.drawBorderJoin = drawBorderJoin = function (columnSizeIndex, parts) {
    return drawBorder(columnSizeIndex, {
        left: parts.joinLeft,
        right: parts.joinRight,
        body: parts.joinBody,
        join: parts.joinJoin
    });
};

/**
 * @typedef drawBorderBottom~parts
 * @property {String} topLeft
 * @property {String} topRight
 * @property {String} topBody
 * @property {String} topJoin
 */

/**
 * @param {Number[]} columnSizeIndex
 * @param {drawBorderBottom~parts} parts
 * @return {String}
 */
exports.drawBorderBottom = drawBorderBottom = function (columnSizeIndex, parts) {
    return drawBorder(columnSizeIndex, {
        left: parts.bottomLeft,
        right: parts.bottomRight,
        body: parts.bottomBody,
        join: parts.bottomJoin
    });
};

exports.drawBorder = drawBorder;
exports.drawBorderTop = drawBorderTop;
exports.drawBorderJoin = drawBorderJoin;
exports.drawBorderBottom = drawBorderBottom;
//# sourceMappingURL=drawBorder.js.map