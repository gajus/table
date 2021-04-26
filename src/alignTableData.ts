import stringWidth from 'string-width';
import {
  alignString,
} from './alignString';
import type {
  BaseConfig,
  Row,
} from './types/internal';

export const alignTableData = (rows: Row[], config: BaseConfig): Row[] => {
  return rows.map((row) => {
    return row.map((cell, cellIndex) => {
      const column = config.columns[cellIndex];

      if (stringWidth(cell) === column.width) {
        return cell;
      } else {
        return alignString(cell, column.width, column.alignment);
      }
    });
  });
};
