import {
  expect,
} from 'chai';
import drawRow from '../src/drawRow';

describe('drawRow', () => {
  it('draws a row using parts', () => {
    const parts = {
      bodyJoin: '│',
      bodyLeft: '║',
      bodyRight: '║',
    };

    expect(drawRow([], parts)).to.equal('║║\n');
    expect(drawRow(['a'], parts)).to.equal('║a║\n');
    expect(drawRow(['a', ' b '], parts)).to.equal('║a│ b ║\n');
  });
});
