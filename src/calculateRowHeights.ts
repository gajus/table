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

    row.forEach((cell, index) => {
      const cellHeight = calculateCellHeight(cell, config.columns[index].width, config.columns[index].wrapWord);

      rowHeight = Math.max(rowHeight, cellHeight);
    });

    return rowHeight;
  });
};
