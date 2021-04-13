import cloneDeep from 'lodash.clonedeep';
import getBorderCharacters from './getBorderCharacters';
import validateConfig from './validateConfig';

/**
 * Merges user provided border characters with the default border ("honeywell") characters.
 *
 * @param {object} border
 * @returns {object}
 */
const makeBorder = (border = {}) => {
  return Object.assign({}, getBorderCharacters('honeywell'), border);
};

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 *
 * @param {number} columnCount
 * @param {object} columns
 * @param {object} columnDefault
 * @returns {object}
 */
const makeColumns = (columnCount, columns = {}, columnDefault = {}) => {
  for (let index = 0; index < columnCount; index++) {
    if (typeof columns[index] === 'undefined') {
      columns[index] = {};
    }

    columns[index] = Object.assign({
      alignment: 'left',
      paddingLeft: 1,
      paddingRight: 1,
      truncate: Number.POSITIVE_INFINITY,
      wrapWord: false,
    }, columnDefault, columns[index]);
  }

  return columns;
};

/**
 * @typedef {object} columnConfig
 * @property {string} alignment
 * @property {number} width
 * @property {number} truncate
 * @property {number} paddingLeft
 * @property {number} paddingRight
 */

/**
 * @typedef {object} streamConfig
 * @property {columnConfig} columnDefault
 * @property {object} border
 * @property {columnConfig[]}
 * @property {number} columnCount Number of columns in the table (required).
 */

/**
 * Makes a new configuration object out of the userConfig object
 * using default values for the missing configuration properties.
 *
 * @param {streamConfig} userConfig
 * @returns {object}
 */
export default (userConfig = {}) => {
  validateConfig('streamConfig.json', userConfig);

  const config = cloneDeep(userConfig);

  if (!config.columnDefault || !config.columnDefault.width) {
    throw new Error('Must provide config.columnDefault.width when creating a stream.');
  }

  if (!config.columnCount) {
    throw new Error('Must provide config.columnCount.');
  }

  config.border = makeBorder(config.border);
  config.columns = makeColumns(config.columnCount, config.columns, config.columnDefault);

  if (!config.drawVerticalLine) {
    /**
     * @returns {boolean}
     */
    config.drawVerticalLine = () => {
      return true;
    };
  }

  return config;
};
