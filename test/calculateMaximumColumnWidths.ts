import {
  expect,
} from 'chai';
import chalk from 'chalk';
import {
  calculateMaximumColumnWidths,
} from '../src/calculateMaximumColumnWidths';

describe('calculateMaximumColumnWidths', () => {
  it('calculates the maximum column value index', () => {
    const columnWidths = calculateMaximumColumnWidths([
      [
        '',
        'a',
        'b',
        'c',
      ],
      [
        '',
        'a',
        'bbbbbbbbbb',
        'c',
      ],
      [
        '',
        '',
        'b',
        'ccccc',
      ],
    ]);

    expect(columnWidths).to.deep.equal([0, 1, 10, 5]);
  });
  context('cell values contain ANSI codes', () => {
    it('uses visual width of the string', () => {
      const columnWidths = calculateMaximumColumnWidths([
        [
          chalk.red('aaaaa'),
        ],
      ]);

      expect(columnWidths[0]).to.equal(5);
    });
  });
  context('cell values contain fullwidth characters', () => {
    it('uses visual width of the string', () => {
      const columnWidths = calculateMaximumColumnWidths([
        [
          chalk.red('古'),
        ],
      ]);

      expect(columnWidths[0]).to.equal(2);
    });
  });
});
