import type {
  BaseConfig,
  Row,
} from './types/internal';

export const padString = (input: string, paddingLeft: number, paddingRight: number): string => {
  return ' '.repeat(paddingLeft) + input + ' '.repeat(paddingRight);
};

export const padTableData = (rows: Row[], config: BaseConfig): Row[] => {
  return rows.map((cells) => {
    return cells.map((cell, cellIndex) => {
      const {paddingLeft, paddingRight} = config.columns[cellIndex];

      return padString(cell, paddingLeft, paddingRight);
    });
  });
};
