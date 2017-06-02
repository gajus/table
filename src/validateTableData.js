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
  if (!Array.isArray(rows)) {
    throw new Error('Table data must be an array.');
  }

  if (rows.length === 0) {
    throw new Error('Table must define at least one row.');
  }

  if (rows[0].length === 0) {
    throw new Error('Table must define at least one column.');
  }

  const columnNumber = rows[0].length;

  for (const cells of rows) {
    if (!Array.isArray(cells)) {
      throw new Error('Table row data must be an array.');
    }

    if (cells.length !== columnNumber) {
      throw new Error('Table must have a consistent number of cells.');
    }

    // @todo Make an exception for newline characters.
    // @see https://github.com/gajus/table/issues/9
    for (const cell of cells) {
      if (/[\x01-\x1A]/.test(cell)) {
        throw new Error('Table data must not contain control characters.');
      }
    }
  }
};
