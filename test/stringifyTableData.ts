import {
  expect,
} from 'chai';
import stringifyTableData from '../src/stringifyTableData';

describe('stringifyTableData', () => {
  it('converts all cell values to strings', () => {
    const rows = [[null, undefined, true, false],
      [0, -3.141_59, Number.NaN, Number.POSITIVE_INFINITY],
      [['a', 'b'], {cd: 1}]];

    expect(stringifyTableData(rows as never)).to.deep.equal([
      ['null', 'undefined', 'true', 'false'],
      ['0', '-3.14159', 'NaN', 'Infinity'],
      ['a,b', '[object Object]'],
    ]);
  });
});
