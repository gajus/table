import truncate from 'lodash.truncate';
import type {
  Row,
} from './types/internal';
import {
  calculateSliceLength, sliceAnsi, stripAnsi,
} from './utils';

const omission = '…';

export const truncateString = (input: string, length: number): string => {
  // Not even the escape codes and the text together exceed the length.
  if (input.length <= length) {
    return input;
  }

  // Truncate the visible text, so that ANSI escape codes do not count towards the length.
  const visible = stripAnsi(input);
  const truncated = truncate(visible, {length,
    omission});

  if (truncated === visible) {
    return input;
  }

  // Cut the input after the same characters, which keeps its ANSI escape codes and closes any that
  // are still open, so that styles do not leak past the cell.
  const kept = truncated.slice(0, -omission.length);

  return sliceAnsi(input, 0, calculateSliceLength(kept, Number.POSITIVE_INFINITY)) + omission;
};

export const truncateTableData = (rows: Row[], truncates: number[]): Row[] => {
  return rows.map((cells) => {
    return cells.map((cell, cellIndex) => {
      return truncateString(cell, truncates[cellIndex]);
    });
  });
};
