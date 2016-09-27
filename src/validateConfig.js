import validate_config from '../dist/validate_config';
import validate_streamConfig from '../dist/validate_streamConfig';

const validate = {
  'config.json': validate_config,
  'streamConfig.json': validate_streamConfig
};

/**
 * @param {string} schemaId
 * @param {formatData~config} config
 * @returns {undefined}
 */
export default (schemaId, config = {}) => {
  if (!validate[schemaId](config)) {
    const errors = validate[schemaId].errors.map((error) => {
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
