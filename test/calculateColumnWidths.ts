/* eslint-disable max-nested-callbacks */
import {
  expect,
} from 'chai';
import {
  calculateColumnWidths,
} from '../src/calculateColumnWidths';

const MAX_COLUMN_WIDTHS = [20, 10, 30];

describe('calculateColumnWidths', () => {
  describe('when just provide maxColumnWidth', () => {
    it('keep that value', () => {
      const result = calculateColumnWidths(MAX_COLUMN_WIDTHS);

      expect(result).to.be.deep.equal(MAX_COLUMN_WIDTHS);
    });
  });

  describe('when given columnDefault\'s width', () => {
    it('adjust by those values', () => {
      const result = calculateColumnWidths(MAX_COLUMN_WIDTHS, {}, {width: 5});

      expect(result).to.be.deep.equal([5, 5, 5]);
    });
  });

  describe('when given columnsConfig\'s width', () => {
    it('adjust by those values', () => {
      const result = calculateColumnWidths(MAX_COLUMN_WIDTHS,
        {
          1: {width: 5},
        }, {width: 7});

      expect(result).to.be.deep.equal([7, 5, 7]);
    });
  });

  describe('auto column width', () => {
    describe('when there is enough space', () => {
      it('should calculate properly', () => {
        // Total padding and border are 10
        const asserts: Array<[Parameters<typeof calculateColumnWidths>, number[]]> = [
          [[MAX_COLUMN_WIDTHS, {}, {width: 'auto'}, 9], [20, 10, 30]],
          [[MAX_COLUMN_WIDTHS, {1: {width: 3}}, {width: 'auto'}, 9], [20, 3, 30]],
          [[MAX_COLUMN_WIDTHS, {1: {width: 'auto'}}, {width: 4}, 9], [4, 4, 4]],

          [[MAX_COLUMN_WIDTHS, {}, {width: 'auto'}, 10], [0, 0, 0]],
          [[MAX_COLUMN_WIDTHS, {}, {width: 'auto'}, 11], [1, 0, 0]],
          [[MAX_COLUMN_WIDTHS, {}, {width: 'auto'}, 12], [1, 1, 0]],
          [[MAX_COLUMN_WIDTHS, {}, {width: 'auto'}, 13], [1, 1, 1]],
          [[MAX_COLUMN_WIDTHS, {}, {width: 'auto'}, 20], [4, 3, 3]],
          [[MAX_COLUMN_WIDTHS, {2: {width: 'auto'}}, {width: 'auto'}, 20], [4, 3, 3]],
          [[MAX_COLUMN_WIDTHS, {2: {width: 'auto'}}, undefined, 20], [20, 10, 30]],

          [[MAX_COLUMN_WIDTHS, {1: {width: 3}}, {width: 'auto'}, 12], [20, 3, 30]],
          [[MAX_COLUMN_WIDTHS, {1: {width: 3}}, {width: 'auto'}, 15], [1, 3, 1]],
          [[MAX_COLUMN_WIDTHS, {1: {width: 3}}, {width: 'auto'}, 18], [3, 3, 2]],

          [[MAX_COLUMN_WIDTHS, {1: {width: 'auto'}}, {width: 4}, 14], [4, 4, 4]],
          [[MAX_COLUMN_WIDTHS, {1: {width: 'auto'}}, {width: 4}, 19], [4, 1, 4]],
          [[MAX_COLUMN_WIDTHS, {1: {width: 'auto'}}, {width: 4}, 25], [4, 7, 4]],
        ];
        asserts.forEach(([parameters, expected]) => {
          expect(calculateColumnWidths(...parameters)).to.be.deep.equal(expected);
        });
      });
    });

    describe('when there is not enough space', () => {
      it('should throw an error', () => {
        expect(() => {
          return calculateColumnWidths([20, 'auto'], undefined, undefined, 10);
        }).to.be.throw();
      });
    });
  });
});
