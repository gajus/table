import {
  expect,
} from 'chai';
import {
  validateSpanningCellConfig,
} from '../src/validateSpanningCellConfig';
import {
  baseRows,
} from './spanningCellFixtures';

describe('validateSpanningCellConfig', () => {
  it('colSpan = 0', () => {
    expect(() => {
      validateSpanningCellConfig(baseRows, [{col: 1,
        colSpan: 0,
        row: 0}]);
    }).to.be.throw();
  });

  it('rowSpan = 0', () => {
    expect(() => {
      validateSpanningCellConfig(baseRows, [{col: 1,
        row: 0,
        rowSpan: 0}]);
    }).to.be.throw();
  });

  it('no given colSpan and rowSpan', () => {
    expect(() => {
      validateSpanningCellConfig(baseRows, [{col: 1,
        row: 0}]);
    }).to.be.throw();
  });

  it('topLeft is out of range', () => {
    expect(() => {
      validateSpanningCellConfig(baseRows, [{col: 4,
        row: 0}]);
    }).to.be.throw();
  });

  it('bottomRight is out of range', () => {
    expect(() => {
      validateSpanningCellConfig(baseRows, [{col: 2,
        colSpan: 3,
        row: 0}]);
    }).to.be.throw();
  });

  it('overlap', () => {
    expect(() => {
      validateSpanningCellConfig(baseRows, [{col: 0,
        row: 0,
        rowSpan: 2}, {col: 0,
        colSpan: 2,
        row: 1}]);
    }).to.be.throw();
  });
});

