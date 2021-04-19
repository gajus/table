import stringWidth from 'string-width';
import type {
  Cell,
} from './types/internal';

/**
 * Calculates width of each cell contents.
 */
export default (cells: Cell[]): number[] => {
  return cells.map((value) => {
    return Math.max(
      ...value.split('\n').map((line) => {
        return stringWidth(line);
      }),
    );
  });
};
