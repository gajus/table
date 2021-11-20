import type {
  ErrorObject,
  ValidateFunction,
} from 'ajv/dist/types';
import validators from './generated/validators';
import type {
  TableUserConfig,
} from './types/api';

export const validateConfig = (schemaId: 'config.json' | 'streamConfig.json', config: TableUserConfig): void => {
  const validate = validators[schemaId] as ValidateFunction;
  if (!validate(config) && validate.errors) {
    // eslint-disable-next-line promise/prefer-await-to-callbacks
    const errors = validate.errors.map((error: ErrorObject) => {
      return {
        message: error.message,
        params: error.params,
        schemaPath: error.schemaPath,
      };
    });

    /* eslint-disable no-console */
    console.log('config', config);
    console.log('errors', errors);
    /* eslint-enable no-console */

    throw new Error('Invalid config.');
  }
};
