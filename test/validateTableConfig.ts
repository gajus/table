import type {
  ValidateFunction,
} from 'ajv';
import Ajv from 'ajv';
import ajvKeywords from 'ajv-keywords';
import {
  expect,
} from 'chai';
import validators from '../src/generated/validators';
import configSchema from '../src/schemas/config.json';
import sharedSchema from '../src/schemas/shared.json';
import {
  tableConfigSamples,
} from './tableConfigSamples';

const validateConfig = validators['config.json'];

describe('config.json schema', () => {
  let validate: ValidateFunction;

  before(() => {
    const ajv = new Ajv({allErrors: true});

    ajvKeywords(ajv, 'typeof');
    ajv.addSchema(sharedSchema);
    validate = ajv.compile(configSchema);
  });

  it('passes validation of valid config samples', () => {
    for (const sample of tableConfigSamples.valid) {
      expect(validate(sample)).to.equal(true);
      expect(validateConfig(sample)).to.equal(true);
    }
  });

  it('fails validation of invalid config samples', () => {
    for (const sample of tableConfigSamples.invalid) {
      expect(validate(sample)).to.equal(false);
      expect(validateConfig(sample)).to.equal(false);
    }
  });
});
