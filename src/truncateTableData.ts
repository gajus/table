import truncate from 'lodash.truncate';
import type {
  BaseConfig, Row,
} from './types/internal';

/**
 * @todo Make it work with ASCII content.
 */
export const truncateTableData = (rows: Row[], config: BaseConfig): Row[] => {
  return rows.map((cells) => {
    return cells.map((cell, cellIndex) => {
      return truncate(cell, {
        length: config.columns[cellIndex].truncate,
        omission: '…',
      });
    });
  });
};
