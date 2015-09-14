/* eslint-disable no-loop-func */

import _ from 'lodash';

import makeConfig from './makeConfig';

import slice from 'ansi-slice';

import stringWidth from 'string-width';

import align from './align';

/**
 * @typedef formatData~columnConfig
 * @property {String} alignment
 * @property {Number} minWidth
 * @property {Number} maxWidth
 */

/**
 * @typedef formatData~config
 * @property {formatData~columnConfig[]} columnConfig Column specific configuration.
 */

/**
 * Transforms data rows to rows fit for printing in the CLI. Transformation consists of
 * enforcing a fixed text width for values that are shorter than columnWidth and
 * breaking values that are longer than columnWidth into two or more rows.
 *
 * The current implementation assumes RTL text alignment.
 *
 * @param {Array[]} rows
 * @param {formatData~config} config
 * @return {Array[]}
 */
export default (rows, config = {}) => {
    let derivedConfig,
        formattedData,
        index0;

    index0 = 0;

    formattedData = _.map(rows, (columns) => {
        return _.map(columns, (cell) => {
            return String(cell);
        });
    });

    derivedConfig = makeConfig(formattedData, config);

    while (index0 < formattedData.length) {
        let nextRow,
            row;

        row = formattedData[index0];

        formattedData[index0] = _.map(formattedData[index0], (value, index1) => {
            let column;

            column = derivedConfig.column[index1];

            if (stringWidth(value) > column.maxWidth) {
                if (!nextRow) {
                    nextRow = _.fill([], ``, 0, row.length);

                    formattedData.splice(index0 + 1, 0, nextRow);
                }

                nextRow[index1] = slice(value, column.maxWidth);

                return slice(value, 0, column.maxWidth);
            }

            return align(value, column.minWidth, column.alignment);
        });

        index0++;
    }

    return formattedData;
};
