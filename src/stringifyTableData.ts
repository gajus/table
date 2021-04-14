import type {
  Row,
} from './types/internal';

export default (rows: unknown[][]): Row[] => {
  return rows.map((cells) => {
    return cells.map(String);
  });
};
