import flatten from 'lodash.flatten';
import type {
  BaseConfig,
  Row,
} from './types/internal';
import wrapCell from './wrapCell';

export default (unmappedRows: Row[], rowHeights: number[], config: BaseConfig): Row[] => {
  const tableWidth = unmappedRows[0].length;

  const mappedRows = unmappedRows.map((unmappedRow, unmappedRowIndex) => {
    const outputRowHeight = rowHeights[unmappedRowIndex];
    const outputRow: Row[] = Array.from({length: outputRowHeight}, () => {
      return new Array(tableWidth).fill('');
    });

    // rowHeight
    //     [{row index within rowSaw; index2}]
    //     [{cell index within a virtual row; index1}]

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
