import drawHorizontalContent from './drawHorizontalContent';

/**
 * @typedef drawBorder~border
 * @property {string} left
 * @property {string} right
 * @property {string} body
 * @property {string} join
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {object} config
 * @param {drawBorder~border} config.border
 * @param {Function} config.drawVerticalLine
 * @returns {string}
 */
const drawBorder = (columnSizeIndex, {border, drawVerticalLine}) => {
  const columns = columnSizeIndex.map((size) => {
    return border.body.repeat(size);
  });

  return drawHorizontalContent(columns, {
    drawVerticalLine,
    separator: border,
  });
};

/**
 * @param {number[]} columnSizeIndex
 * @param {table~config} config
 * @returns {string}
 */
const drawBorderTop = (columnSizeIndex, {border, drawVerticalLine}) => {
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
 * @param {number[]} columnSizeIndex
 * @param {table~config} config
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
 * @param {number[]} columnSizeIndex
 * @param {table~config} config
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
