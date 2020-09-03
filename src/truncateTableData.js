const truncate = (string, length) => {
  return string.length > length ? string.slice(0, Math.max(0, length - 3)) + '...' : string;
};

/**
 * @todo Make it work with ASCII content.
 * @param {table~row[]} rows
 * @param {object} config
 * @returns {table~row[]}
 */
export default (rows, config) => {
  return rows.map((cells) => {
    return cells.map((content, index) => {
      return truncate(content, config.columns[index].truncate);
    });
  });
};
