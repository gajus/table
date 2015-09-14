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
export default (columns, border) => {
    return `${border.bodyLeft}${columns.join(border.bodyJoin)}${border.bodyRight}\n`;
};
