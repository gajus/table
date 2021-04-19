import isBoolean from 'is-boolean-object';
import isNumber from 'is-number-object';
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
      if (!isNumber(config.columns[index1].width)) {
        throw new TypeError('column[index].width must be a number.');
      }

      if (!isBoolean(config.columns[index1].wrapWord)) {
        throw new TypeError('column[index].wrapWord must be a boolean.');
      }

      cellHeightIndex[index1] = calculateCellHeight(value, config.columns[index1].width, config.columns[index1].wrapWord);
    });

    rowSpanIndex.push(Math.max(...cellHeightIndex));
  });

  return rowSpanIndex;
};
