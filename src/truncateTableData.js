import {map, truncate} from 'lodash';

/**
 * @todo Make it work with ASCII content.
 * @param {table~row[]} rows
 * @param {Object} config
 * @returns {table~row[]}
 */
export default (rows, config) => {
  return map(rows, (cells) => {
    return map(cells, (content, index) => {
      return truncate(content, {
        length: config.columns[index].truncate
      });
    });
  });
};
