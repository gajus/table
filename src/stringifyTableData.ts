import type {
  Row,
} from './types/internal';
import {
  normalizeString,
} from './utils';

export const stringifyTableData = (rows: unknown[][]): Row[] => {
  return rows.map((cells) => {
    return cells.map((cell) => {
      return normalizeString(String(cell));
    });
  });
};
