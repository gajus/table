import _ from 'lodash';
import getBorderCharacters from './getBorderCharacters';
import validateStreamConfig from './validateStreamConfig';

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
 * @param {number} columnCount
 * @param {Object} columns
 * @param {Object} columnDefault
 * @returns {Object}
 */
makeColumns = (columnCount, columns = {}, columnDefault = {}) => {
    _.times(columnCount, (index) => {
        if (_.isUndefined(columns[index])) {
            columns[index] = {};
        }

        columns[index] = _.assign({
            alignment: `left`,
            // width: columnDefault.width,
            truncate: Infinity,
            paddingLeft: 1,
            paddingRight: 1
        }, columnDefault, columns[index]);
    });

    return columns;
};

/**
 * @typedef {Object} columnConfig
 * @property {string} alignment
 * @property {number} width
 * @property {number} truncate
 * @property {number} paddingLeft
 * @property {number} paddingRight
 */

/**
 * @typedef {Object} streamConfig
 * @property {columnConfig} columnDefault
 * @property {Object} border
 * @property {columnConfig[]}
 * @property {number} columnCount Number of columns in the table (required).
 */

/**
 * Makes a new configuration object out of the userConfig object
 * using default values for the missing configuration properties.
 *
 * @param {streamConfig} userConfig
 * @returns {Object}
 */
export default (userConfig = {}) => {
    let config;

    validateStreamConfig(userConfig);

    config = _.cloneDeep(userConfig);

    if (!config.columnDefault || !config.columnDefault.width) {
        throw new Error(`Must provide config.columnDefault.width when creating a stream.`);
    }

    if (!config.columnCount) {
        throw new Error(`Must provide config.columnCount.`);
    }

    config.border = makeBorder(config.border);
    config.columns = makeColumns(config.columnCount, config.columns, config.columnDefault);

    return config;
};
