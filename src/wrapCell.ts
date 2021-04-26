import {
  splitAnsi,
} from './utils';
import {
  wrapString,
} from './wrapString';
import {
  wrapWord,
} from './wrapWord';

/**
 * Wrap a single cell value into a list of lines
 *
 * Always wraps on newlines, for the remainder uses either word or string wrapping
 * depending on user configuration.
 *
 */
export const wrapCell = (cellValue: string, cellWidth: number, useWrapWord: boolean): string[] => {
  // First split on literal newlines
  const cellLines = splitAnsi(cellValue);

  // Then iterate over the list and word-wrap every remaining line if necessary.
  for (let lineNr = 0; lineNr < cellLines.length;) {
    let lineChunks;

    if (useWrapWord) {
      lineChunks = wrapWord(cellLines[lineNr], cellWidth);
    } else {
      lineChunks = wrapString(cellLines[lineNr], cellWidth);
    }

    // Replace our original array element with whatever the wrapping returned
    cellLines.splice(lineNr, 1, ...lineChunks);
    lineNr += lineChunks.length;
  }

  return cellLines;
};
