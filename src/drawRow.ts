import {
  drawContent,
} from './drawContent';
import type {
  SpanningCellManager,
} from './spanningCellManager';
import type {
  DrawVerticalLine,
} from './types/api';
import type {
  BodyBorderConfig,
  Row,
} from './types/internal';

export type DrawRowConfig = {
  border: BodyBorderConfig,
  drawVerticalLine: DrawVerticalLine,
  spanningCellManager?: SpanningCellManager,
  rowIndex?: number,
};

export const drawRow = (row: Row, config: DrawRowConfig): string => {
  const {border, drawVerticalLine, rowIndex, spanningCellManager} = config;

  return drawContent({
    contents: row,
    drawSeparator: drawVerticalLine,
    elementType: 'cell',
    rowIndex,
    separatorGetter: (index, columnCount) => {
      if (index === 0) {
        return border.bodyLeft;
      }

      if (index === columnCount) {
        return border.bodyRight;
      }

      return border.bodyJoin;
    },
    spanningCellManager,
  }) + '\n';
};
