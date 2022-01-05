import type {
  VerticalAlignment,
} from './types/api';
import type {
  BaseConfig,
  Row,
} from './types/internal';
import {
  flatten,
} from './utils';
import {
  wrapCell,
} from './wrapCell';

const createEmptyStrings = (length: number) => {
  return new Array(length).fill('');
};

export const padCellVertically = (lines: string[], rowHeight: number, verticalAlignment: VerticalAlignment): string[] => {
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

export const mapDataUsingRowHeights = (unmappedRows: Row[], rowHeights: number[], config: BaseConfig): Row[] => {
  const nColumns = unmappedRows[0].length;

  const mappedRows = unmappedRows.map((unmappedRow, unmappedRowIndex) => {
    const outputRowHeight = rowHeights[unmappedRowIndex];
    const outputRow: Row[] = Array.from({length: outputRowHeight}, () => {
      return new Array(nColumns).fill('');
    });

    unmappedRow.forEach((cell, cellIndex) => {
      const containingRange = config.spanningCellManager?.getContainingRange({col: cellIndex,
        row: unmappedRowIndex});
      if (containingRange) {
        containingRange.extractCellContent(unmappedRowIndex).forEach((cellLine, cellLineIndex) => {
          outputRow[cellLineIndex][cellIndex] = cellLine;
        });

        return;
      }
      const cellLines = wrapCell(cell, config.columns[cellIndex].width, config.columns[cellIndex].wrapWord);

      const paddedCellLines = padCellVertically(cellLines, outputRowHeight, config.columns[cellIndex].verticalAlignment);

      paddedCellLines.forEach((cellLine, cellLineIndex) => {
        outputRow[cellLineIndex][cellIndex] = cellLine;
      });
    });

    return outputRow;
  });

  return flatten(mappedRows);
};

