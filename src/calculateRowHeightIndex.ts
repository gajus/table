import calculateCellHeight from './calculateCellHeight';
import type {
  BaseConfig,
  Row,
} from './types/internal';

/**
 * Calculates the vertical row span index.
 */
export default (rows: Row[], config: BaseConfig): number[] => {
  const tableWidth = rows[0].length;

  const rowSpanIndex: number[] = [];

  rows.forEach((cells) => {
    const cellHeightIndex = new Array(tableWidth).fill(1);

    cells.forEach((value, index1) => {
      cellHeightIndex[index1] = calculateCellHeight(value, config.columns[index1].width, config.columns[index1].wrapWord);
    });

    rowSpanIndex.push(Math.max(...cellHeightIndex));
  });

  return rowSpanIndex;
};
