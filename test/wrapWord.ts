import {
  expect,
} from 'chai';
import {
  wrapWord,
} from '../src/wrapWord';
import {
  arrayToRed, closeRed, openRed, stringToRed,
} from './utils';

describe('wrapWord', () => {
  it('wraps a string at a nearest whitespace', () => {
    expect(wrapWord('aaa bbb', 5)).to.deep.equal(['aaa', 'bbb']);
    expect(wrapWord('a a a bbb', 5)).to.deep.equal(['a a a', 'bbb']);

    expect(wrapWord(stringToRed('aaa bbb'), 5)).to.deep.equal(arrayToRed(['aaa', 'bbb']));
    expect(wrapWord(stringToRed('a a a bbb'), 5)).to.deep.equal(arrayToRed(['a a a', 'bbb']));
  });
  context('a single word is longer than chunk size', () => {
    it('cuts the word', () => {
      expect(wrapWord('aaaaa', 2)).to.deep.equal(['aa', 'aa', 'a']);

      expect(wrapWord(stringToRed('aaaaa'), 2)).to.deep.equal(arrayToRed(['aa', 'aa', 'a']));
    });
  });
  context('a long word with a special character', () => {
    it('cuts the word at the special character', () => {
      expect(wrapWord('aaa\\bbb', 5)).to.deep.equal(['aaa\\', 'bbb']);
      expect(wrapWord('aaa/bbb', 5)).to.deep.equal(['aaa/', 'bbb']);
      expect(wrapWord('aaa_bbb', 5)).to.deep.equal(['aaa_', 'bbb']);
      expect(wrapWord('aaa-bbb', 5)).to.deep.equal(['aaa-', 'bbb']);
      expect(wrapWord('aaa.bbb', 5)).to.deep.equal(['aaa.', 'bbb']);
      expect(wrapWord('aaa,bbb', 5)).to.deep.equal(['aaa,', 'bbb']);
      expect(wrapWord('aaa;bbb', 5)).to.deep.equal(['aaa;', 'bbb']);

      expect(wrapWord(stringToRed('aaa\\bbb'), 5)).to.deep.equal(arrayToRed(['aaa\\', 'bbb']));
      expect(wrapWord(stringToRed('aaa/bbb'), 5)).to.deep.equal(arrayToRed(['aaa/', 'bbb']));
      expect(wrapWord(stringToRed('aaa_bbb'), 5)).to.deep.equal(arrayToRed(['aaa_', 'bbb']));
      expect(wrapWord(stringToRed('aaa-bbb'), 5)).to.deep.equal(arrayToRed(['aaa-', 'bbb']));
      expect(wrapWord(stringToRed('aaa.bbb'), 5)).to.deep.equal(arrayToRed(['aaa.', 'bbb']));
      expect(wrapWord(stringToRed('aaa,bbb'), 5)).to.deep.equal(arrayToRed(['aaa,', 'bbb']));
      expect(wrapWord(stringToRed('aaa;bbb'), 5)).to.deep.equal(arrayToRed(['aaa;', 'bbb']));
    });
  });
  context('a special character after the length of a container', () => {
    it('does not include special character', () => {
      expect(wrapWord('aa-bbbbb-cccc', 5)).to.deep.equal(['aa-', 'bbbbb', '-cccc']);

      expect(wrapWord(stringToRed('aa-bbbbb-cccc'), 5)).to.deep.equal(arrayToRed(['aa-', 'bbbbb', '-cccc']));
    });
  });

  context('mixed ansi and plain', () => {
    it('returns proper strings', () => {
      expect(wrapWord(`${openRed}Lorem ${closeRed}ipsum dolor ${openRed}sit amet${closeRed}`, 5)).to.deep.equal([
        `${openRed}Lorem${closeRed}`,
        'ipsum',
        'dolor',
        `${openRed}sit${closeRed}`,
        `${openRed}amet${closeRed}`,
      ]);

      expect(wrapWord(`${openRed}Lorem ${closeRed}ipsum dolor ${openRed}sit amet${closeRed}`, 11)).to.deep.equal([
        `${openRed}Lorem ${closeRed}ipsum`,
        `dolor ${openRed}sit${closeRed}`,
        `${openRed}amet${closeRed}`,
      ]);

      expect(wrapWord(`${openRed}Lorem ip${closeRed}sum dolor si${openRed}t amet${closeRed}`, 5)).to.deep.equal([
        `${openRed}Lorem${closeRed}`,
        `${openRed}ip${closeRed}sum`,
        'dolor',
        `si${openRed}t${closeRed}`,
        `${openRed}amet${closeRed}`,
      ]);
    });
  });

  context('multiple ansi', () => {
    it('returns proper strings', () => {
      const openBold = '\u001b[1m';
      const closeBold = '\u001b[22m';

      expect(wrapWord(`${openBold}${openRed}Lorem ipsum dolor sit${closeRed}${closeBold}`, 4)).to.deep.equal(
        [
          `${openBold}${openRed}Lore${closeRed}${closeBold}`,
          `${openBold}${openRed}m${closeRed}${closeBold}`,
          `${openBold}${openRed}ipsu${closeRed}${closeBold}`,
          `${openBold}${openRed}m${closeRed}${closeBold}`,
          `${openBold}${openRed}dolo${closeRed}${closeBold}`,
          `${openBold}${openRed}r${closeRed}${closeBold}`,
          `${openBold}${openRed}sit${closeBold}${closeRed}`],
      );

      expect(wrapWord(`${openBold}${openRed}Lorem ipsum dolor sit${closeRed}${closeBold}`, 5)).to.deep.equal(
        [
          `${openBold}${openRed}Lorem${closeRed}${closeBold}`,
          `${openBold}${openRed}ipsum${closeRed}${closeBold}`,
          `${openBold}${openRed}dolor${closeRed}${closeBold}`,
          `${openBold}${openRed}sit${closeBold}${closeRed}`],
      );
    });
  });
});
