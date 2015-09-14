/**
 * @typedef {Object} drawRow~border
 * @property {String} bodyLeft
 * @property {String} bodyRight
 * @property {String} bodyJoin
 */

/**
 * @param {Number[]} columns
 * @param {drawRow~border} border
 * @return {String}
 */
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (columns, border) {
  return "" + border.bodyLeft + columns.join(border.bodyJoin) + border.bodyRight + "\n";
};

module.exports = exports["default"];
//# sourceMappingURL=drawRow.js.map