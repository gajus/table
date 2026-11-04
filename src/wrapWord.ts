import slice from 'slice-ansi';
import stripAnsi from 'strip-ansi';
import type {
  Grapheme,
} from './types/internal';
import {
  splitGraphemes,
} from './utils';

/**
 * Number of characters standing in for a grapheme in the wrapping expression: one per terminal column,
 * and at least one.
 */
const countColumns = (grapheme: Grapheme): number => {
  return Math.max(grapheme.width, 1);
};

/**
 * Finds the line boundaries by matching the wrapping expression against one character per terminal
 * column, and reports each line length and the whitespace that follows it in slice-ansi positions.
 */
const calculateStringLengths = (input: string, size: number): Array<[Length:number, Offset: number]> => {
  const graphemes = splitGraphemes(stripAnsi(input));
  const width = Math.max(size, 1);

  // https://regex101.com/r/gY5kZ1/1
  const re = new RegExp('(^.{1,' + String(width) + '}(\\s+|$))|(^.{1,' + String(Math.max(size - 1, 1)) + '}(\\\\|/|_|\\.|,|;|-))');

  // A single code unit stands for itself, so that whitespace, line terminators and break characters keep
  // their meaning in the wrapping expression; anything else becomes placeholder columns.
  let subject = graphemes.map((grapheme) => {
    return (grapheme.value.length === 1 ? grapheme.value : 'x').repeat(countColumns(grapheme));
  }).join('');
  let index = 0;

  const consumePositions = (columns: number): number => {
    let positions = 0;
    let remainingColumns = columns;

    while (remainingColumns > 0 && index < graphemes.length) {
      remainingColumns -= countColumns(graphemes[index]);
      positions += graphemes[index].positions;
      index += 1;
    }

    return positions;
  };

  const chunks: Array<[number, number]> = [];

  do {
    const match = re.exec(subject);

    let lineColumns: number;
    let chunkColumns: number;

    if (match) {
      chunkColumns = match[0].length;
      lineColumns = match[0].trimEnd().length;
    } else {
      // No break opportunity within reach: cut after as many whole graphemes as fit, but always take
      // at least one so that wrapping makes progress.
      lineColumns = index < graphemes.length ? countColumns(graphemes[index]) : 0;

      for (let next = index + 1; next < graphemes.length && lineColumns + countColumns(graphemes[next]) <= width; next += 1) {
        lineColumns += countColumns(graphemes[next]);
      }

      chunkColumns = lineColumns;
    }

    chunks.push([consumePositions(lineColumns), consumePositions(chunkColumns - lineColumns)]);

    subject = subject.slice(chunkColumns);
  } while (subject.length);

  return chunks;
};

export const wrapWord = (input: string, size: number): string[] => {
  const result: string[] = [];

  let startIndex = 0;
  calculateStringLengths(input, size).forEach(([length, offset]) => {
    result.push(slice(input, startIndex, startIndex + length));

    startIndex += length + offset;
  });

  return result;
};
