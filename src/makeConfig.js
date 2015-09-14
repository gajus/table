import _ from 'lodash';

import border from './border';
import validateConfig from './validateConfig';
import calculateMaximumColumnValueIndex from './calculateMaximumColumnValueIndex';

/**
 * @param {Array[]} rows
 * @param {Object} inputConfig
 * @return {Object}
 */
export default (rows, inputConfig = {}) => {
    let config,
        maximumColumnValueIndex;

    config = _.cloneDeep(inputConfig);

    validateConfig(rows, config);

    if (!config.border) {
        config.border = {}
    }

    config.border = _.assign({}, border, config.border);

    maximumColumnValueIndex = calculateMaximumColumnValueIndex(rows);

    if (!config.column) {
        config.column = {};
    }

    _.times(rows[0].length, (index) => {
        if (_.isUndefined(config.column[index])) {
            config.column[index] = {};
        }
    });

    config.column = _.mapValues(config.column, (column, index0) => {
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
