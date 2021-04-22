import {
  drawBorderTop, drawBorderJoin, drawBorderBottom,
} from './drawBorder';
import drawRow from './drawRow';
import type {
  TableConfig, Row,
} from './types/internal';

/**
 * Group the array into sub-arrays by sizes.
 *
 * @example
 * chunkBySizes(['a', 'b', 'c', 'd', 'e'], [2, 1, 2]) = [ ['a', 'b'], ['c'], ['d', 'e'] ]
 */

const groupBySizes = <T>(array: T[], sizes: number[]): T[][] => {
  if (sizes.reduce((sum, current) => {
    return sum + current;
  }, 0) !== array.length) {
    throw new Error('The sizes array is not compatible with array\'s length');
  }

  let startIndex = 0;

  return sizes.map((rowHeight) => {
    const chunk = array.slice(startIndex, startIndex + rowHeight);

    startIndex += rowHeight;

    return chunk;
  });
};

const shouldDrawBorderJoin = (rowIndex: number, rowCount: number, config: TableConfig): boolean => {
  const {singleLine, drawHorizontalLine} = config;

  return !singleLine && rowIndex + 1 < rowCount && drawHorizontalLine(rowIndex + 1, rowCount);
};

export default (rows: Row[], columnWidths: number[], rowHeights: number[], config: TableConfig): string => {
  const {
    drawHorizontalLine,
  } = config;

  const groupedRows = groupBySizes(rows, rowHeights).map((group) => {
    return group.map((row) => {
      return drawRow(row, config);
    }).join('');
  });

  const rowCount = groupedRows.length;
  let output = '';

  if (drawHorizontalLine(0, rowCount)) {
    output += drawBorderTop(columnWidths, config);
  }

  groupedRows.forEach((row, rowIndex) => {
    output += row;

    if (shouldDrawBorderJoin(rowIndex, rowCount, config)) {
      output += drawBorderJoin(columnWidths, config);
    }
  });

  if (drawHorizontalLine(rowCount, rowCount)) {
    output += drawBorderBottom(columnWidths, config);
  }

  return output;
};
