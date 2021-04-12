/**
 * @typedef {object} Separator
 * @property {string} left
 * @property {string} right
 * @property {string} join
 */

/**
 * @param {string[]} columns
 * @param {Separator} separator
 * @param {Function} drawVerticalLine
 * @returns {string}
 */
export default (columns, separator, drawVerticalLine) => {
  const columnCount = columns.length;
  const result = [];

  result.push(drawVerticalLine(0, columnCount) ? separator.left : '');

  columns.forEach((column, index) => {
    result.push(column);

    if (index + 1 < columnCount) {
      result.push(drawVerticalLine(index + 1, columnCount) ? separator.join : '');
    }
  });
  result.push(drawVerticalLine(columnCount, columnCount) ? separator.right : '');

  return result.join('') + '\n';
};
