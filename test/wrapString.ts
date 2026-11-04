/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import {
  wrapString,
} from '../src/wrapString';
import {
  arrayToRed, stringToRed,
} from './utils';

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
  context('subject contains emoji', () => {
    it('measures emoji by display width (#210)', () => {
      expect(wrapString('🧪aaaa', 5)).to.deep.equal(['🧪aaa', 'a']);
      expect(wrapString(stringToRed('🧪aaaa'), 5)).to.deep.equal(arrayToRed(['🧪aaa', 'a']));
    });
    it('does not split or overflow an emoji', () => {
      expect(wrapString('🧪🧪🧪', 3)).to.deep.equal(['🧪', '🧪', '🧪']);
      expect(wrapString('👨\u200D👩\u200D👧👨\u200D👩\u200D👧', 3)).to.deep.equal(['👨\u200D👩\u200D👧', '👨\u200D👩\u200D👧']);
    });
  });
  context('subject contains wide characters', () => {
    it('does not split a wide character', () => {
      expect(wrapString('你好世界', 3)).to.deep.equal(['你', '好', '世', '界']);
    });
  });
  context('a chunk size smaller than one', () => {
    it('makes progress', () => {
      expect(wrapString('ab', 0)).to.deep.equal(['a', 'b']);
    });
  });
});
