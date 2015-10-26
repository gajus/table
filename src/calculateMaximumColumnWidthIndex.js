import _ from 'lodash';
import calculateCellWidthIndex from './calculateCellWidthIndex';

/**
 * Produces an array of values that describe the largest value length (width) in every column.
 *
 * @param {Array[]} rows
 * @return {number[]}
 */
export default (rows) => {
    let columns;

    if (!rows[0]) {
        throw new Error('Dataset must have at least one row.');
    }

    columns = _.fill(Array(rows[0].length), 0);

    _.forEach(rows, (row) => {
        let columnWidthIndex;

        columnWidthIndex = calculateCellWidthIndex(row);

        _.forEach(columnWidthIndex, (valueWidth, index0) => {
            if (columns[index0] < valueWidth) {
                columns[index0] = valueWidth;
            }
        });
    });

    return columns;
};
