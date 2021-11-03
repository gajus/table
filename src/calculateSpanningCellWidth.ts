import type {
  SpanningCellParameters,
} from './spanningCellManager';
import type {
  RangeConfig,
} from './types/internal';
import {
  sequence, sumArray,
} from './utils';

export const calculateSpanningCellWidth = (rangeConfig: RangeConfig, dependencies: SpanningCellParameters): number => {
  const {columnsConfig, drawVerticalLine} = dependencies;
  const {topLeft, bottomRight} = rangeConfig;

  const totalWidth = sumArray(
    columnsConfig.slice(topLeft.col, bottomRight.col + 1).map(({width}) => {
      return width;
    }),
  );

  const totalPadding =
    topLeft.col === bottomRight.col ?
      columnsConfig[topLeft.col].paddingRight +
      columnsConfig[bottomRight.col].paddingLeft :
      sumArray(
        columnsConfig
          .slice(topLeft.col, bottomRight.col + 1)
          .map(({paddingLeft, paddingRight}) => {
            return paddingLeft + paddingRight;
          }),
      );
  const totalBorderWidths = bottomRight.col - topLeft.col;

  const totalHiddenVerticalBorders = sequence(topLeft.col + 1, bottomRight.col).filter((verticalBorderIndex) => {
    return !drawVerticalLine(verticalBorderIndex, columnsConfig.length);
  }).length;

  return totalWidth + totalPadding + totalBorderWidths - totalHiddenVerticalBorders;
};
