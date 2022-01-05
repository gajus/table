import type {
  CellUserConfig, SpanningCellConfig,
} from './types/api';
import type {
  ColumnConfig, RangeConfig,
} from './types/internal';
import {
  calculateRangeCoordinate,
} from './utils';

export const makeRangeConfig = (spanningCellConfig: SpanningCellConfig, columnsConfig: ColumnConfig[]): RangeConfig => {
  const {topLeft, bottomRight} = calculateRangeCoordinate(spanningCellConfig);

  const cellConfig: Required<CellUserConfig> = {
    ...columnsConfig[topLeft.col],
    ...spanningCellConfig,
    paddingRight:
      spanningCellConfig.paddingRight ??
      columnsConfig[bottomRight.col].paddingRight,
  };

  return {...cellConfig,
    bottomRight,
    topLeft};
};
