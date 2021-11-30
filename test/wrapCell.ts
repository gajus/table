import {
  expect,
} from 'chai';
import {
  wrapCell,
} from '../src/wrapCell';
import {
  wrapString,
} from '../src/wrapString';
import {
  wrapWord,
} from '../src/wrapWord';
import {
  arrayToRed,
  stringToRed,
} from './utils';

describe('wrapCell', () => {
  const strings = ['aa bb cc', 'a a bb cccc', 'aaabbcc', 'a\\bb', 'a_bb', 'a-bb', 'a.bb', 'a,bb', 'a;bb'];

  context('useWrapWord is enabled', () => {
    context('the string does not contain the newline character', () => {
      it('returns the same output as wrapWord\'s', () => {
        for (const string of strings) {
          expect(wrapCell(string, 3, true)).to.deep.equal(wrapWord(string, 3));
          expect(wrapCell(stringToRed(string), 3, true)).to.deep.equal(arrayToRed(wrapWord(string, 3)));
        }
      });
    });

    context('the string does contains the newline character', () => {
      context('the length of lineChunk is smaller than the length of container', () => {
        it('splits by the newlines', () => {
          expect(wrapCell('\n', 5, true)).to.deep.equal(['', '']);
          expect(wrapCell('a\n', 5, true)).to.deep.equal(['a', '']);
          expect(wrapCell('\na', 5, true)).to.deep.equal(['', 'a']);
          expect(wrapCell('\na\n', 5, true)).to.deep.equal(['', 'a', '']);
          expect(wrapCell('a\na', 5, true)).to.deep.equal(['a', 'a']);
          expect(wrapCell('a \na', 5, true)).to.deep.equal(['a', 'a']);
          expect(wrapCell('\n\n', 5, true)).to.deep.equal(['', '', '']);
          expect(wrapCell('a\n\n', 5, true)).to.deep.equal(['a', '', '']);
          expect(wrapCell('\n\na', 5, true)).to.deep.equal(['', '', 'a']);
          expect(wrapCell('a\n\nb', 5, true)).to.deep.equal(['a', '', 'b']);
          expect(wrapCell('a\n\n\nb', 5, true)).to.deep.equal(['a', '', '', 'b']);

          expect(wrapCell(stringToRed('\n'), 5, true)).to.deep.equal(arrayToRed(['', '']));
          expect(wrapCell(stringToRed('a\n'), 5, true)).to.deep.equal(arrayToRed(['a', '']));
          expect(wrapCell(stringToRed('\na'), 5, true)).to.deep.equal(arrayToRed(['', 'a']));
          expect(wrapCell(stringToRed('\na\n'), 5, true)).to.deep.equal(arrayToRed(['', 'a', '']));
          expect(wrapCell(stringToRed('a\na'), 5, true)).to.deep.equal(arrayToRed(['a', 'a']));
          expect(wrapCell(stringToRed('a \na'), 5, true)).to.deep.equal(arrayToRed(['a', 'a']));
          expect(wrapCell(stringToRed('\n\n'), 5, true)).to.deep.equal(arrayToRed(['', '', '']));
          expect(wrapCell(stringToRed('a\n\n'), 5, true)).to.deep.equal(arrayToRed(['a', '', '']));
          expect(wrapCell(stringToRed('\n\na'), 5, true)).to.deep.equal(arrayToRed(['', '', 'a']));
          expect(wrapCell(stringToRed('a\n\nb'), 5, true)).to.deep.equal(arrayToRed(['a', '', 'b']));
          expect(wrapCell(stringToRed('a\n\n\nb'), 5, true)).to.deep.equal(arrayToRed(['a', '', '', 'b']));
        });
      });

      context('the length of lineChunk is longer than the length of container', () => {
        it('continues cut the word by wrapWord function', () => {
          expect(wrapCell('aaa bbb\nc', 3, true)).to.deep.equal(['aaa', 'bbb', 'c']);
          expect(wrapCell('a b c\nd', 3, true)).to.deep.equal(['a b', 'c', 'd']);
          expect(wrapCell('aaaa\nbbbb', 3, true)).to.deep.equal(['aaa', 'a', 'bbb', 'b']);
          expect(wrapCell('a\\bb\nc', 3, true)).to.deep.equal(['a\\', 'bb', 'c']);
          expect(wrapCell('a/bb\nc', 3, true)).to.deep.equal(['a/', 'bb', 'c']);
          expect(wrapCell('a_bb\nc', 3, true)).to.deep.equal(['a_', 'bb', 'c']);
          expect(wrapCell('a-bb\nc', 3, true)).to.deep.equal(['a-', 'bb', 'c']);
          expect(wrapCell('a.bb\nc', 3, true)).to.deep.equal(['a.', 'bb', 'c']);
          expect(wrapCell('a,bb\nc', 3, true)).to.deep.equal(['a,', 'bb', 'c']);
          expect(wrapCell('a;bb\nc', 3, true)).to.deep.equal(['a;', 'bb', 'c']);
          expect(wrapCell('aaa-b\nc', 3, true)).to.deep.equal(['aaa', '-b', 'c']);

          expect(wrapCell(stringToRed('aaa bbb\nc'), 3, true)).to.deep.equal(arrayToRed(['aaa', 'bbb', 'c']));
          expect(wrapCell(stringToRed('a b c\nd'), 3, true)).to.deep.equal(arrayToRed(['a b', 'c', 'd']));
          expect(wrapCell(stringToRed('aaaa\nbbbb'), 3, true)).to.deep.equal(arrayToRed(['aaa', 'a', 'bbb', 'b']));
          expect(wrapCell(stringToRed('a\\bb\nc'), 3, true)).to.deep.equal(arrayToRed(['a\\', 'bb', 'c']));
          expect(wrapCell(stringToRed('a/bb\nc'), 3, true)).to.deep.equal(arrayToRed(['a/', 'bb', 'c']));
          expect(wrapCell(stringToRed('a_bb\nc'), 3, true)).to.deep.equal(arrayToRed(['a_', 'bb', 'c']));
          expect(wrapCell(stringToRed('a-bb\nc'), 3, true)).to.deep.equal(arrayToRed(['a-', 'bb', 'c']));
          expect(wrapCell(stringToRed('a.bb\nc'), 3, true)).to.deep.equal(arrayToRed(['a.', 'bb', 'c']));
          expect(wrapCell(stringToRed('a,bb\nc'), 3, true)).to.deep.equal(arrayToRed(['a,', 'bb', 'c']));
          expect(wrapCell(stringToRed('a;bb\nc'), 3, true)).to.deep.equal(arrayToRed(['a;', 'bb', 'c']));
          expect(wrapCell(stringToRed('aaa-b\nc'), 3, true)).to.deep.equal(arrayToRed(['aaa', '-b', 'c']));
        });
      });
    });
  });

  context('useWrapWord is disable', () => {
    context('the string does not contain the newline character', () => {
      it('returns the same output as wrapString\'s', () => {
        for (const string of strings) {
          expect(wrapCell(string, 3, false)).to.deep.equal(wrapString(string, 3));
        }
      });
    });

    context('the string contains the newline character', () => {
      context('the length of lineChunk is smaller than the length of container', () => {
        it('splits by the newlines and does not trim the chunks', () => {
          expect(wrapCell('\n', 5, false)).to.deep.equal(['', '']);
          expect(wrapCell(' a \n', 5, false)).to.deep.equal([' a ', '']);
          expect(wrapCell('\n a ', 5, false)).to.deep.equal(['', ' a ']);
          expect(wrapCell('\n a \n', 5, false)).to.deep.equal(['', ' a ', '']);
          expect(wrapCell(' a \n b ', 5, false)).to.deep.equal([' a ', ' b ']);

          expect(wrapCell('\n\n', 5, false)).to.deep.equal(['', '', '']);
          expect(wrapCell(' a \n\n', 5, false)).to.deep.equal([' a ', '', '']);
          expect(wrapCell('\n\n a ', 5, false)).to.deep.equal(['', '', ' a ']);
          expect(wrapCell(' a \n\n b ', 5, false)).to.deep.equal([' a ', '', ' b ']);
          expect(wrapCell(' a \n\n\n b ', 5, false)).to.deep.equal([' a ', '', '', ' b ']);
        });
      });

      context('the length of lineChunk is longer than the length of container', () => {
        it('cuts each chunkLine by wrapString and trim the small chunk if it starts with whitespace', () => {
          expect(wrapCell('    \nb', 3, false)).to.deep.equal(['   ', 'b']);
          expect(wrapCell('a   \nb', 3, false)).to.deep.equal(['a  ', 'b']);
          expect(wrapCell('aa  \nb', 3, false)).to.deep.equal(['aa ', 'b']);
          expect(wrapCell('aaa \nb', 3, false)).to.deep.equal(['aaa', 'b']);
          expect(wrapCell('aaaa\nb', 3, false)).to.deep.equal(['aaa', 'a', 'b']);

          expect(wrapCell('a   b\nc', 3, false)).to.deep.equal(['a  ', 'b', 'c']);
          expect(wrapCell('a    b\nc', 3, false)).to.deep.equal(['a  ', 'b', 'c']);
          expect(wrapCell('a     b\nc', 3, false)).to.deep.equal(['a  ', 'b', 'c']);

          expect(wrapCell('aaa b\n c', 3, false)).to.deep.equal(['aaa', 'b', ' c']);
        });
      });
    });
  });
});
