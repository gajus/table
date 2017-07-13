import {isString, isInteger, ceil} from 'lodash';
import stringWidth from 'string-width';
import wrapWord from './wrapWord';

/**
 * @param {string} value
 * @param {number} columnWidth
 * @param {boolean} useWrapWord
 * @returns {number}
 */
export default (value, columnWidth, useWrapWord = false) => {
  if (!isString(value)) {
    throw new Error('Value must be a string.');
  }

  if (!isInteger(columnWidth)) {
    throw new Error('Column width must be an integer.');
  }

  if (columnWidth < 1) {
    throw new Error('Column width must be greater than 0.');
  }

  if (useWrapWord) {
    return wrapWord(value, columnWidth).length;
  }

  return ceil(stringWidth(value) / columnWidth);
};
