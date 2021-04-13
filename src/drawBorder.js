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
const drawBorder = (columnSizeIndex, {
  border,
  drawVerticalLine,
}) => {
  const columns = columnSizeIndex.map((size) => {
    return border.body.repeat(size);
  });

  return drawHorizontalContent(columns, {
    drawVerticalLine,
    separator: border,
  });
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
const drawBorderTop = (columnSizeIndex, {
  border,
  drawVerticalLine,
}) => {
  const result = drawBorder(columnSizeIndex, {border: {
    body: border.topBody,
    join: border.topJoin,
    left: border.topLeft,
    right: border.topRight,
  },
  drawVerticalLine});

  if (result === '\n') {
    return '';
  }

  return result;
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
const drawBorderJoin = (columnSizeIndex, {border, drawVerticalLine}) => {
  return drawBorder(columnSizeIndex, {
    border: {
      body: border.joinBody,
      join: border.joinJoin,
      left: border.joinLeft,
      right: border.joinRight,
    },
    drawVerticalLine,
  });
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
const drawBorderBottom = (columnSizeIndex, {border, drawVerticalLine}) => {
  return drawBorder(columnSizeIndex, {
    border: {
      body: border.bottomBody,
      join: border.bottomJoin,
      left: border.bottomLeft,
      right: border.bottomRight,
    },
    drawVerticalLine,
  });
};

export {
  drawBorder,
  drawBorderBottom,
  drawBorderJoin,
  drawBorderTop,
};
