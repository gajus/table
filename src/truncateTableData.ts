import truncate from 'lodash.truncate';
import type {
  Row,
} from './types/internal';

export const truncateString = (input: string, length: number): string => {
  return truncate(input, {length,
    omission: '…'});
};

/**
 * @todo Make it work with ASCII content.
 */
export const truncateTableData = (rows: Row[], truncates: number[]): Row[] => {
  return rows.map((cells) => {
    return cells.map((cell, cellIndex) => {
      return truncateString(cell, truncates[cellIndex]);
    });
  });
};
