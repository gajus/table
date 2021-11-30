import {
  expect,
} from 'chai';
import chalk from 'chalk';
import {
  alignString,
} from '../src/alignString';
import {
  stringToRed,
} from './utils';

describe('alignString', () => {
  context('subject parameter value width is greater than the container width', () => {
    it('throws an error', () => {
      expect(() => {
        alignString('aa', 1, 'left');
      }).to.throw(Error, 'Subject parameter value width cannot be greater than the container width.');
    });
  });

  context('subject parameter value', () => {
    context('0 width', () => {
      it('produces a string consisting of container width number of whitespace characters', () => {
        expect(alignString('', 5, 'left')).to.equal('     ', 'left');
        expect(alignString('', 5, 'center')).to.equal('     ', 'center');
        expect(alignString('', 5, 'justify')).to.equal('     ', 'justify');
        expect(alignString('', 5, 'right')).to.equal('     ', 'right');
      });
    });
    context('plain text', () => {
      context('alignment', () => {
        context('left', () => {
          it('pads the string on the right side using a whitespace character', () => {
            expect(alignString('aa', 6, 'left')).to.equal('aa    ');
          });
        });
        context('right', () => {
          it('pads the string on the left side using a whitespace character', () => {
            expect(alignString('aa', 6, 'right')).to.equal('    aa');
          });
        });
        context('center', () => {
          it('pads the string on both sides using a whitespace character', () => {
            expect(alignString('aa', 8, 'center')).to.equal('   aa   ');
          });
          context('uneven number of available with', () => {
            it('floors the available width; adds extra space to the end of the string', () => {
              expect(alignString('aa', 7, 'center')).to.equal('  aa   ');
            });
          });
        });

        context('justify', () => {
          it('align left if not contain spaces', () => {
            expect(alignString('aa', 5, 'justify')).to.equal('aa   ');
          });

          it('add missing spaces between two words', () => {
            expect(alignString('a a', 5, 'justify')).to.equal('a   a');
            expect(alignString('a  a', 5, 'justify')).to.equal('a   a');
            expect(alignString('a   a', 5, 'justify')).to.equal('a   a');
          });

          it('multiple words, distribute spaces from left to right when maximum adding spaces in one place are not greater than 3', () => {
            expect(alignString('a b c', 5, 'justify')).to.equal('a b c');
            expect(alignString('a b c', 6, 'justify')).to.equal('a  b c');
            expect(alignString('a b c', 7, 'justify')).to.equal('a  b  c');
            expect(alignString('a b c', 8, 'justify')).to.equal('a   b  c');
            expect(alignString('a b c', 9, 'justify')).to.equal('a   b   c');
            expect(alignString('a b c', 10, 'justify')).to.equal('a    b   c');
            expect(alignString('a b c', 11, 'justify')).to.equal('a    b    c');
            expect(alignString('a b c', 12, 'justify')).to.equal('a b c       ');

            expect(alignString('a  bbb cc d', 11, 'justify')).to.equal('a  bbb cc d');
            expect(alignString('a  bbb cc d', 12, 'justify')).to.equal('a   bbb cc d');
            expect(alignString('a  bbb cc d', 13, 'justify')).to.equal('a   bbb  cc d');
            expect(alignString('a  bbb cc d', 14, 'justify')).to.equal('a   bbb  cc  d');
          });
        });
      });
    });
    context('text containing ANSI escape codes', () => {
      context('alignment', () => {
        context('left', () => {
          it('pads the string on the right side using a whitespace character', () => {
            expect(alignString(chalk.red('aa'), 6, 'left')).to.equal(chalk.red('aa') + '    ');
          });
        });
        context('right', () => {
          it('pads the string on the left side using a whitespace character', () => {
            expect(alignString(chalk.red('aa'), 6, 'right')).to.equal('    ' + chalk.red('aa'));
          });
        });
        context('center', () => {
          it('pads the string on both sides using a whitespace character', () => {
            expect(alignString(chalk.red('aa'), 6, 'center')).to.equal('  ' + chalk.red('aa') + '  ');
          });
          context('uneven number of available with', () => {
            it('floors the available width; adds extra space to the end of the string', () => {
              expect(alignString(chalk.red('aa'), 7, 'center')).to.equal('  ' + chalk.red('aa') + '   ');
            });
          });
        });
        context('justify', () => {
          it('align left if not contain spaces', () => {
            expect(alignString(chalk.red('aa'), 5, 'justify')).to.equal(chalk.red('aa') + '   ');
          });

          it('add missing spaces between two words', () => {
            expect(alignString(stringToRed('a a'), 5, 'justify')).to.equal(stringToRed('a   a'));
            expect(alignString(stringToRed('a  a'), 5, 'justify')).to.equal(stringToRed('a   a'));
            expect(alignString(stringToRed('a   a'), 5, 'justify')).to.equal(stringToRed('a   a'));
          });

          it('multiple words, uneven spaces add from left to right', () => {
            expect(alignString(stringToRed('a b c'), 5, 'justify')).to.equal(stringToRed('a b c'));
            expect(alignString(stringToRed('a b c'), 6, 'justify')).to.equal(stringToRed('a  b c'));
            expect(alignString(stringToRed('a b c'), 7, 'justify')).to.equal(stringToRed('a  b  c'));
            expect(alignString(stringToRed('a b c'), 8, 'justify')).to.equal(stringToRed('a   b  c'));
            expect(alignString(stringToRed('a b c'), 9, 'justify')).to.equal(stringToRed('a   b   c'));
            expect(alignString(stringToRed('a b c'), 10, 'justify')).to.equal(stringToRed('a    b   c'));

            expect(alignString(stringToRed('a  bbb cc d'), 11, 'justify')).to.equal(stringToRed('a  bbb cc d'));
            expect(alignString(stringToRed('a  bbb cc d'), 12, 'justify')).to.equal(stringToRed('a   bbb cc d'));
            expect(alignString(stringToRed('a  bbb cc d'), 13, 'justify')).to.equal(stringToRed('a   bbb  cc d'));
            expect(alignString(stringToRed('a  bbb cc d'), 14, 'justify')).to.equal(stringToRed('a   bbb  cc  d'));
          });
        });
      });
    });
  });
});
