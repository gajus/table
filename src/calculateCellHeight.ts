import wrapCell from './wrapCell';

export default (value: string, columnWidth: number, useWrapWord = false): number => {
  if (typeof value !== 'string') {
    throw new TypeError('Value must be a string.');
  }

  return wrapCell(value, columnWidth, useWrapWord).length;
};
