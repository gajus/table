import {
  wrapCell,
} from './wrapCell';

/**
 * Calculates height of cell content in regard to its width and word wrapping.
 */
export const calculateCellHeight = (value: string, columnWidth: number, useWrapWord = false): number => {
  return wrapCell(value, columnWidth, useWrapWord).length;
};
