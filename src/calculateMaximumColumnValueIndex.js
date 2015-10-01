import _ from 'lodash';
import stringWidth from 'string-width';

/**
 * Produces an array of values that describe the largest value length (width) in every column.
 *
 * @param {Array[]} rows
 * @return {number[]}
 */
export default (rows) => {
    let columns;

    if (!rows[0]) {
        throw new Error(`Dataset must have at least one row.`);
    }

    columns = _.fill(Array(rows[0].length), 0);

    _.forEach(rows, (row) => {
        _.forEach(row, (value, index0) => {
            let valueWidth;

            valueWidth = stringWidth(value);

            if (columns[index0] < valueWidth) {
                columns[index0] = valueWidth;
            }
        });
    });

    return columns;
};
