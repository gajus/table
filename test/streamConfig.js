import Ajv from 'ajv';
import ajvKeywords from 'ajv-keywords';
import ajvSchemaDraft06 from 'ajv/lib/refs/json-schema-draft-06.json';
import {
  expect,
} from 'chai';
import validators from '../dist/validators';
import sharedSchema from '../src/schemas/shared.json';
import configSchema from '../src/schemas/streamConfig.json';
import configSamples from './streamConfigSamples';

const validateConfig = validators['streamConfig.json'];

describe('streamConfig.json schema', () => {
  let validate;

  before(() => {
    const ajv = new Ajv({
      allErrors: true,
    });

    ajv.addMetaSchema(ajvSchemaDraft06);

    ajvKeywords(ajv, 'typeof');
    ajv.addSchema(sharedSchema);
    validate = ajv.compile(configSchema);
  });

  it('passes validation of valid streamConfig samples', () => {
    for (const sample of configSamples.valid) {
      expect(validate(sample)).to.equal(true);
      expect(validateConfig(sample)).to.equal(true);
    }
  });

  it('fails validation of invalid streamConfig samples', () => {
    for (const sample of configSamples.invalid) {
      expect(validate(sample)).to.equal(false);
      expect(validateConfig(sample)).to.equal(false);
    }
  });
});
