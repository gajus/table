import makeStreamConfig from './makeStreamConfig';
import drawRow from './drawRow';
import {
    drawBorderBottom,
    drawBorderJoin,
    drawBorderTop
} from './drawBorder';
import _ from 'lodash';

import stringifyTableData from './stringifyTableData';
import truncateTableData from './truncateTableData';
import mapDataUsingRowHeightIndex from './mapDataUsingRowHeightIndex';
import alignTableData from './alignTableData';
import padTableData from './padTableData';
import calculateRowHeightIndex from './calculateRowHeightIndex';

let append,
    create,
    prepareData;

/**
 * @param {string[]} row
 * @param {number[]} columnWidthIndex
 * @param {Object} config
 * @returns {undefined}
 */
create = (row, columnWidthIndex, config) => {
    let body,
        output,
        rows;

    rows = prepareData([row], config);

    body = _.map(rows, (literalRow) => {
        return drawRow(literalRow, config.border);
    }).join('');

    output = '';
    output += drawBorderTop(columnWidthIndex, config.border);
    output += body;
    output += drawBorderBottom(columnWidthIndex, config.border);

    output = _.trimEnd(output);

    process.stdout.write(output);
};

/**
 * @param {string[]} row
 * @param {number[]} columnWidthIndex
 * @param {Object} config
 * @returns {undefined}
 */
append = (row, columnWidthIndex, config) => {
    let body,
        output,
        rows;

    rows = prepareData([row], config);

    // console.log('rows', rows);

    body = _.map(rows, (literalRow) => {
        return drawRow(literalRow, config.border);
    }).join('');

    output = '\r\x1b[K';
    output += drawBorderJoin(columnWidthIndex, config.border);
    output += body;
    output += drawBorderBottom(columnWidthIndex, config.border);

    output = _.trimEnd(output);

    process.stdout.write(output);
};

/**
 * @param {Array} data
 * @param {Object} config
 * @returns {Array}
 */
prepareData = (data, config) => {
    let rowHeightIndex,
        rows;

    rows = stringifyTableData(data);

    rows = truncateTableData(data, config);

    rowHeightIndex = calculateRowHeightIndex(rows, config);

    rows = mapDataUsingRowHeightIndex(rows, rowHeightIndex, config);
    rows = alignTableData(rows, config);
    rows = padTableData(rows, config);

    return rows;
};

/**
 * @param {Object} userConfig
 * @return {Object}
 */
export default (userConfig = {}) => {
    let columnWidthIndex,
        config,
        empty;

    config = makeStreamConfig(userConfig);

    columnWidthIndex = _.mapValues(config.columns, (column) => {
        return column.width + column.paddingLeft + column.paddingRight;
    });

    empty = true;

    return {
        /**
         * @param {string[]} row
         * @returns {undefined}
         */
        write: (row) => {
            if (row.length !== config.columnCount) {
                throw new Error('Row cell count does not match the config.columnCount.');
            }

            if (empty) {
                empty = false;

                return create(row, columnWidthIndex, config);
            } else {
                return append(row, columnWidthIndex, config);
            }
        }
    };
};
