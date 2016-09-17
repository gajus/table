import Ajv from 'ajv';
import addKeywords from 'ajv-keywords';
import configSchema from './schemas/config.json';
import streamConfigSchema from './schemas/streamConfig.json';


var ajv = new Ajv({allErrors: true});
addKeywords(ajv, 'typeof');
ajv.addSchema(configSchema);
ajv.addSchema(streamConfigSchema);

/**
 * @param {String} schemaId
 * @param {formatData~config} config
 * @returns {undefined}
 */
export default (schemaId, config = {}) => {
    if (!ajv.validate(schemaId, config)) {
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
