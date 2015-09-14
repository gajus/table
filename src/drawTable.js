import _ from 'lodash';

import {
    drawBorderTop,
    drawBorderJoin,
    drawBorderBottom
} from './drawBorder';

import drawRow from './drawRow';

/**
 * @param {Array} rows
 * @param {Array} columnSizeIndex
 * @param {Array} rowSpanIndex
 */
export default (rows, border, columnSizeIndex, rowSpanIndex) => {
    let output,
        rowCount,
        rowHeight,
        realRowIndex;

    rowCount = rows.length;

    realRowIndex = 0;

    output = '';
    output += drawBorderTop(columnSizeIndex, border);

    _.forEach(rows, (row, i) => {
        output += drawRow(row, border);

        if (!rowHeight) {
            rowHeight = rowSpanIndex[realRowIndex];

            realRowIndex++;
        }

        rowHeight--;

        if (rowHeight === 0 && i !== rowCount - 1) {
            output += drawBorderJoin(columnSizeIndex, border);
        }
    });

    output += drawBorderBottom(columnSizeIndex, border);

    return output;
};
