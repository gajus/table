import {
  expect
} from 'chai';
import Ajv from 'ajv';
import ajvKeywords from 'ajv-keywords';
import validateConfig from '../dist/validateConfig';
import configSchema from '../src/schemas/config.json';
import configSamples from './configSamples';

describe('config.json schema', () => {
  let validate;

  before(() => {
    const ajv = new Ajv({allErrors: true});

    ajvKeywords(ajv, 'typeof');
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
