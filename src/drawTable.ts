import stringWidth from 'string-width';
import {
  createTableBorderGetter,
} from './drawBorder';
import {
  drawContent,
} from './drawContent';
import {
  drawHeader,
} from './drawHeader';
import {
  drawRow,
} from './drawRow';
import type {
  TableConfig, Row,
} from './types/internal';
import {
  groupBySizes,
} from './utils';

export const drawTable = (rows: Row[], columnWidths: number[], rowHeights: number[], config: TableConfig): string => {
  const {
    drawHorizontalLine,
    singleLine,
  } = config;

  const contents = groupBySizes(rows, rowHeights).map((group) => {
    return group.map((row) => {
      return drawRow(row, config);
    }).join('');
  });

  if (config.header) {
    // assume that topLeft/right border have width = 1
    const headerWidth = stringWidth(drawRow(rows[0], config)) - 2 -
      config.header.paddingLeft - config.header.paddingRight;
    const header = drawHeader(headerWidth, config);

    contents.unshift(header);
  }

  return drawContent(contents, {
    drawSeparator: (index, size) => {
      // Top/bottom border
      if (index === 0 || index === size) {
        return drawHorizontalLine(index, size);
      }

      return !singleLine && drawHorizontalLine(index, size);
    },
    separatorGetter: createTableBorderGetter(columnWidths, config),
  });
};
