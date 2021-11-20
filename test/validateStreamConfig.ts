import {
  expect,
} from 'chai';
import {
  streamValidate,
} from '../src/validateConfig';
import streamConfigSamples from './streamConfigSamples';

describe('streamConfig.json schema', () => {
  it('passes validation of valid streamConfig samples', () => {
    for (const sample of streamConfigSamples.valid) {
      expect(streamValidate(sample)).to.equal(true);
    }
  });

  it('fails validation of invalid streamConfig samples', () => {
    for (const sample of streamConfigSamples.invalid) {
      expect(streamValidate(sample)).to.equal(false);
    }
  });
});
