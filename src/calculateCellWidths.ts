import stringWidth from 'string-width';
import type {
  Cell,
} from './types/internal';

/**
 * Calculates width of each cell contents in a row.
 */
export default (cells: Cell[]): number[] => {
  return cells.map((cell) => {
    return Math.max(
      ...cell.split('\n').map(stringWidth),
    );
  });
};
