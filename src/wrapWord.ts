import slice from 'slice-ansi';
import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';

type Grapheme = {

  /**
   * Stand-in for the grapheme with one character per terminal column it occupies.
   */
  readonly columns: string,

  /**
   * Number of positions slice-ansi advances over the grapheme.
   */
  readonly positions: number,
};

/**
 * A user-perceived character: a code point together with the combining marks, variation selectors,
 * emoji modifiers and tag characters attached to it, including zero-width joiner emoji sequences;
 * or a pair of regional indicators, which is rendered as a flag.
 */
const graphemeRegex = /\p{Regional_Indicator}{2}|[\s\S][\p{M}\p{Emoji_Modifier}\u{E0020}-\u{E007F}]*(?:\u200D[\s\S][\p{M}\p{Emoji_Modifier}\u{E0020}-\u{E007F}]*)*/gu;

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

const printableAsciiRegex = /^[\u0020-\u007E]+$/u;

const splitGraphemes = (subject: string): Grapheme[] => {
  // Printable ASCII, the most common content, is one column and one slice-ansi position per character.
  if (printableAsciiRegex.test(subject)) {
    return Array.from(subject, (character) => {
      return {
        columns: character,
        positions: 1,
      };
    });
  }

  const cache = new Map<string, Grapheme>();

  return (subject.match(graphemeRegex) ?? []).map((grapheme) => {
    let cached = cache.get(grapheme);

    if (!cached) {
      cached = {
        // A single code unit stands for itself, so that whitespace, line terminators and break
        // characters keep their meaning in the wrapping expression; it is repeated when it is wide.
        columns: (grapheme.length === 1 ? grapheme : 'x').repeat(Math.max(stringWidth(grapheme), 1)),
        positions: countSlicePositions(grapheme),
      };

      cache.set(grapheme, cached);
    }

    return cached;
  });
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

  let subject = graphemes.map(({columns}) => {
    return columns;
  }).join('');
  let index = 0;

  const consumePositions = (columns: number): number => {
    let positions = 0;
    let remainingColumns = columns;

    while (remainingColumns > 0 && index < graphemes.length) {
      remainingColumns -= graphemes[index].columns.length;
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
      lineColumns = graphemes[index]?.columns.length ?? 0;

      for (let next = index + 1; next < graphemes.length && lineColumns + graphemes[next].columns.length <= width; next += 1) {
        lineColumns += graphemes[next].columns.length;
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
