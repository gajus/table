import _ from 'lodash';

import border from './border';

import {
    drawBorderTop,
    drawBorderJoin,
    drawBorderBottom
} from './drawBorder';

import drawRow from './drawRow';

import formatData from './formatData';

let drawTop,
    getColumnSizeIndex;

/**
 * @param {String[]} columns
 * @return {Number[]}
 */
getColumnSizeIndex = (columns) => {
    return _.map(columns, (data) => {
        return data.length;
    });
};

export default (data) => {
    let table,
        columnSizeIndex,
        rows;

    rows = formatData(data);

    columnSizeIndex = getColumnSizeIndex(rows[0]);

    table = '';
    table += drawBorderTop(columnSizeIndex, border);

    _.forEach(rows, (row, i) => {
        table += drawRow(row, border);

        if (i + 1 !== rows.length) {
            table += drawBorderJoin(columnSizeIndex, border);
        }
    });

    table += drawBorderBottom(columnSizeIndex, border);

    return table;
};
