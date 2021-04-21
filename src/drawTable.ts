import {
  drawBorderTop, drawBorderJoin, drawBorderBottom,
} from './drawBorder';
import drawRow from './drawRow';
import type {
  TableConfig, Row,
} from './types/internal';

/**
 * Groups mapped rows into chunks by calculated heights
 */

const groupRows = (rows: Row[], rowHeights: number[], config: TableConfig): Row => {
  let startIndex = 0;

  return rowHeights.map((rowHeight) => {
    const chunk = rows.slice(startIndex, startIndex + rowHeight).map((row) => {
      return drawRow(row, config);
    }).join('');

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

  const groupedRows = groupRows(rows, rowHeights, config);
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
