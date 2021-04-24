import drawContent from './drawContent';
import type {
  DrawVerticalLine,
} from './types/api';
import type {
  BottomBorderConfig,
  JoinBorderConfig,
  TopBorderConfig,
} from './types/internal';

type Separator = {
  readonly left: string,
  readonly right: string,
  readonly body: string,
  readonly join: string,
};

const drawBorder = (columnSizeIndex: number[],
  config: {separator: Separator, drawVerticalLine: DrawVerticalLine, }): string => {
  const {separator, drawVerticalLine} = config;
  const columns = columnSizeIndex.map((size) => {
    return config.separator.body.repeat(size);
  });

  return drawContent(columns, {
    drawSeparator: drawVerticalLine,
    endSeparator: separator.right,
    middleSeparator: separator.join,
    startSeparator: separator.left,
  }) + '\n';
};

const drawBorderTop = (columnSizeIndex: number[],
  config: {border: TopBorderConfig, drawVerticalLine: DrawVerticalLine, }): string => {
  const result = drawBorder(columnSizeIndex, {
    ...config,
    separator: {
      body: config.border.topBody,
      join: config.border.topJoin,
      left: config.border.topLeft,
      right: config.border.topRight,
    },
  });

  if (result === '\n') {
    return '';
  }

  return result;
};

const drawBorderJoin = (columnSizeIndex: number[],
  config: {border: JoinBorderConfig, drawVerticalLine: DrawVerticalLine, }): string => {
  return drawBorder(columnSizeIndex, {
    ...config,
    separator: {
      body: config.border.joinBody,
      join: config.border.joinJoin,
      left: config.border.joinLeft,
      right: config.border.joinRight,
    },
  });
};

const drawBorderBottom = (columnSizeIndex: number[],
  config: {border: BottomBorderConfig, drawVerticalLine: DrawVerticalLine, }): string => {
  return drawBorder(columnSizeIndex, {
    ...config,
    separator: {
      body: config.border.bottomBody,
      join: config.border.bottomJoin,
      left: config.border.bottomLeft,
      right: config.border.bottomRight,
    },
  });
};

export {
  drawBorder,
  drawBorderBottom,
  drawBorderJoin,
  drawBorderTop,
};
