import calculateCellWidths from './calculateCellWidths';
import type {
  Row,
} from './types/internal';

/**
 * Produces an array of values that describe the largest value length (width) in every column.
 */
export default (rows: Row[]): number[] => {
  if (!rows[0]) {
    throw new Error('Dataset must have at least one row.');
  }

  const columnWidths = new Array(rows[0].length).fill(0);

  rows.forEach((row) => {
    const cellWidths = calculateCellWidths(row);

    cellWidths.forEach((cellWidth, index) => {
      columnWidths[index] = Math.max(columnWidths[index], cellWidth);
    });
  });

  return columnWidths;
};
