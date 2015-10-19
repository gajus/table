import _ from 'lodash';
import wrapString from './wrapString';
import wrapWord from './wrapWord';

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

        // console.log('rowHeight', rowHeight);

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

            // console.log('chunkedValue', chunkedValue.length, 'rowHeight', rowHeight.length);

            _.forEach(chunkedValue, (part, index2) => {
                // console.log(rowHeight[index2]);

                rowHeight[index2][index1] = part;
            });
        });

        return rowHeight;
    });

    return _.flatten(mappedRows);
};
