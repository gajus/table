import {map, repeat} from 'lodash';

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @returns {table~row[]}
 */
export default (rows, config) => {
  return map(rows, (cells) => {
    return map(cells, (value, index1) => {
      const column = config.columns[index1];

      return repeat(' ', column.paddingLeft) + value + repeat(' ', column.paddingRight);
    });
  });
};
