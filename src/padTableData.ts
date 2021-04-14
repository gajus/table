import type {
  BaseConfig,
  Row,
} from './types/internal';

export default (rows: Row[], config: BaseConfig): Row[] => {
  return rows.map((cells) => {
    return cells.map((value, index1) => {
      const column = config.columns[index1];

      return ' '.repeat(column.paddingLeft) + value + ' '.repeat(column.paddingRight);
    });
  });
};
