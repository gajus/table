import drawHorizontalContent, {
} from './drawHorizontalContent';
import type {
  DrawVerticalLine,
} from './types/api';
import type {
  BodyBorderConfig, Row,
} from './types/internal';

export default (row: Row, config: {
  border: BodyBorderConfig,
  drawVerticalLine: DrawVerticalLine,
}): string => {
  return drawHorizontalContent(row, {
    ...config,
    separator: {
      join: config.border.bodyJoin,
      left: config.border.bodyLeft,
      right: config.border.bodyRight,
    },
  });
};
