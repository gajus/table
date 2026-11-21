import type {
  BaseConfig,
  Row,
} from './types/internal';
import {
  sequence,
  sumArray,
} from './utils';
import {
  wrapCell,
} from './wrapCell';
import type {
  WrappedCells,
} from './wrapCell';

/**
 * Produces an array of values that describe the largest value length (height) in every row. The lines of
 * the wrapped cells are kept in wrappedCells, if it is given.
 */
export const calculateRowHeights = (rows: Row[], config: BaseConfig, wrappedCells?: WrappedCells): number[] => {
  const rowHeights: number[] = [];

  for (const [rowIndex, row] of rows.entries()) {
    let rowHeight = 1;
    const wrappedRow: Array<string[] | undefined> = [];

    wrappedCells?.push(wrappedRow);

    row.forEach((cell, cellIndex) => {
      const containingRange = config.spanningCellManager?.getContainingRange({col: cellIndex,
        row: rowIndex});

      if (!containingRange) {
        const cellLines = wrapCell(cell, config.columns[cellIndex].width, config.columns[cellIndex].wrapWord);

        wrappedRow[cellIndex] = cellLines;
        rowHeight = Math.max(rowHeight, cellLines.length);

        return;
      }
      const {topLeft, bottomRight, height} = containingRange;

      // bottom-most cell of a range needs to contain all remain lines of spanning cells
      if (rowIndex === bottomRight.row) {
        const totalOccupiedSpanningCellHeight = sumArray(rowHeights.slice(topLeft.row));
        const totalHorizontalBorderHeight = bottomRight.row - topLeft.row;
        const totalHiddenHorizontalBorderHeight = sequence(topLeft.row + 1, bottomRight.row).filter((horizontalBorderIndex) => {
          /* istanbul ignore next */
          return !config.drawHorizontalLine?.(horizontalBorderIndex, rows.length);
        }).length;

        const cellHeight = height - totalOccupiedSpanningCellHeight - totalHorizontalBorderHeight + totalHiddenHorizontalBorderHeight;
        rowHeight = Math.max(rowHeight, cellHeight);
      }

      // otherwise, just depend on other sibling cell heights in the row
    });

    rowHeights.push(rowHeight);
  }

  return rowHeights;
};
