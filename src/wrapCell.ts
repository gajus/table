import slice from 'slice-ansi';
import stripAnsi from 'strip-ansi';
import wrapString from './wrapString';
import wrapWord from './wrapWord';

const splitAnsi = (input: string) => {
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
 * Wrap a single cell value into a list of lines
 *
 * Always wraps on newlines, for the remainder uses either word or string wrapping
 * depending on user configuration.
 *
 */
export default (cellValue: string, columnWidth: number, useWrapWord: boolean): string[] => {
  // First split on literal newlines
  const cellLines = splitAnsi(cellValue);

  // Then iterate over the list and word-wrap every remaining line if necessary.
  for (let lineNr = 0; lineNr < cellLines.length;) {
    let lineChunks;

    if (useWrapWord) {
      lineChunks = wrapWord(cellLines[lineNr], columnWidth);
    } else {
      lineChunks = wrapString(cellLines[lineNr], columnWidth);
    }

    // Replace our original array element with whatever the wrapping returned
    cellLines.splice(lineNr, 1, ...lineChunks);
    lineNr += lineChunks.length;
  }

  return cellLines;
};
