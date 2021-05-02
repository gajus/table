import type {
  BaseConfig,
  Row,
} from './types/internal';
import {
  wrapCell,
} from './wrapCell';

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

      cellLines.forEach((cellLine, cellLineIndex) => {
        outputRow[cellLineIndex][cellIndex] = cellLine;
      });
    });

    return outputRow;
  });

  return flatten(mappedRows);
};
