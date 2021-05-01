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
      const {width, alignment} = config.columns[cellIndex];

      return alignString(cell, width, alignment);
    });
  });
};
