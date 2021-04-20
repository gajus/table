import type {
  ValidateFunction,
} from 'ajv/dist/types';
import type {
  TableUserConfig,
  StreamUserConfig,
} from '../api';

declare const validators: {
  'config.json': ValidateFunction<TableUserConfig>,
  'streamConfig.json': ValidateFunction<StreamUserConfig>,
};
export default validators;
