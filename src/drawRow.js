import drawHorizontalContent from './drawHorizontalContent';

/**
 * @typedef {object} Border
 * @property {string} bodyLeft
 * @property {string} bodyRight
 * @property {string} bodyJoin
 */

/**
 * @param {string[]} columns
 * @param {Border} border
 * @param {Function} drawVerticalLine
 * @returns {string}
 */
export default (columns, border, drawVerticalLine) => {
  return drawHorizontalContent(columns, {
    join: border.bodyJoin,
    left: border.bodyLeft,
    right: border.bodyRight,
  }, drawVerticalLine);
};
