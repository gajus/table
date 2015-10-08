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

let create,
    append,
    calculateColumnWidthIndex,
    prepareData;

/**
 * @param {string[]} row
 * @param {number[]} columnWidthIndex
 * @param {Object} config
 * @returns {undefined}
 */
create = (row, columnWidthIndex, config) => {
    let output,
        rows,
        body;

    rows = prepareData([row], config);

    body = _.map(rows, (row) => {
        return drawRow(row, config.border);
    }).join("\n");

    output = '';
    output += drawBorderTop(columnWidthIndex, config.border);
    output += body;
    output += drawBorderBottom(columnWidthIndex, config.border);

    output = _.trimRight(output);

    process.stdout.write(output);
};

/**
 * @param {string[]} row
 * @param {number[]} columnWidthIndex
 * @param {Object} config
 * @returns {undefined}
 */
append = (row, columnWidthIndex, config) => {
    let output,
        rows,
        body;

    rows = prepareData([row], config);

    body = _.map(rows, (row) => {
        return drawRow(row, config.border);
    }).join("\n");

    output = "\r\x1b[K";
    output += drawBorderJoin(columnWidthIndex, config.border);
    output += body;
    output += drawBorderBottom(columnWidthIndex, config.border);

    output = _.trimRight(output);

    process.stdout.write(output);
};

/**
 * @param {string[][]} data
 * @param {Object} config
 * @returns {string[][]}
 */
prepareData = (data, config) => {
    let rows,
        rowHeightIndex;

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
    let config,
        columnWidthIndex,
        empty;

    config = makeStreamConfig(userConfig);

    columnWidthIndex = _.mapValues(config.columns, (column) => {
        return column.width + column.paddingLeft + column.paddingRight;
    });

    empty = true;

    return {
        /**
         * @param {string[]}
         * @returns {undefined}
         */
        write: (row) => {
            if (row.length !== config.columnCount) {
                throw new Error(`Row cell count does not match the config.columnCount.`);
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
