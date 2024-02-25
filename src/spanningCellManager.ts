import {
  wrapRangeContent, alignVerticalRangeContent,
} from './alignSpanningCell';
import {
  calculateSpanningCellWidth,
} from './calculateSpanningCellWidth';
import {
  makeRangeConfig,
} from './makeRangeConfig';
import type {
  DrawHorizontalLine,
  DrawVerticalLine,
  SpanningCellConfig,
} from './types/api';
import type {
  CellCoordinates,
  ColumnConfig,
  RangeConfig,
  ResolvedRangeConfig,
  Row,
} from './types/internal';
import {
  areCellEqual,
  flatten,
  isCellInRange, sequence, sumArray,
} from './utils';

export type SpanningCellManager = {
  getContainingRange: (cell: CellCoordinates, options?: {mapped: true, }) => ResolvedRangeConfig | undefined,
  inSameRange: (cell1: CellCoordinates, cell2: CellCoordinates) => boolean,
  rowHeights: number[],
  setRowHeights: (rowHeights: number[]) => void,
  rowIndexMapping: number[],
  setRowIndexMapping: (mappedRowHeights: number[]) => void,
};

export type SpanningCellParameters = {
  spanningCellConfigs: SpanningCellConfig[],
  rows: Row[],
  columnsConfig: ColumnConfig[],
  drawVerticalLine: DrawVerticalLine,
  drawHorizontalLine: DrawHorizontalLine,
};

export type SpanningCellContext = SpanningCellParameters & {
  rowHeights: number[],
};

const findRangeConfig = (cell: CellCoordinates, rangeConfigs: RangeConfig[]): RangeConfig | undefined => {
  return rangeConfigs.find((rangeCoordinate) => {
    return isCellInRange(cell, rangeCoordinate);
  });
};

const getContainingRange = (rangeConfig: RangeConfig, context: SpanningCellContext): ResolvedRangeConfig | undefined => {
  const width = calculateSpanningCellWidth(rangeConfig, context);

  const wrappedContent = wrapRangeContent(rangeConfig, width, context);

  const alignedContent = alignVerticalRangeContent(rangeConfig, wrappedContent, context);

  const getCellContent = (rowIndex: number) => {
    const {topLeft} = rangeConfig;
    const {drawHorizontalLine, rowHeights} = context;

    const totalWithinHorizontalBorderHeight = rowIndex - topLeft.row;
    const totalHiddenHorizontalBorderHeight = sequence(topLeft.row + 1, rowIndex).filter((index) => {
      /* istanbul ignore next */
      return !drawHorizontalLine?.(index, rowHeights.length);
    }).length;

    const offset = sumArray(rowHeights.slice(topLeft.row, rowIndex)) + totalWithinHorizontalBorderHeight - totalHiddenHorizontalBorderHeight;

    return alignedContent.slice(offset, offset + rowHeights[rowIndex]);
  };

  const getBorderContent = (borderIndex: number) => {
    const {topLeft} = rangeConfig;
    const offset = sumArray(context.rowHeights.slice(topLeft.row, borderIndex)) + (borderIndex - topLeft.row - 1);

    return alignedContent[offset];
  };

  return {
    ...rangeConfig,
    extractBorderContent: getBorderContent,
    extractCellContent: getCellContent,
    height: wrappedContent.length,
    width,
  };
};

const inSameRange = (cell1: CellCoordinates, cell2: CellCoordinates, ranges: RangeConfig[]): boolean => {
  const range1 = findRangeConfig(cell1, ranges);
  const range2 = findRangeConfig(cell2, ranges);

  if (range1 && range2) {
    return areCellEqual(range1.topLeft, range2.topLeft);
  }

  return false;
};

const hashRange = (range: RangeConfig): string => {
  const {row, col} = range.topLeft;

  return `${row}/${col}`;
};

export const createSpanningCellManager = (parameters: SpanningCellParameters): SpanningCellManager => {
  const {spanningCellConfigs, columnsConfig} = parameters;
  const ranges = spanningCellConfigs.map((config) => {
    return makeRangeConfig(config, columnsConfig);
  });

  const rangeCache: Record<string, ResolvedRangeConfig | undefined> = {};

  let rowHeights: number[] = [];
  let rowIndexMapping: number[] = [];

  return {getContainingRange: (cell, options) => {
    const originalRow = options?.mapped ? rowIndexMapping[cell.row] : cell.row;

    const range = findRangeConfig({...cell,
      row: originalRow}, ranges);
    if (!range) {
      return undefined;
    }

    if (rowHeights.length === 0) {
      return getContainingRange(range, {...parameters,
        rowHeights});
    }

    const hash = hashRange(range);
    rangeCache[hash] ??= getContainingRange(range, {...parameters,
      rowHeights});

    return rangeCache[hash];
  },
  inSameRange: (cell1, cell2) => {
    return inSameRange(cell1, cell2, ranges);
  },
  rowHeights,
  rowIndexMapping,
  setRowHeights: (_rowHeights: number[]) => {
    rowHeights = _rowHeights;
  },
  setRowIndexMapping: (mappedRowHeights: number[]) => {
    rowIndexMapping = flatten(mappedRowHeights.map((height, index) => {
      return Array.from({length: height}, () => {
        return index;
      });
    }));
  }};
};
