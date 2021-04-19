/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import wrapString from '../src/wrapString';

describe('wrapString', () => {
  context('subject is a plain text string', () => {
    context('subject is lesser than the chunk size', () => {
      it('returns subject in a single chunk', () => {
        expect(wrapString('aaa', 3)).to.deep.equal(['aaa']);
      });
    });
    context('subject is larger than the chunk size', () => {
      it('returns subject sliced into multiple chunks', () => {
        expect(wrapString('aaabbbc', 3)).to.deep.equal(['aaa', 'bbb', 'c']);
      });
    });
    context('a chunk starts with a space', () => {
      it('adjusts chunks to offset the space', () => {
        expect(wrapString('aaa   bbb   ccc', 3)).to.deep.equal(['aaa', 'bbb', 'ccc']);
      });
    });
  });
  context('subject string contains ANSI escape codes', () => {
    const openRed = '\u001b[31m';
    const closeRed = '\u001b[39m';
    describe('subject is lesser than the chunk size', () => {
      it('returns subject in a single chunk', () => {
        expect(wrapString(`${openRed}aa${closeRed}`, 3)).to.deep.equal([
          `${openRed}aa${closeRed}`,
        ]);
      });
    });
    describe('subject is larger than the chunk size', () => {
      it('returns subject sliced into multiple chunks', () => {
        expect(wrapString(`${openRed}aaabbbc${closeRed}`, 3)).to.deep.equal([
          `${openRed}aaa${closeRed}`,
          `${openRed}bbb${closeRed}`,
          `${openRed}c${closeRed}`,
        ]);
      });
    });
  });
});
