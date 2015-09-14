import _ from 'lodash';

/**
 * @typedef {String} validateData~cell
 */

/**
 * @typedef {validateData~cell[]} validateData~column
 */

/**
 * @param {validateData~column[]} rows
 * @return {undefined}
 */
export default (rows) => {
    let columnNumber;

    if (!_.isArray(rows)) {
        throw new Error(`Table data must be an array.`);
    }

    if (rows.length === 0) {
        throw new Error(`Table must define at least one row.`);
    }

    if (rows[0].length === 0) {
        throw new Error(`Table must define at least one column.`);
    }

    columnNumber = rows[0].length;

    _.forEach(rows, (columns) => {
        if (!_.isArray(columns)) {
            throw new Error(`Table row data must be an array.`);
        }

        if (columns.length !== columnNumber) {
            throw new Error(`Table must have a consistent number of columns.`);
        }

        _.forEach(columns, (cell) => {
            if (/[\x01-\x1A]/.test(cell)) {
                throw new Error(`Table data must not contain control characters.`);
            }
        });
    });
};
