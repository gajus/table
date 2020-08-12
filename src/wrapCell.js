import wrapString from './wrapString';
import wrapWord from './wrapWord';

/**
 * Wrap a single cell value into a list of lines
 *
 * Always wraps on newlines, for the remainder uses either word or string wrapping
 * depending on user configuration.
 *
 * @param {string} cellValue
 * @param {number} columnWidth
 * @param {boolean} useWrapWord
 * @param {boolean} disableWrap
 * @returns {Array}
 */
export default (cellValue, columnWidth, useWrapWord, disableWrap) => {
  // First split on literal newlines
  const cellLines = cellValue.split('\n');

  // early exit if wrapping of words is disabled
  if (disableWrap) {
    return cellLines;
  }

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
