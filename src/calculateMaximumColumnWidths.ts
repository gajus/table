import stringWidth from 'string-width';
import type {
  SpanningCellConfig,
} from './types/api';
import type {
  Row,
  Cell,
} from './types/internal';
import {
  calculateRangeCoordinate, isCellInRange,
} from './utils';

export const calculateMaximumCellWidth = (cell: Cell): number => {
  return Math.max(
    ...cell.split('\n').map(stringWidth),
  );
};

/**
 * Produces an array of values that describe the largest value length (width) in every column.
 */
export const calculateMaximumColumnWidths = (rows: Row[], spanningCellConfigs: SpanningCellConfig[] = []): number[] => {
  const columnWidths = new Array(rows[0].length).fill(0);
  const rangeCoordinates = spanningCellConfigs.map(calculateRangeCoordinate);

  rows.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      const range = rangeCoordinates.find((rangeCoordinate) => {
        return isCellInRange({col: cellIndex,
          row: rowIndex}, rangeCoordinate);
      });

      if (range && (range.topLeft.col !== range.bottomRight.col || range.topLeft.row !== rowIndex)) {
        return;
      }
      columnWidths[cellIndex] = Math.max(columnWidths[cellIndex], calculateMaximumCellWidth(cell));
    });
  });

  return columnWidths;
};
