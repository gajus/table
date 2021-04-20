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
    endSeparator: border.bodyRight,
    middleSeparator: border.bodyJoin,
    startSeparator: border.bodyLeft,
  }) + '\n';
};
