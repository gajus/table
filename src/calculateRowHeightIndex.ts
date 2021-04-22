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
      if (typeof config.columns[index1].width !== 'number') {
        throw new TypeError('column[index].width must be a number.');
      }

      if (config.columns[index1].wrapWord !== true && config.columns[index1].wrapWord !== false) {
        throw new TypeError('column[index].wrapWord must be a boolean.');
      }

      cellHeightIndex[index1] = calculateCellHeight(value, config.columns[index1].width, config.columns[index1].wrapWord);
    });

    rowSpanIndex.push(Math.max(...cellHeightIndex));
  });

  return rowSpanIndex;
};
