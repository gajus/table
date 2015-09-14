import _ from 'lodash';

import slice from 'ansi-slice';

import stringWidth from 'string-width';

import chunk from './chunk';

/**
 * @param {Array} unmappedRows
 * @param {Number[]} rowSpanIndex
 * @param {Object} config
 * @return {Array}
 */
export default (unmappedRows, rowSpanIndex, config) => {
    let tableWidth,
        mappedRows;

    tableWidth = unmappedRows[0].length;

    // console.log(`unmappedRows`, unmappedRows, `rowSpanIndex`, rowSpanIndex, `config`, config, `tableWidth`, tableWidth);

    mappedRows = _.map(unmappedRows, (cells, index0) => {
        let rowSpan;

        rowSpan = _.map(Array(rowSpanIndex[index0]), () => {
            return _.fill(Array(tableWidth), '');
        });

        // console.log(`rowSpan`, rowSpan);

        // rowSpan
        //     [{row index within rowSaw; index2}]
        //     [{cell index within a virtual row; index1}]

        _.forEach(cells, (value, index1) => {
            let chunkedValue;

            chunkedValue = chunk(value, config.column[index1].maxWidth);

            _.forEach(chunkedValue, (part, index2) => {
                rowSpan[index2][index1] = part;
            });
        });

        return rowSpan;
    });

    return _.flatten(mappedRows);
};
