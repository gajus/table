import type {
  ErrorObject,
} from 'ajv/dist/types';
import type {
  TableUserConfig,
} from './types/api';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line import/no-unresolved
import validators from './validators';

export default (schemaId: string, config: TableUserConfig): void => {
  const validate = validators[schemaId];
  if (!validate(config)) {
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
