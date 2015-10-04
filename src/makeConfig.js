import _ from 'lodash';
import getBorderCharacters from './getBorderCharacters';
import validateConfig from './validateConfig';
import calculateMaximumColumnWidthIndex from './calculateMaximumColumnWidthIndex';

let makeBorder,
    makeColumns;

/**
 * Merges user provided border characters with the default border ("honeywell") characters.
 *
 * @param {Object} border
 * @returns {Object}
 */
makeBorder = (border = {}) => {
    return _.assign({}, getBorderCharacters(`honeywell`), border);
};

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 *
 * @param {Array[]} rows
 * @param {Object} columns
 * @returns {Object}
 */
makeColumns = (rows, columns = {}) => {
    let maximumColumnWidthIndex;

    maximumColumnWidthIndex = calculateMaximumColumnWidthIndex(rows);

    _.times(rows[0].length, (index) => {
        if (_.isUndefined(columns[index])) {
            columns[index] = {};
        }

        if (_.isUndefined(columns[index].alignment)) {
            columns[index].alignment = `left`;
        }

        if (_.isUndefined(columns[index].width)) {
            columns[index].width = maximumColumnWidthIndex[index];
        }

        if (_.isUndefined(columns[index].paddingLeft)) {
            columns[index].paddingLeft = 1;
        }

        if (_.isUndefined(columns[index].paddingRight)) {
            columns[index].paddingRight = 1;
        }
    });

    return columns;
};

/**
 * Makes a new configuration object out of the userConfig object
 * using default values for the missing configuration properties.
 *
 * @param {Array[]} rows
 * @param {Object} userConfig
 * @returns {Object}
 */
export default (rows, userConfig = {}) => {
    let config;

    validateConfig(userConfig);

    config = _.cloneDeep(userConfig);

    config.border = makeBorder(config.border);
    config.columns = makeColumns(rows, config.columns);

    if (!config.drawJoin) {
        /**
         * @returns {boolean}
         */
        config.drawJoin = () => {
            return true;
        };
    }

    return config;
};
