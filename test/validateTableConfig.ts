import {
  expect,
} from 'chai';
import {
  tableValidate,
} from '../src/validateConfig';
import {
  tableConfigSamples,
} from './tableConfigSamples';

describe('config.json schema', () => {
  it('passes validation of valid config samples', () => {
    for (const sample of tableConfigSamples.valid) {
      expect(tableValidate(sample)).to.equal(true);
    }
  });

  it('fails validation of invalid config samples', () => {
    for (const sample of tableConfigSamples.invalid) {
      expect(tableValidate(sample)).to.equal(false);
    }
  });
});
