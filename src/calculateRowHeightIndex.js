import _ from 'lodash';
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

    _.forEach(rows, (cells) => {
        let cellHeightIndex;

        cellHeightIndex = _.fill(Array(tableWidth), 1);

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
