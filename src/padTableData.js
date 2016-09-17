import _ from 'lodash';

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @returns {table~row[]}
 */
export default (rows, config) => {
  return _.map(rows, (cells) => {
    return _.map(cells, (value, index1) => {
      const column = config.columns[index1];

      return _.repeat(' ', column.paddingLeft) + value + _.repeat(' ', column.paddingRight);
    });
  });
};
