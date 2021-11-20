import {
  createRequire,
} from 'module';
import Ajv from 'ajv';
import ajvKeywords from 'ajv-keywords';
import type {
  ErrorObject,
  Schema,
} from 'ajv/dist/types';
import type {
  TableUserConfig,
} from './types/api';

const esmRequire = createRequire(import.meta.url);

const tableSchema: Schema = esmRequire('./schemas/config.json');
const shareSchema: Schema = esmRequire('./schemas/shared.json');
const streamSchema: Schema = esmRequire('./schemas/streamConfig.json');

const createValidate = (schema: Schema) => {
  const ajvTable = new Ajv({allErrors: true});
  ajvKeywords(ajvTable, 'typeof');
  ajvTable.addSchema(shareSchema, 'shared.json');
  return ajvTable.compile(schema);
};

export const tableValidate = createValidate(tableSchema);
export const streamValidate = createValidate(streamSchema);

export const validateConfig = (schemaId: 'config.json' | 'streamConfig.json', config: TableUserConfig): void => {
  const validate = schemaId === 'config.json' ? tableValidate : streamValidate;
  if (!validate(config) && validate.errors) {
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
