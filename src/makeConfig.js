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
 * @param {Object} columnDefault
 * @returns {Object}
 */
makeColumns = (rows, columns = {}, columnDefault = {}) => {
    let maximumColumnWidthIndex;

    maximumColumnWidthIndex = calculateMaximumColumnWidthIndex(rows);

    _.times(rows[0].length, (index) => {
        if (_.isUndefined(columns[index])) {
            columns[index] = {};
        }

        columns[index] = _.assign({
            alignment: `left`,
            width: maximumColumnWidthIndex[index],
            truncate: Infinity,
            paddingLeft: 1,
            paddingRight: 1
        }, columnDefault, columns[index]);
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
    config.columns = makeColumns(rows, config.columns, config.columnDefault);

    if (!config.drawHorizontalLine) {
        /**
         * @returns {boolean}
         */
        config.drawHorizontalLine = () => {
            return true;
        };
    }

    return config;
};
