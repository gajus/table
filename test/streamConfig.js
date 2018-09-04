import {
  expect
} from 'chai';
import Ajv from 'ajv';
import ajvKeywords from 'ajv-keywords';
import ajvSchemaDraft06 from 'ajv/lib/refs/json-schema-draft-06.json';
import validateConfig from '../dist/validateStreamConfig';
import configSchema from '../src/schemas/streamConfig.json';
import configSamples from './streamConfigSamples';

describe('streamConfig.json schema', () => {
  let validate;

  before(() => {
    const ajv = new Ajv({
      allErrors: true
    });

    ajv.addMetaSchema(ajvSchemaDraft06);

    ajvKeywords(ajv, 'typeof');

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
