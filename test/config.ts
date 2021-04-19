import type {
  ValidateFunction,
} from 'ajv';
import Ajv from 'ajv';
import ajvKeywords from 'ajv-keywords';
import {
  expect,
} from 'chai';
import configSchema from '../src/schemas/config.json';
import sharedSchema from '../src/schemas/shared.json';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line import/no-unresolved
import validators from '../src/validators';
import configSamples from './configSamples';

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
    for (const sample of configSamples.valid) {
      expect(validate(sample)).to.equal(true);
      expect(validateConfig(sample)).to.equal(true);
    }
  });

  it('fails validation of invalid config samples', () => {
    for (const sample of configSamples.invalid) {
      expect(validate(sample)).to.equal(false);
      expect(validateConfig(sample)).to.equal(false);
    }
  });
});
