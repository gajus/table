import isBoolean from 'lodash/isBoolean';
import isNumber from 'lodash/isNumber';
import max from 'lodash/max';
import calculateCellHeight from './calculateCellHeight';

/**
 * Calculates the vertical row span index.
 *
 * @param {Array[]} rows
 * @param {object} config
 * @returns {number[]}
 */
export default (rows, config) => {
  const tableWidth = rows[0].length;

  const rowSpanIndex = [];

  rows.forEach((cells) => {
    const cellHeightIndex = new Array(tableWidth).fill(1);

    cells.forEach((value, index1) => {
      if (!isNumber(config.columns[index1].width)) {
        throw new TypeError('column[index].width must be a number.');
      }

      if (!isBoolean(config.columns[index1].wrapWord)) {
        throw new TypeError('column[index].wrapWord must be a boolean.');
      }

      cellHeightIndex[index1] = calculateCellHeight(value, config.columns[index1].width, config.columns[index1].wrapWord);
    });

    rowSpanIndex.push(max(cellHeightIndex));
  });

  return rowSpanIndex;
};
