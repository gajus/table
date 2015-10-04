import _ from 'lodash';
import drawTable from './drawTable';
import calculateCellWidthIndex from './calculateCellWidthIndex';
import makeConfig from './makeConfig';
import calculateRowHeightIndex from './calculateRowHeightIndex';
import mapDataUsingRowHeightIndex from './mapDataUsingRowHeightIndex';
import stringWidth from 'string-width';
import alignTableData from './alignTableData';
import padTableData from './padTableData';
import validateTableData from './validateTableData';
import stringifyTableData from './stringifyTableData';

/**
 * @typedef {string} table~cell
 */

/**
 * @typedef {table~cell[]} table~row
 */

/**
 * @typedef {Object} table~columns
 * @property {string} alignment Cell content alignment (enum: left, center, right) (default: left).
 * @property {number} width Column width (default: auto).
 * @property {number} paddingLeft Cell content padding width left (default: 1).
 * @property {number} paddingRight Cell content padding width right (default: 1).
 */

/**
 * @typedef {Object} table~border
 * @property {string} topBody
 * @property {string} topJoin
 * @property {string} topLeft
 * @property {string} topRight
 * @property {string} bottomBody
 * @property {string} bottomJoin
 * @property {string} bottomLeft
 * @property {string} bottomRight
 * @property {string} bodyLeft
 * @property {string} bodyRight
 * @property {string} bodyJoin
 * @property {string} joinBody
 * @property {string} joinLeft
 * @property {string} joinRight
 * @property {string} joinJoin
 */

/**
 * @typedef {Object} table~config
 * @property {table~border} border
 * @property {table~columns[]} columns Column specific configuration.
 */

/**
 * Generates a text table.
 *
 * @param {table~row[]} data
 * @param {table~config} userConfig
 * @return {String}
 */
export default (data, userConfig = {}) => {
    let config,
        rowHeightIndex,
        cellWidthIndex,
        rows;

    validateTableData(data);

    rows = stringifyTableData(data);

    config = makeConfig(rows, userConfig);

    rowHeightIndex = calculateRowHeightIndex(rows, config);

    rows = mapDataUsingRowHeightIndex(rows, rowHeightIndex, config);
    rows = alignTableData(rows, config);
    rows = padTableData(rows, config);

    cellWidthIndex = calculateCellWidthIndex(rows[0]);

    return drawTable(rows, config.border, cellWidthIndex, rowHeightIndex);
};
