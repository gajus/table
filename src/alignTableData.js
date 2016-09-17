import _ from 'lodash';
import stringWidth from 'string-width';
import alignString from './alignString';

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @returns {table~row[]}
 */
export default (rows, config) => {
  return _.map(rows, (cells) => {
    return _.map(cells, (value, index1) => {
      const column = config.columns[index1];

      if (stringWidth(value) === column.width) {
        return value;
      } else {
        return alignString(value, column.width, column.alignment);
      }
    });
  });
};
