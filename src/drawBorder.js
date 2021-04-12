import drawHorizontalContent from './drawHorizontalContent';

/**
 * @typedef drawBorder~parts
 * @property {string} left
 * @property {string} right
 * @property {string} body
 * @property {string} join
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {drawBorder~parts} parts
 * @param {Function} drawVerticalLine
 * @returns {string}
 */
const drawBorder = (columnSizeIndex, parts, drawVerticalLine) => {
  const columns = columnSizeIndex.map((size) => {
    return parts.body.repeat(size);
  });

  return drawHorizontalContent(columns, parts, drawVerticalLine);
};

/**
 * @typedef drawBorderTop~parts
 * @property {string} topLeft
 * @property {string} topRight
 * @property {string} topBody
 * @property {string} topJoin
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {drawBorderTop~parts} parts
 * @param {Function} drawVerticalLine
 * @returns {string}
 */
const drawBorderTop = (columnSizeIndex, parts, drawVerticalLine) => {
  const border = drawBorder(columnSizeIndex, {
    body: parts.topBody,
    join: parts.topJoin,
    left: parts.topLeft,
    right: parts.topRight,
  }, drawVerticalLine);

  if (border === '\n') {
    return '';
  }

  return border;
};

/**
 * @typedef drawBorderJoin~parts
 * @property {string} joinLeft
 * @property {string} joinRight
 * @property {string} joinBody
 * @property {string} joinJoin
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {drawBorderJoin~parts} parts
 * @param {Function} drawVerticalLine
 * @returns {string}
 */
const drawBorderJoin = (columnSizeIndex, parts, drawVerticalLine) => {
  return drawBorder(columnSizeIndex, {
    body: parts.joinBody,
    join: parts.joinJoin,
    left: parts.joinLeft,
    right: parts.joinRight,
  }, drawVerticalLine);
};

/**
 * @typedef drawBorderBottom~parts
 * @property {string} bottomLeft
 * @property {string} bottomRight
 * @property {string} bottomBody
 * @property {string} bottomJoin
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {drawBorderBottom~parts} parts
 * @param {Function} drawVerticalLine
 * @returns {string}
 */
const drawBorderBottom = (columnSizeIndex, parts, drawVerticalLine) => {
  return drawBorder(columnSizeIndex, {
    body: parts.bottomBody,
    join: parts.bottomJoin,
    left: parts.bottomLeft,
    right: parts.bottomRight,
  }, drawVerticalLine);
};

export {
  drawBorder,
  drawBorderBottom,
  drawBorderJoin,
  drawBorderTop,
};
