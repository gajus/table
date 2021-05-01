import truncate from 'lodash.truncate';
import type {
  BaseConfig, Row,
} from './types/internal';

export const truncateString = (input: string, length: number): string => {
  return truncate(input, {length,
    omission: '…'});
};

/**
 * @todo Make it work with ASCII content.
 */
export const truncateTableData = (rows: Row[], config: BaseConfig): Row[] => {
  return rows.map((cells) => {
    return cells.map((cell, cellIndex) => {
      return truncateString(cell, config.columns[cellIndex].truncate);
    });
  });
};
