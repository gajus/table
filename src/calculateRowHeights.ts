import {
  calculateCellHeight,
} from './calculateCellHeight';
import type {
  BaseConfig,
  Row,
} from './types/internal';

/**
 * Produces an array of values that describe the largest value length (height) in every row.
 */
export const calculateRowHeights = (rows: Row[], config: BaseConfig): number[] => {
  return rows.map((row) => {
    let rowHeight = 1;

    for (const [cellIndex, cell] of row.entries()) {
      const cellHeight = calculateCellHeight(cell, config.columns[cellIndex].width, config.columns[cellIndex].wrapWord);

      rowHeight = Math.max(rowHeight, cellHeight);
    }

    return rowHeight;
  });
};
