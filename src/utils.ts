import slice from 'slice-ansi';
import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';
import {
  getBorderCharacters,
} from './getBorderCharacters';
import type {
  BorderConfig,
  BorderUserConfig,
  SpanningCellConfig,
} from './types/api';
import type {
  BaseConfig,
  CellCoordinates,
  Grapheme,
  RangeCoordinate,
} from './types/internal';

/**
 * A user-perceived character: a code point together with the combining marks, variation selectors,
 * emoji modifiers and tag characters attached to it, including zero-width joiner emoji sequences;
 * or a pair of regional indicators, which is rendered as a flag.
 */
const graphemeRegex = /\p{Regional_Indicator}{2}|[\s\S][\p{M}\p{Emoji_Modifier}\u{E0020}-\u{E007F}]*(?:\u200D[\s\S][\p{M}\p{Emoji_Modifier}\u{E0020}-\u{E007F}]*)*/gu;

const printableAsciiRegex = /^[\u0020-\u007E]+$/u;

/**
 * slice-ansi positions are not terminal columns: it advances one position per code point and two for
 * full-width BMP characters, but only one for astral characters such as emoji. Asking slice-ansi
 * directly keeps the computed boundaries aligned with how it slices.
 */
const countSlicePositions = (grapheme: string): number => {
  let positions = 0;

  for (const codePoint of grapheme) {
    positions += slice(codePoint, 0, 1) === '' ? 2 : 1;
  }

  return positions;
};

const graphemeCache = new Map<string, Grapheme>();

/**
 * Measures a grapheme in terminal columns and in slice-ansi positions. Measurements are cached, and the
 * cache is emptied whenever it grows large so that its memory use stays bounded.
 */
const measureGrapheme = (value: string): Grapheme => {
  let grapheme = graphemeCache.get(value);

  if (!grapheme) {
    if (graphemeCache.size >= 10_000) {
      graphemeCache.clear();
    }

    grapheme = {
      positions: countSlicePositions(value),
      value,
      width: stringWidth(value),
    };

    graphemeCache.set(value, grapheme);
  }

  return grapheme;
};

/**
 * Splits a string without ANSI escape codes into graphemes, measured in terminal columns and in
 * slice-ansi positions.
 *
 * @internal
 */
export const splitGraphemes = (subject: string): Grapheme[] => {
  // Printable ASCII, the most common content, is one column and one slice-ansi position per character.
  if (printableAsciiRegex.test(subject)) {
    return Array.from(subject, (value) => {
      return {
        positions: 1,
        value,
        width: 1,
      };
    });
  }

  return (subject.match(graphemeRegex) ?? []).map(measureGrapheme);
};

/**
 * Calculates the slice-ansi length of the longest run of whole graphemes at the start of a string
 * without ANSI escape codes that fits within the given width. At least one grapheme is included, so
 * that callers always make progress.
 *
 * @internal
 */
export const calculateSliceLength = (subject: string, maximumWidth: number): number => {
  // Printable ASCII is one column and one position per character. The character after the cut is
  // checked as well, so that a combining mark or modifier is never separated from the one before it.
  if (maximumWidth >= 1 && printableAsciiRegex.test(subject.slice(0, maximumWidth + 1))) {
    return Math.min(subject.length, maximumWidth);
  }

  // A copy, so that this loop has its own lastIndex.
  const regex = new RegExp(graphemeRegex);

  let width = 0;
  let positions = 0;

  for (let match = regex.exec(subject); match; match = regex.exec(subject)) {
    const grapheme = measureGrapheme(match[0]);

    if (positions > 0 && width + grapheme.width > maximumWidth) {
      break;
    }

    width += grapheme.width;
    positions += grapheme.positions;
  }

  return positions;
};

/**
 * Converts Windows-style newline to Unix-style
 *
 * @internal
 */
export const normalizeString = (input: string): string => {
  return input.replace(/\r\n/g, '\n');
};

/**
 * Splits ansi string by newlines
 *
 * @internal
 */
export const splitAnsi = (input: string): string[] => {
  // Line lengths in slice-ansi positions, which differ from display widths for emoji.
  const lengths = stripAnsi(input).split('\n').map((line) => {
    return calculateSliceLength(line, Number.POSITIVE_INFINITY);
  });

  const result: string[] = [];
  let startIndex = 0;

  lengths.forEach((length) => {
    result.push(length === 0 ? '' : slice(input, startIndex, startIndex + length));

    // Plus 1 for the newline character itself
    startIndex += length + 1;
  });

  return result;
};

/**
 * Merges user provided border characters with the default border ("honeywell") characters.
 *
 * @internal
 */
export const makeBorderConfig = (border: BorderUserConfig | undefined): BorderConfig => {
  return {
    ...getBorderCharacters('honeywell'),
    ...border,
  };
};

/**
 * Groups the array into sub-arrays by sizes.
 *
 * @internal
 * @example
 * groupBySizes(['a', 'b', 'c', 'd', 'e'], [2, 1, 2]) = [ ['a', 'b'], ['c'], ['d', 'e'] ]
 */

export const groupBySizes = <T>(array: T[], sizes: number[]): T[][] => {
  let startIndex = 0;

  return sizes.map((size) => {
    const group = array.slice(startIndex, startIndex + size);

    startIndex += size;

    return group;
  });
};

/**
 * Counts the number of continuous spaces in a string
 *
 * @internal
 * @example
 * countGroupSpaces('a  bc  de f') = 3
 */
export const countSpaceSequence = (input: string): number => {
  return input.match(/\s+/g)?.length ?? 0;
};

/**
 * Creates the non-increasing number array given sum and length
 * whose the difference between maximum and minimum is not greater than 1
 *
 * @internal
 * @example
 * distributeUnevenly(6, 3) = [2, 2, 2]
 * distributeUnevenly(8, 3) = [3, 3, 2]
 */
export const distributeUnevenly = (sum: number, length: number): number[] => {
  const result = Array.from<number>({length}).fill(Math.floor(sum / length));

  return result.map((element, index) => {
    return element + (index < sum % length ? 1 : 0);
  });
};

export const sequence = (start: number, end: number): number[] => {
  return Array.from({length: end - start + 1}, (_, index) => {
    return index + start;
  });
};

export const sumArray = (array: number[]): number => {
  return array.reduce((accumulator, element) => {
    return accumulator + element;
  }, 0);
};

export const extractTruncates = (config: BaseConfig): number[] => {
  return config.columns.map(({truncate}) => {
    return truncate;
  });
};

export const flatten = <T>(array: T[][]): T[] => {
  const destination = [];
  const arrayLength = array.length;
  for (let index = 0; index < arrayLength; index++) {
    destination.push(...array[index]);
  }

  return destination;
};

export const calculateRangeCoordinate = (spanningCellConfig: SpanningCellConfig): RangeCoordinate => {
  const {row, col, colSpan = 1, rowSpan = 1} = spanningCellConfig;

  return {bottomRight: {col: col + colSpan - 1,
    row: row + rowSpan - 1},
  topLeft: {col,
    row}};
};

export const areCellEqual = (cell1: CellCoordinates, cell2: CellCoordinates): boolean => {
  return cell1.row === cell2.row && cell1.col === cell2.col;
};

export const isCellInRange = (cell: CellCoordinates, {topLeft, bottomRight}: RangeCoordinate): boolean => {
  return (
    topLeft.row <= cell.row &&
    cell.row <= bottomRight.row &&
    topLeft.col <= cell.col &&
    cell.col <= bottomRight.col
  );
};
