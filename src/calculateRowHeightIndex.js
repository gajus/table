import _ from 'lodash';
import calculateCellHeight from './calculateCellHeight';

/**
 * Calculates the vertical row span index.
 *
 * @param {Array[]} rows
 * @param {Object} config
 * @returns {number[]}
 */
export default (rows, config) => {
  const tableWidth = rows[0].length;

  const rowSpanIndex = [];

  _.forEach(rows, (cells) => {
    const cellHeightIndex = _.fill(Array(tableWidth), 1);

    _.forEach(cells, (value, index1) => {
      if (!_.isNumber(config.columns[index1].width)) {
        throw new Error('column[index].width must be a number.');
      }

      if (!_.isBoolean(config.columns[index1].wrapWord)) {
        throw new Error('column[index].wrapWord must be a boolean.');
      }

      cellHeightIndex[index1] = calculateCellHeight(value, config.columns[index1].width, config.columns[index1].wrapWord);
    });

    rowSpanIndex.push(_.max(cellHeightIndex));
  });

  return rowSpanIndex;
};
