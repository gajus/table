import {
  expect,
} from 'chai';
import chalk from 'chalk';
import calculateColumnWidths from '../src/calculateColumnWidths';

describe('calculateColumnWidths', () => {
  it('throws an error when attempting to calculate maximum column value index for an empty data set', () => {
    expect(() => {
      calculateColumnWidths([]);
    }).to.throw(Error, 'Dataset must have at least one row.');
  });
  it('calculates the maximum column value index', () => {
    const columnWidths = calculateColumnWidths([
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
      const columnWidths = calculateColumnWidths([
        [
          chalk.red('aaaaa'),
        ],
      ]);

      expect(columnWidths[0]).to.equal(5);
    });
  });
  context('cell values contain fullwidth characters', () => {
    it('uses visual width of the string', () => {
      const columnWidths = calculateColumnWidths([
        [
          chalk.red('古'),
        ],
      ]);

      expect(columnWidths[0]).to.equal(2);
    });
  });
});
