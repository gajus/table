import {
  drawBorderTop, drawBorderJoin, drawBorderBottom,
} from './drawBorder';
import drawContent from './drawContent';
import drawRow from './drawRow';
import type {
  TableConfig, Row,
} from './types/internal';

/**
 * Group the array into sub-arrays by sizes.
 *
 * @example
 * groupBySizes(['a', 'b', 'c', 'd', 'e'], [2, 1, 2]) = [ ['a', 'b'], ['c'], ['d', 'e'] ]
 */

const groupBySizes = <T>(array: T[], sizes: number[]): T[][] => {
  let startIndex = 0;

  return sizes.map((size) => {
    const group = array.slice(startIndex, startIndex + size);

    startIndex += size;

    return group;
  });
};

export default (rows: Row[], columnWidths: number[], rowHeights: number[], config: TableConfig): string => {
  const {
    drawHorizontalLine,
    singleLine,
  } = config;

  const contents = groupBySizes(rows, rowHeights).map((group) => {
    return group.map((row) => {
      return drawRow(row, config);
    }).join('');
  });

  return drawContent(contents, {
    drawSeparator: (index, size) => {
      // Top/bottom border
      if (index === 0 || index === size) {
        return drawHorizontalLine(index, size);
      }

      return !singleLine && drawHorizontalLine(index, size);
    },
    endSeparator: drawBorderBottom(columnWidths, config),
    middleSeparator: drawBorderJoin(columnWidths, config),
    startSeparator: drawBorderTop(columnWidths, config),
  });
};
