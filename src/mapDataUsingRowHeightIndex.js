import _ from 'lodash';
import chunkString from './chunkString';

/**
 * @param {Array} unmappedRows
 * @param {Number[]} rowHeightIndex
 * @param {Object} config
 * @return {Array}
 */
export default (unmappedRows, rowHeightIndex, config) => {
    let tableWidth,
        mappedRows;

    tableWidth = unmappedRows[0].length;

    // console.log(`unmappedRows`, unmappedRows, `rowHeightIndex`, rowHeightIndex, `config`, config, `tableWidth`, tableWidth);

    mappedRows = _.map(unmappedRows, (cells, index0) => {
        let rowHeight;

        rowHeight = _.map(Array(rowHeightIndex[index0]), () => {
            return _.fill(Array(tableWidth), '');
        });

        // console.log(`rowHeight`, rowHeight);

        // rowHeight
        //     [{row index within rowSaw; index2}]
        //     [{cell index within a virtual row; index1}]

        _.forEach(cells, (value, index1) => {
            let chunkedValue;

            chunkedValue = chunkString(value, config.column[index1].width);

            _.forEach(chunkedValue, (part, index2) => {
                rowHeight[index2][index1] = part;
            });
        });

        return rowHeight;
    });

    return _.flatten(mappedRows);
};
