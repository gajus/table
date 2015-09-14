import _ from 'lodash';
import border from './border';
import drawTable from './drawTable';
import calculateColumnSizeIndex from './calculateColumnSizeIndex';
import makeConfig from './makeConfig';
import calculateRowSpanIndex from './calculateRowSpanIndex';
import mapDataUsingRowSpanIndex from './mapDataUsingRowSpanIndex';
import stringWidth from 'string-width';
import align from './align';
import validateData from './validateData';

/**
 * @typedef {String} table~cell
 */

/**
 * @typedef {table~cell[]} table~row
 */

/**
 * @typedef {Object} table~configColumn
 * @property {String} alignment
 * @property {Number} minWidth
 * @property {Number} maxWidth
 */

/**
 * @typedef {Object} table~config
 * @property {table~configColumn[]} column Column specific configuration.
 */

/**
 * Transforms data rows to rows fit for printing in the CLI. Transformation consists of
 * enforcing a fixed text width for values that are shorter than columnWidth and
 * breaking values that are longer than columnWidth into two or more rows.
 *
 * The current implementation assumes RTL text alignment.
 *
 * @param {table~row[]} rows
 * @param {table~config} config
 * @return {Array[]}
 */
export default (rows, config = {}) => {
    let derivedConfig,
        safeData,
        rowSpanIndex,
        columnSizeIndex,
        dataMappedUsingRowSpanIndex;

    validateData(rows);

    safeData = _.map(rows, (columns) => {
        return _.map(columns, String);
    });

    // console.log(`safeData`, safeData);

    derivedConfig = makeConfig(safeData, config);

    // console.log(`derivedConfig`, derivedConfig);

    rowSpanIndex = calculateRowSpanIndex(safeData, derivedConfig);

    // console.log(`rowSpanIndex`, rowSpanIndex);

    dataMappedUsingRowSpanIndex = mapDataUsingRowSpanIndex(safeData, rowSpanIndex, derivedConfig);

    // console.log(`dataMappedUsingRowSpanIndex`, dataMappedUsingRowSpanIndex);

    dataMappedUsingRowSpanIndex = _.map(dataMappedUsingRowSpanIndex, (cells, index0) => {
        return _.map(cells, (value, index1) => {
            let column;

            column = derivedConfig.column[index1];

            // console.log(column);

            if (stringWidth(value) === column.maxWidth) {
                return value;
            } else {
                return align(value, column.minWidth, column.alignment);
            }
        });
    });

    columnSizeIndex = calculateColumnSizeIndex(dataMappedUsingRowSpanIndex[0]);

    // console.log(`columnSizeIndex`, columnSizeIndex);

    return drawTable(dataMappedUsingRowSpanIndex, border, columnSizeIndex, rowSpanIndex);
};
