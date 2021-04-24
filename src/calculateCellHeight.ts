import wrapCell from './wrapCell';

export default (value: string, columnWidth: number, useWrapWord = false): number => {
  return wrapCell(value, columnWidth, useWrapWord).length;
};
