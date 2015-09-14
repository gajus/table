import _ from 'lodash';

import validateConfig from './validateConfig';
import calculateMaximumColumnValueIndex from './calculateMaximumColumnValueIndex';

/**
 * @param {Array[]} rows
 * @param {formatData~config} config
 * @return {formatData~config}
 */
export default (rows, config = {}) => {
    let maximumColumnValueIndex;

    validateConfig(rows, config);

    maximumColumnValueIndex = calculateMaximumColumnValueIndex(rows);

    config.column = config.column || Array(rows[0].length);

    config.column = _.map(config.column, (column = {}, index0) => {
        if (_.isUndefined(column.minWidth) || maximumColumnValueIndex[index0] > config.column[index0].minWidth) {
            column.minWidth = maximumColumnValueIndex[index0];
        }

        if (_.isUndefined(column.alignment)) {
            column.alignment = `left`;
        }

        if (_.isUndefined(column.maxWidth)) {
            column.maxWidth = Infinity;
        } else if (column.maxWidth < column.minWidth) {
            column.minWidth = column.maxWidth;
        }

        return column;
    });

    return config;
};
