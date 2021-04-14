import {
  drawBorderTop, drawBorderJoin, drawBorderBottom,
} from './drawBorder';
import drawRow from './drawRow';
import type {
  TableConfig, Row,
} from './types/internal';

export default (
  rows: Row[],
  columnSizeIndex: number[],
  rowSpanIndex: number[],
  config: TableConfig,
): string => {
  const {
    drawHorizontalLine,
    singleLine,
  } = config;

  let output: string;
  let realRowIndex: number;
  let rowHeight: number;

  const rowCount = rows.length;

  realRowIndex = 0;

  output = '';

  if (drawHorizontalLine(realRowIndex, rowCount)) {
    output += drawBorderTop(columnSizeIndex, config);
  }

  rows.forEach((row, index0) => {
    output += drawRow(row, config);

    if (!rowHeight) {
      rowHeight = rowSpanIndex[realRowIndex];

      realRowIndex++;
    }

    rowHeight--;

    if (
      !singleLine &&
      rowHeight === 0 &&
      index0 !== rowCount - 1 &&
      drawHorizontalLine(realRowIndex, rowCount)
    ) {
      output += drawBorderJoin(columnSizeIndex, config);
    }
  });

  if (drawHorizontalLine(realRowIndex, rowCount)) {
    output += drawBorderBottom(columnSizeIndex, config);
  }

  return output;
};
