import calculateCellHeight from './calculateCellHeight';
import type {
  BaseConfig,
  Row,
} from './types/internal';

/**
 * Produces an array of values that describe the largest value length (height) in every row.
 */
export default (rows: Row[], config: BaseConfig): number[] => {
  return rows.map((row) => {
    let rowHeight = 1;

    row.forEach((cell, cellIndex) => {
      const cellHeight = calculateCellHeight(cell, config.columns[cellIndex].width, config.columns[cellIndex].wrapWord);

      rowHeight = Math.max(rowHeight, cellHeight);
    });

    return rowHeight;
  });
};
