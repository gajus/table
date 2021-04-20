/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import {
  validateConfig,
} from '../src/validateConfig';

describe('validateConfig', () => {
  context('given invalid config', () => {
    it('throws an error', () => {
      expect(() => {
        validateConfig('config.json', {x: 1} as never);
      }).to.be.throw(
        Error,
        'Invalid config.',
      );
    });
  });

  context('given valid config', () => {
    it('does not throw an error', () => {
      expect(() => {
        validateConfig('config.json', {
          columnDefault: {
            width: 50,
          },
          columns: {
            0: {
              alignment: 'left',
              width: 10,
            },
          },
          drawHorizontalLine: () => {
            return false;
          },
          singleLine: true,
        });
      }).to.be.not.throw();
    });
  });
});
