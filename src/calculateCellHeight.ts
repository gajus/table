import isString from 'is-string';
import wrapCell from './wrapCell';

export default (value: string, columnWidth: number, useWrapWord = false): number => {
  if (!isString(value)) {
    throw new TypeError('Value must be a string.');
  }

  if (!Number.isInteger(columnWidth) || columnWidth < 1) {
    throw new TypeError('Column width must be an integer greater than 0.');
  }

  return wrapCell(value, columnWidth, useWrapWord).length;
};
