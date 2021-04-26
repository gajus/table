import type {
  Row,
} from './types/internal';
import {
  normalizeString,
} from './utils';

export default (rows: unknown[][]): Row[] => {
  return rows.map((cells) => {
    return cells.map((cell) => {
      return normalizeString(String(cell));
    });
  });
};
