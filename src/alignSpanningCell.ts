import {
  alignString,
} from './alignString';
import {
  padCellVertically,
} from './mapDataUsingRowHeights';
import {
  padString,
} from './padTableData';
import type {
  SpanningCellContext,
} from './spanningCellManager';
import {
  truncateString,
} from './truncateTableData';
import type {
  RangeConfig,
} from './types/internal';
import {
  sequence, sumArray,
} from './utils';
import {
  wrapCell,
} from './wrapCell';

/**
 * Fill content into all cells in range in order to calculate total height
 */
export const wrapRangeContent = (rangeConfig: RangeConfig, rangeWidth: number, context: SpanningCellContext): string[] => {
  const {topLeft, paddingRight, paddingLeft, truncate, wrapWord, alignment} = rangeConfig;

  const originalContent = context.rows[topLeft.row][topLeft.col];
  const contentWidth = rangeWidth - paddingLeft - paddingRight;

  return wrapCell(truncateString(originalContent, truncate), contentWidth, wrapWord).map((line) => {
    const alignedLine = alignString(line, contentWidth, alignment);

    return padString(alignedLine, paddingLeft, paddingRight);
  });
};

export const alignVerticalRangeContent = (range: RangeConfig, content: string[], context: SpanningCellContext) => {
  const {rows, drawHorizontalLine, rowHeights} = context;
  const {topLeft, bottomRight, verticalAlignment} = range;

  // They are empty before calculateRowHeights function run
  if (rowHeights.length === 0) {
    return [];
  }

  const totalCellHeight = sumArray(rowHeights.slice(topLeft.row, bottomRight.row + 1));
  const totalBorderHeight = bottomRight.row - topLeft.row;
  const hiddenHorizontalBorderCount = sequence(topLeft.row + 1, bottomRight.row).filter((horizontalBorderIndex) => {
    return !drawHorizontalLine(horizontalBorderIndex, rows.length);
  }).length;

  const availableRangeHeight = totalCellHeight + totalBorderHeight - hiddenHorizontalBorderCount;

  return padCellVertically(content, availableRangeHeight, verticalAlignment).map((line) => {
    if (line.length === 0) {
      return ' '.repeat(content[0].length);
    }

    return line;
  });
};
