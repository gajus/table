import Ajv from 'ajv';
import addKeywords from 'ajv-keywords';

var ajv = new Ajv({allErrors: true});
addKeywords(ajv, 'typeof');

/**
 * @param {Object} schema
 * @param {formatData~config} config
 * @returns {undefined}
 */
export default (schema, config = {}) => {
    if (!ajv.validate(schema, config)) {
        /* eslint-disable no-console */
        console.log('config', config);
        console.log('errors', ajv.errors.map(err => ({
            message: err.message,
            params: err.params,
            dataPath: err.dataPath,
            schemaPath: err.schemaPath
        })));
        /* eslint-enable no-console */

        throw new Error('Invalid config.');
    }
};
