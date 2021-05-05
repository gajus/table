import {
  drawContent,
} from './drawContent';
import type {
  DrawVerticalLine,
} from './types/api';
import type {
  TableConfig,
  SeparatorGetter,
  TopBorderConfig,
  JoinBorderConfig,
  BottomBorderConfig,
} from './types/internal';

type Separator = {
  readonly left: string,
  readonly right: string,
  readonly body: string,
  readonly join: string,
};

const drawBorder = (columnWidths: number[],
  config: {separator: Separator, drawVerticalLine: DrawVerticalLine, }): string => {
  const {separator, drawVerticalLine} = config;
  const columns = columnWidths.map((size) => {
    return config.separator.body.repeat(size);
  });

  return drawContent(columns, {
    drawSeparator: drawVerticalLine,
    separatorGetter: (index: number, columnCount: number) => {
      if (index === 0) {
        return separator.left;
      }

      if (index === columnCount) {
        return separator.right;
      }

      return separator.join;
    },

  }) + '\n';
};

const drawBorderTop = (columnWidths: number[],
  config: {border: TopBorderConfig, drawVerticalLine: DrawVerticalLine, }): string => {
  const result = drawBorder(columnWidths, {
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

const drawBorderJoin = (columnWidths: number[],
  config: {border: JoinBorderConfig, drawVerticalLine: DrawVerticalLine, }): string => {
  return drawBorder(columnWidths, {
    ...config,
    separator: {
      body: config.border.joinBody,
      join: config.border.joinJoin,
      left: config.border.joinLeft,
      right: config.border.joinRight,
    },
  });
};

const drawBorderBottom = (columnWidths: number[],
  config: {border: BottomBorderConfig, drawVerticalLine: DrawVerticalLine, }): string => {
  return drawBorder(columnWidths, {
    ...config,
    separator: {
      body: config.border.bottomBody,
      join: config.border.bottomJoin,
      left: config.border.bottomLeft,
      right: config.border.bottomRight,
    },
  });
};

export const createTableBorderGetter = (columnWidths: number[], config: TableConfig): SeparatorGetter => {
  return (index: number, size: number) => {
    if (!config.header) {
      if (index === 0) {
        return drawBorderTop(columnWidths, config);
      }

      if (index === size) {
        return drawBorderBottom(columnWidths, config);
      }

      return drawBorderJoin(columnWidths, config);
    }

    // Deal with the header
    if (index === 0) {
      return drawBorderTop(columnWidths, {
        ...config,
        border: {
          ...config.border,
          topJoin: config.border.topBody,
        },
      });
    }

    if (index === 1) {
      return drawBorderJoin(columnWidths, {
        ...config,
        border: {
          ...config.border,
          joinJoin: config.border.headerJoin,
        },
      });
    }

    if (index === size) {
      return drawBorderBottom(columnWidths, config);
    }

    return drawBorderJoin(columnWidths, config);
  };
};

export {
  drawBorder,
  drawBorderBottom,
  drawBorderJoin,
  drawBorderTop,
};
