import {
  drawContent,
} from './drawContent';
import type {
  DrawVerticalLine,
} from './types/api';
import type {
  BodyBorderConfig, Row,
} from './types/internal';

export const drawRow = (row: Row, config: {
  border: BodyBorderConfig,
  drawVerticalLine: DrawVerticalLine,
}): string => {
  const {border, drawVerticalLine} = config;

  return drawContent(row, {
    drawSeparator: drawVerticalLine,
    separatorGetter: (index, columnCount) => {
      if (index === 0) {
        return border.bodyLeft;
      }

      if (index === columnCount) {
        return border.bodyRight;
      }

      return border.bodyJoin;
    },
  }) + '\n';
};
