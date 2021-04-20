import type {
  BaseConfig,
  Row,
} from './types/internal';

export const padTableData = (rows: Row[], config: BaseConfig): Row[] => {
  return rows.map((cells) => {
    return cells.map((cell, cellIndex) => {
      const column = config.columns[cellIndex];

      return ' '.repeat(column.paddingLeft) + cell + ' '.repeat(column.paddingRight);
    });
  });
};
