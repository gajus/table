import slice from 'slice-ansi';
import stripAnsi from 'strip-ansi';
import getBorderCharacters from './getBorderCharacters';
import type {
  BorderConfig, BorderUserConfig,
} from './types/api';

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
  const lengths = stripAnsi(input).split('\n').map(({length}) => {
    return length;
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
export const makeBorder = (border: BorderUserConfig | undefined): BorderConfig => {
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
