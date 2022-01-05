import {
  expect,
} from 'chai';
import {
  calculateSpanningCellWidth,
} from '../src/calculateSpanningCellWidth';
import type {
  RangeConfig,
} from '../src/types/internal';
import {
  baseCellConfig, baseColumnConfig, baseSpanningCellContext,
} from './spanningCellFixtures';

describe('calculateSpanningCellWidth', () => {
  const baseRangeConfig: RangeConfig = {
    ...baseCellConfig,
    bottomRight: {
      col: 1,
      row: 0,
    },
    topLeft: {
      col: 0,
      row: 0,
    },
  };
  it('base', () => {
    const result = calculateSpanningCellWidth(baseRangeConfig, baseSpanningCellContext);

    // = (1 + 15 + 1) + 1 + (1 + 10 + 1)
    expect(result).to.equal(30);
  });

  it('colSpan = 1', () => {
    const result = calculateSpanningCellWidth({...baseRangeConfig,
      bottomRight: {
        col: 0,
        row: 0,
      }}, baseSpanningCellContext);

    // = (1 + 15 + 1)
    expect(result).to.equal(17);
  });

  it('colSpan = 3', () => {
    const result = calculateSpanningCellWidth({...baseRangeConfig,
      bottomRight: {
        col: 2,
        row: 0,
      }}, baseSpanningCellContext);

    // = (1 + 15 + 1) + 1 + (1 + 10 + 1) + 1 + (1 + 20 + 1)
    expect(result).to.equal(53);
  });

  it('increase paddings', () => {
    const result = calculateSpanningCellWidth(baseRangeConfig, {...baseSpanningCellContext,
      columnsConfig: [
        {...baseColumnConfig[0],
          paddingLeft: 2,
          paddingRight: 3},
        {...baseColumnConfig[1],
          paddingRight: 5},
        ...baseColumnConfig.slice(2),
      ]});

    // = (2 + 15 + 3) + 1 + (1 + 10 + 5)
    expect(result).to.equal(37);
  });

  it('hidden border', () => {
    const result = calculateSpanningCellWidth(baseRangeConfig, {...baseSpanningCellContext,
      drawVerticalLine: (index) => {
        return index !== 1;
      }});

    // = (1 + 15 + 1) + 0 + (1 + 10 + 1)
    expect(result).to.equal(29);
  });
});
