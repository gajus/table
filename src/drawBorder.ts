import {
  drawContent,
} from './drawContent';
import type {
  SpanningCellManager,
} from './spanningCellManager';
import type {
  BorderConfig,
  DrawVerticalLine,
} from './types/api';
import type {
  CellCoordinates,
  SeparatorGetter,
} from './types/internal';

type Separator = {
  readonly left: string,
  readonly right: string,
  readonly body: string,
  readonly bodyJoinOuter?: string,
  readonly bodyJoinInner?: string,
  readonly join: string,
  readonly joinUp?: string,
  readonly joinDown?: string,
  readonly joinLeft?: string,
  readonly joinRight?: string,
};

export const drawBorderSegments = (columnWidths: number[], parameters: Parameters<typeof drawBorder>[1]): string[] => {
  const {separator, horizontalBorderIndex, spanningCellManager} = parameters;

  return columnWidths.map((columnWidth, columnIndex) => {
    const normalSegment = separator.body.repeat(columnWidth);
    if (horizontalBorderIndex === undefined) {
      return normalSegment;
    }

    /* istanbul ignore next */
    const range = spanningCellManager?.getContainingRange({col: columnIndex,
      row: horizontalBorderIndex});
    if (!range) {
      return normalSegment;
    }
    const {topLeft} = range;

    // draw border segments as usual for top border of spanning cell
    if (horizontalBorderIndex === topLeft.row) {
      return normalSegment;
    }

    // if for first column/row of spanning cell, just skip
    if (columnIndex !== topLeft.col) {
      return '';
    }

    return range.extractBorderContent(horizontalBorderIndex);
  });
};

export const createSeparatorGetter = (dependencies: Parameters<typeof drawBorder>[1]): (verticalBorderIndex: number, columnCount: number) => string => {
  const {separator, spanningCellManager, horizontalBorderIndex, rowCount} = dependencies;

  // eslint-disable-next-line complexity
  return (verticalBorderIndex, columnCount) => {
    const inSameRange = spanningCellManager?.inSameRange;
    if (horizontalBorderIndex !== undefined && inSameRange) {
      const topCell: CellCoordinates = {col: verticalBorderIndex,
        row: horizontalBorderIndex - 1};
      const leftCell: CellCoordinates = {col: verticalBorderIndex - 1,
        row: horizontalBorderIndex};
      const oppositeCell: CellCoordinates = {col: verticalBorderIndex - 1,
        row: horizontalBorderIndex - 1};
      const currentCell: CellCoordinates = {col: verticalBorderIndex,
        row: horizontalBorderIndex};

      const pairs: Array<[CellCoordinates, CellCoordinates]> = [
        [oppositeCell, topCell],
        [topCell, currentCell],
        [currentCell, leftCell],
        [leftCell, oppositeCell],
      ];

      // left side of horizontal border
      if (verticalBorderIndex === 0) {
        if (inSameRange(currentCell, topCell) && separator.bodyJoinOuter) {
          return separator.bodyJoinOuter;
        }

        return separator.left;
      }

      // right side of horizontal border
      if (verticalBorderIndex === columnCount) {
        if (inSameRange(oppositeCell, leftCell) && separator.bodyJoinOuter) {
          return separator.bodyJoinOuter;
        }

        return separator.right;
      }

      // top horizontal border
      if (horizontalBorderIndex === 0) {
        if (inSameRange(currentCell, leftCell)) {
          return separator.body;
        }

        return separator.join;
      }

      // bottom horizontal border
      if (horizontalBorderIndex === rowCount) {
        if (inSameRange(topCell, oppositeCell)) {
          return separator.body;
        }

        return separator.join;
      }

      const sameRangeCount = pairs.map((pair) => {
        return inSameRange(...pair);
      }).filter(Boolean).length;

      // four cells are belongs to different spanning cells
      if (sameRangeCount === 0) {
        return separator.join;
      }

      // belong to one spanning cell
      if (sameRangeCount === 4) {
        return '';
      }

      // belongs to two spanning cell
      if (sameRangeCount === 2) {
        if (inSameRange(...pairs[1]) && inSameRange(...pairs[3]) && separator.bodyJoinInner) {
          return separator.bodyJoinInner;
        }

        return separator.body;
      }

      /* istanbul ignore next */
      if (sameRangeCount === 1) {
        if (!separator.joinRight || !separator.joinLeft || !separator.joinUp || !separator.joinDown) {
          throw new Error(`Can not get border separator for position [${horizontalBorderIndex}, ${verticalBorderIndex}]`);
        }

        if (inSameRange(...pairs[0])) {
          return separator.joinDown;
        }
        if (inSameRange(...pairs[1])) {
          return separator.joinLeft;
        }
        if (inSameRange(...pairs[2])) {
          return separator.joinUp;
        }

        return separator.joinRight;
      }

      /* istanbul ignore next */
      throw new Error('Invalid case');
    }

    if (verticalBorderIndex === 0) {
      return separator.left;
    }

    if (verticalBorderIndex === columnCount) {
      return separator.right;
    }

    return separator.join;
  };
};

export const drawBorder = (columnWidths: number[], parameters: Omit<DrawBorderParameters, 'border'> & {separator: Separator, }): string => {
  const borderSegments = drawBorderSegments(columnWidths, parameters);

  const {drawVerticalLine, horizontalBorderIndex, spanningCellManager} = parameters;

  return drawContent({
    contents: borderSegments,
    drawSeparator: drawVerticalLine,
    elementType: 'border',
    rowIndex: horizontalBorderIndex,
    separatorGetter: createSeparatorGetter(parameters),
    spanningCellManager,
  }) + '\n';
};

export const drawBorderTop = (columnWidths: number[], parameters: DrawBorderParameters): string => {
  const {border} = parameters;
  const result = drawBorder(columnWidths, {
    ...parameters,
    separator: {
      body: border.topBody,
      join: border.topJoin,
      left: border.topLeft,
      right: border.topRight,
    },
  });

  if (result === '\n') {
    return '';
  }

  return result;
};

export const drawBorderJoin = (columnWidths: number[], parameters: DrawBorderParameters): string => {
  const {border} = parameters;

  return drawBorder(columnWidths, {
    ...parameters,
    separator: {
      body: border.joinBody,
      bodyJoinInner: border.bodyJoin,
      bodyJoinOuter: border.bodyLeft,
      join: border.joinJoin,
      joinDown: border.joinMiddleDown,
      joinLeft: border.joinMiddleLeft,
      joinRight: border.joinMiddleRight,
      joinUp: border.joinMiddleUp,
      left: border.joinLeft,
      right: border.joinRight,
    },
  });
};

export const drawBorderBottom = (columnWidths: number[], parameters: DrawBorderParameters): string => {
  const {border} = parameters;

  return drawBorder(columnWidths, {
    ...parameters,
    separator: {
      body: border.bottomBody,
      join: border.bottomJoin,
      left: border.bottomLeft,
      right: border.bottomRight,
    },
  });
};

export type BorderGetterParameters = {
  border: BorderConfig,
  drawVerticalLine: DrawVerticalLine,
  spanningCellManager?: SpanningCellManager,
  rowCount?: number,
};

export type DrawBorderParameters = Omit<BorderGetterParameters, 'outputColumnWidths'> & {
  horizontalBorderIndex?: number,
};

export const createTableBorderGetter = (columnWidths: number[], parameters: BorderGetterParameters): SeparatorGetter => {
  return (index: number, size: number) => {
    const drawBorderParameters: DrawBorderParameters = {...parameters,
      horizontalBorderIndex: index};

    if (index === 0) {
      return drawBorderTop(columnWidths, drawBorderParameters);
    } else if (index === size) {
      return drawBorderBottom(columnWidths, drawBorderParameters);
    }

    return drawBorderJoin(columnWidths, drawBorderParameters);
  };
};

