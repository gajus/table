import _ from 'lodash';

/**
 * @typedef {string} cell
 */

/**
 * @typedef {cell[]} validateData~column
 */

/**
 * @param {column[]} rows
 * @returns {undefined}
 */
export default (rows) => {
    let columnNumber;

    if (!_.isArray(rows)) {
        throw new Error('Table data must be an array.');
    }

    if (rows.length === 0) {
        throw new Error('Table must define at least one row.');
    }

    if (rows[0].length === 0) {
        throw new Error('Table must define at least one column.');
    }

    columnNumber = rows[0].length;

    _.forEach(rows, (cells) => {
        if (!_.isArray(cells)) {
            throw new Error('Table row data must be an array.');
        }

        if (cells.length !== columnNumber) {
            throw new Error('Table must have a consistent number of cells.');
        }

        // @todo Make an exception for newline characters.
        // @see https://github.com/gajus/table/issues/9
        _.forEach(cells, (cell) => {
            if (/[\x01-\x1A]/.test(cell)) {
                throw new Error('Table data must not contain control characters.');
            }
        });
    });
};
