import _ from 'lodash';
import stringWith from 'string-width';

/**
 * Produces an array of values that describe the largest value length in the column.
 *
 * @param {Array[]} rows
 * @return {Number[]}
 */
export default (rows) => {
    let columns;

    if (!rows[0]) {
        throw new Error(`Dataset must have at least one row.`);
    }

    columns = _.fill(Array(rows[0].length), 0);

    _.forEach(rows, (row) => {
        _.forEach(row, (value, index0) => {
            let valueLength;

            valueLength = stringWith(value);

            if (_.isUndefined(columns[index0]) || columns[index0] < valueLength) {
                columns[index0] = valueLength;
            }
        });
    });

    return columns;
};
