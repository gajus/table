import {
  drawBorderTop, drawBorderJoin, drawBorderBottom,
} from './drawBorder';
import drawRow from './drawRow';

/**
 * @param {string[][]} rows
 * @param {object} border
 * @param {Array} columnSizeIndex
 * @param {Array} rowSpanIndex
 * @param {Function} drawVerticalLine
 * @param {Function} drawHorizontalLine
 * @param {boolean} singleLine
 * @returns {string}
 */
export default (
  rows,
  border,
  columnSizeIndex,
  rowSpanIndex,
  drawVerticalLine,
  drawHorizontalLine,
  singleLine,
) => {
  let output;
  let realRowIndex;
  let rowHeight;

  const rowCount = rows.length;

  realRowIndex = 0;

  output = '';

  if (drawHorizontalLine(realRowIndex, rowCount)) {
    output += drawBorderTop(columnSizeIndex, border, drawVerticalLine);
  }

  rows.forEach((row, index0) => {
    output += drawRow(row, border, drawVerticalLine);

    if (!rowHeight) {
      rowHeight = rowSpanIndex[realRowIndex];

      realRowIndex++;
    }

    rowHeight--;

    if (
      !singleLine &&
      rowHeight === 0 &&
      index0 !== rowCount - 1 &&
      drawHorizontalLine(realRowIndex, rowCount)
    ) {
      output += drawBorderJoin(columnSizeIndex, border, drawVerticalLine);
    }
  });

  if (drawHorizontalLine(realRowIndex, rowCount)) {
    output += drawBorderBottom(columnSizeIndex, border, drawVerticalLine);
  }

  return output;
};
