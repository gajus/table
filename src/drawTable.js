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
 * @param {function} drawHorizontalLine
 */
export default (rows, border, columnSizeIndex, rowSpanIndex, drawHorizontalLine) => {
    let output,
        rowCount,
        rowHeight,
        realRowIndex;

    rowCount = rows.length;

    realRowIndex = 0;

    output = '';

    if (drawHorizontalLine(realRowIndex, rowCount)) {
        output += drawBorderTop(columnSizeIndex, border);
    }

    _.forEach(rows, (row, i) => {
        output += drawRow(row, border);

        if (!rowHeight) {
            rowHeight = rowSpanIndex[realRowIndex];

            realRowIndex++;
        }

        rowHeight--;

        if (rowHeight === 0 && i !== rowCount - 1 && drawHorizontalLine(realRowIndex, rowCount)) {
            output += drawBorderJoin(columnSizeIndex, border);
        }
    });

    if (drawHorizontalLine(realRowIndex, rowCount)) {
        output += drawBorderBottom(columnSizeIndex, border);
    }

    return output;
};
