import {
    expect
} from 'chai';
import configSamples from './configSamples';
import validate_config from '../dist/validate_config';
import configSchema from '../src/schemas/config.json';
import Ajv from 'ajv';
import ajvKeywords from 'ajv-keywords';

describe('config.json schema', () => {
  var validate;

  before(() => {
    var ajv = new Ajv({allErrors: true});
    ajvKeywords(ajv, 'typeof');
    validate = ajv.compile(configSchema);
  });

  context('valid config samples', () => {
    configSamples.valid.forEach((sample, i) => {
      it('should be valid #' + i, () => {
        testValid(sample, validate);
      });

      it('should be valid with pre-compiled schema #' + i, () => {
        testValid(sample, validate_config);
      });
    });

    function testValid(sample, validate) {
      var valid = validate(sample);
      if (!valid) console.log(validate.errors);
      expect(valid).to.equal(true);
    }
  });
});
