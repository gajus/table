import truncate from 'lodash.truncate';
import type {
  BaseConfig, Row,
} from './types/internal';

/**
 * @todo Make it work with ASCII content.
 */
export default (rows: Row[], config: BaseConfig): Row[] => {
  return rows.map((cells) => {
    return cells.map((content, index) => {
      return truncate(content, {
        length: config.columns[index].truncate,
        omission: '…',
      });
    });
  });
};
