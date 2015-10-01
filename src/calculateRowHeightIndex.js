import _ from 'lodash';
import stringWidth from 'string-width';
import calculateCellHeight from './calculateCellHeight';

/**
 * Calculates the vertical row span index.
 *
 * @param {Array[]} rows
 * @param {Object} config
 * @return {number[]}
 */
export default (rows, config) => {
    let rowSpanIndex,
        tableWidth;

    tableWidth = rows[0].length;

    rowSpanIndex = [];

    _.map(rows, (cells) => {
        let cellHeightIndex;

        cellHeightIndex = _.fill(Array(tableWidth), 1);

        _.forEach(cells, (value, index1) => {
            cellHeightIndex[index1] = calculateCellHeight(value, config.column[index1].width);
        });

        rowSpanIndex.push(_.max(cellHeightIndex));
    });

    return rowSpanIndex;
};
