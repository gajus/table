import _ from 'lodash';
import wrapString from './wrapString';
import wrapWord from './wrapWord';

/**
 * @param {Array} unmappedRows
 * @param {number[]} rowHeightIndex
 * @param {Object} config
 * @returns {Array}
 */
export default (unmappedRows, rowHeightIndex, config) => {
  const tableWidth = unmappedRows[0].length;

  const mappedRows = unmappedRows.map((cells, index0) => {
    const rowHeight = _.times(rowHeightIndex[index0], () => {
      return _.fill(Array(tableWidth), '');
    });

    // rowHeight
    //     [{row index within rowSaw; index2}]
    //     [{cell index within a virtual row; index1}]

    _.forEach(cells, (value, index1) => {
      let chunkedValue;

      if (config.columns[index1].wrapWord) {
        chunkedValue = wrapWord(value, config.columns[index1].width);
      } else {
        chunkedValue = wrapString(value, config.columns[index1].width);
      }

      _.forEach(chunkedValue, (part, index2) => {
        rowHeight[index2][index1] = part;
      });
    });

    return rowHeight;
  });

  return _.flatten(mappedRows);
};
