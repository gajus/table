import _ from 'lodash';
import stringWidth from 'string-width';

/**
 * @param {Array[]} rows
 * @param {Object} config
 * @return {Number[]}
 */
export default (rows, config) => {
    let rowSpanIndex,
        tableWidth;

    tableWidth = rows[0].length;

    rowSpanIndex = [];

    _.map(rows, (cells) => {
        let cellHeightIndex;

        cellHeightIndex = _.fill(Array(tableWidth), 1);

        _.forEach(cells, (value, index1) => {
            if (config.column[index1].maxWidth !== Infinity) {
                cellHeightIndex[index1] = _.ceil(stringWidth(value) / config.column[index1].maxWidth);
            }
        });

        rowSpanIndex.push(_.max(cellHeightIndex));
    });

    return rowSpanIndex;
};
