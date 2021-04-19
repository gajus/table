import stringWidth from 'string-width';
import alignString from './alignString';
import type {
  BaseConfig,
  Row,
} from './types/internal';

export default (rows: Row[], config: BaseConfig): Row[] => {
  return rows.map((row) => {
    return row.map((cell, index) => {
      const column = config.columns[index];

      if (stringWidth(cell) === column.width) {
        return cell;
      } else {
        return alignString(cell, column.width, column.alignment);
      }
    });
  });
};
