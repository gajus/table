import {
  createTableBorderGetter,
} from './drawBorder';
import {
  drawContent,
} from './drawContent';
import {
  drawRow,
} from './drawRow';
import type {
  TableConfig, Row,
} from './types/internal';
import {
  groupBySizes,
} from './utils';

export const drawTable = (rows: Row[], outputColumnWidths: number[], rowHeights: number[], config: TableConfig): string => {
  const {
    drawHorizontalLine,
    singleLine,
  } = config;

  const contents = groupBySizes(rows, rowHeights).map((group, groupIndex) => {
    return group.map((row) => {
      return drawRow(row, {...config,
        rowIndex: groupIndex});
    }).join('');
  });

  return drawContent({contents,
    drawSeparator: (index, size) => {
      // Top/bottom border
      if (index === 0 || index === size) {
        return drawHorizontalLine(index, size);
      }

      return !singleLine && drawHorizontalLine(index, size);
    },
    elementType: 'row',
    rowIndex: -1,
    separatorGetter: createTableBorderGetter(outputColumnWidths, {...config,
      rowCount: contents.length}),
    spanningCellManager: config.spanningCellManager});
};
