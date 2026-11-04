import type {
  Row,
} from './types/internal';
import {
  sliceAnsi, splitGraphemes, stripAnsi,
} from './utils';

const omission = '…';

/**
 * Truncates the input to the given number of characters, the omission included. Characters are counted
 * as they are displayed: ANSI escape codes do not count, and an emoji or a letter with its accents
 * counts once.
 */
export const truncateString = (input: string, length: number): string => {
  // Not even the escape codes and the text together exceed the length.
  if (input.length <= length) {
    return input;
  }

  const graphemes = splitGraphemes(stripAnsi(input));

  if (graphemes.length <= length) {
    return input;
  }

  const keep = length - omission.length;

  if (keep < 1) {
    return omission;
  }

  const positions = graphemes.slice(0, keep).reduce((total, grapheme) => {
    return total + grapheme.positions;
  }, 0);

  // Cutting the input keeps its ANSI escape codes and closes any that are still open, so that styles do
  // not leak past the cell.
  return sliceAnsi(input, 0, positions) + omission;
};

export const truncateTableData = (rows: Row[], truncates: number[]): Row[] => {
  return rows.map((cells) => {
    return cells.map((cell, cellIndex) => {
      return truncateString(cell, truncates[cellIndex]);
    });
  });
};
