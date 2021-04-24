/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import calculateCellHeight from '../src/calculateCellHeight';

describe('calculateCellHeight', () => {
  describe('value', () => {
    it('contains newlines', () => {
      expect(calculateCellHeight('a\nb\nc', 10)).to.equal(3);
    });
    it('contains newlines and will be wrapped', () => {
      expect(calculateCellHeight('aa\nbbb\nc', 2)).to.equal(4);
    });
  });
  describe('context width', () => {
    context('is lesser than the column width', () => {
      it('has height 1', () => {
        expect(calculateCellHeight('foo', 10)).to.equal(1);
      });
    });
    context('is 2 and half times greater than the column width', () => {
      it('has height 3', () => {
        expect(calculateCellHeight('aabbc', 2)).to.equal(3);
      });
    });
  });
});
