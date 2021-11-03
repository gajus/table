import {
  expect,
} from 'chai';
import {
  calculateMaximumColumnWidths,
} from '../src/calculateMaximumColumnWidths';

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
});
