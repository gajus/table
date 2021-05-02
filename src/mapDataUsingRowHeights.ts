import type {
  BaseConfig, ColumnConfig,
  Row,
} from './types/internal';
import {
  wrapCell,
} from './wrapCell';

const createEmptyStrings = (length: number) => {
  return new Array(length).fill('');
};

const padCellVertically = (lines: string[], rowHeight: number, columnConfig: ColumnConfig): string[] => {
  const {verticalAlignment} = columnConfig;

  const availableLines = rowHeight - lines.length;

  if (verticalAlignment === 'top') {
    return [...lines, ...createEmptyStrings(availableLines)];
  }

  if (verticalAlignment === 'bottom') {
    return [...createEmptyStrings(availableLines), ...lines];
  }

  return [
    ...createEmptyStrings(Math.floor(availableLines / 2)),
    ...lines,
    ...createEmptyStrings(Math.ceil(availableLines / 2)),
  ];
};

const flatten = <T>(array: T[][]): T[] => {
  return ([] as T[]).concat(...array);
};

export const mapDataUsingRowHeights = (unmappedRows: Row[], rowHeights: number[], config: BaseConfig): Row[] => {
  const tableWidth = unmappedRows[0].length;

  const mappedRows = unmappedRows.map((unmappedRow, unmappedRowIndex) => {
    const outputRowHeight = rowHeights[unmappedRowIndex];
    const outputRow: Row[] = Array.from({length: outputRowHeight}, () => {
      return new Array(tableWidth).fill('');
    });

    unmappedRow.forEach((cell, cellIndex) => {
      const cellLines = wrapCell(cell, config.columns[cellIndex].width, config.columns[cellIndex].wrapWord);

      const paddedCellLines = padCellVertically(cellLines, outputRowHeight, config.columns[cellIndex]);

      paddedCellLines.forEach((cellLine, cellLineIndex) => {
        outputRow[cellLineIndex][cellIndex] = cellLine;
      });
    });

    return outputRow;
  });

  return flatten(mappedRows);
};

