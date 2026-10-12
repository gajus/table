import {
  expect,
} from 'chai';
import {
  calculateMaximumColumnWidths,
} from '../src/calculateMaximumColumnWidths';
import {
  stringToRed,
} from './utils';

describe('calculateMaximumColumnWidths', () => {
  context('all cells have different width', () => {
    it('describes each cell contents width', () => {
      const cellWidths = calculateMaximumColumnWidths([[
        'a',
        'aaa',
        'aaaaaa',
      ]]);

      expect(cellWidths[0]).to.equal(1, 'first column');
      expect(cellWidths[1]).to.equal(3, 'second column');
      expect(cellWidths[2]).to.equal(6, 'third column');
    });
  });
  context('cell contains newline characters', () => {
    it('picks the longest line length', () => {
      const cellWidths = calculateMaximumColumnWidths([[
        'aaaa\naa',
      ]]);

      expect(cellWidths[0]).to.equal(4);
    });
  });
  context('spanning cells', () => {
    it('includes cells spanning a single column', () => {
      const cellWidths = calculateMaximumColumnWidths([
        ['a', 'Heading'],
        ['b', 'c'],
      ], [{col: 1,
        colSpan: 1,
        row: 0}]);

      expect(cellWidths).to.deep.equal([1, 7]);
    });
    it('includes the first cell of a row span and ignores covered cells', () => {
      const cellWidths = calculateMaximumColumnWidths([
        ['Heading', 'y'],
        ['This content is hidden', 'z'],
      ], [{col: 0,
        row: 0,
        rowSpan: 2}]);

      expect(cellWidths).to.deep.equal([7, 1]);
    });
    it('ignores all cells in a span covering multiple columns', () => {
      const cellWidths = calculateMaximumColumnWidths([
        ['Heading spanning two columns', 'Hidden content'],
        ['More hidden content', 'Also hidden'],
        ['a', 'bb'],
      ], [{col: 0,
        colSpan: 2,
        row: 0,
        rowSpan: 2}]);

      expect(cellWidths).to.deep.equal([1, 2]);
    });
    it('measures the display width of multiline single-column spans', () => {
      const cellWidths = calculateMaximumColumnWidths([
        [stringToRed('a\n中文')],
        ['x'],
      ], [{col: 0,
        colSpan: 1,
        row: 0}]);

      expect(cellWidths).to.deep.equal([4]);
    });
  });
});
