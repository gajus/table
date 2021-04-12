/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import drawRow from '../src/drawRow';

const drawVerticalLine = () => {
  return true;
};

describe('drawRow', () => {
  context('not provide drawVerticalLine', () => {
    it('draws a row using all parts', () => {
      const parts = {
        bodyJoin: '│',
        bodyLeft: '║',
        bodyRight: '║',
      };

      expect(drawRow([], parts, drawVerticalLine)).to.equal('║║\n');
      expect(drawRow(['a'], parts, drawVerticalLine)).to.equal('║a║\n');
      expect(drawRow(['a', ' b '], parts, drawVerticalLine)).to.equal('║a│ b ║\n');
    });
  });

  context('provide drawVerticalLine', () => {
    it('draw the line when the drawVerticalLine return true', () => {
      const rows = [' a ', ' b ', ' c '];

      const parts = {
        bodyJoin: '│',
        bodyLeft: '║',
        bodyRight: '║',
      };

      expect(drawRow(rows, parts, (index) => {
        return index === 0;
      })).to.equal('║ a  b  c \n');
      expect(drawRow(rows, parts, (index) => {
        return index % 2 === 0;
      })).to.equal('║ a  b │ c \n');
      expect(drawRow(rows, parts, (index, size) => {
        return index > 0 && index < size;
      })).to.equal(' a │ b │ c \n');
    });
  });
});
