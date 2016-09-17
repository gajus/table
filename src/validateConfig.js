import Ajv from 'ajv';
import addKeywords from 'ajv-keywords';
import configSchema from './schemas/config.json';
import streamConfigSchema from './schemas/streamConfig.json';

const ajv = new Ajv({
  allErrors: true
});

addKeywords(ajv, 'typeof');

ajv.addSchema(configSchema);
ajv.addSchema(streamConfigSchema);

/**
 * @param {string} schemaId
 * @param {formatData~config} config
 * @returns {undefined}
 */
export default (schemaId, config = {}) => {
  if (!ajv.validate(schemaId, config)) {
    const errors = ajv.errors.map((error) => {
      return {
        dataPath: error.dataPath,
        message: error.message,
        params: error.params,
        schemaPath: error.schemaPath
      };
    });

    /* eslint-disable no-console */
    console.log('config', config);
    console.log('errors', errors);
    /* eslint-enable no-console */

    throw new Error('Invalid config.');
  }
};
