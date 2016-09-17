import schema from './schemas/streamConfig.json';
import validate from './validate';

/**
 * @typedef {string} cell
 */

/**
 * @typedef {cell[]} validateData~column
 */

/**
 * @param {formatData~config} config
 * @returns {undefined}
 */
export default (config = {}) => validate(schema, config);
