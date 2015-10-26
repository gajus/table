/**
 * @typedef {Object} drawRow~border
 * @property {string} bodyLeft
 * @property {string} bodyRight
 * @property {string} bodyJoin
 */

/**
 * @param {number[]} columns
 * @param {drawRow~border} border
 * @return {string}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (columns, border) {
  return border.bodyLeft + columns.join(border.bodyJoin) + border.bodyRight + '\n';
};

module.exports = exports['default'];
//# sourceMappingURL=drawRow.js.map
