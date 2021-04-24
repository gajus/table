import flatten from 'lodash.flatten';
import type {
  BaseConfig,
  Row,
} from './types/internal';
import wrapCell from './wrapCell';

export default (unmappedRows: Row[], rowHeightIndex: number[], config: BaseConfig): Row[] => {
  const tableWidth = unmappedRows[0].length;

  const mappedRows = unmappedRows.map((row, index0) => {
    const rowHeight: string[][] = Array.from({length: rowHeightIndex[index0]}, () => {
      return new Array(tableWidth).fill('');
    });

    // rowHeight
    //     [{row index within rowSaw; index2}]
    //     [{cell index within a virtual row; index1}]

    row.forEach((cell, index1) => {
      const cellLines = wrapCell(cell, config.columns[index1].width, config.columns[index1].wrapWord);

      cellLines.forEach((cellLine, index2) => {
        rowHeight[index2][index1] = cellLine;
      });
    });

    return rowHeight;
  });

  return flatten(mappedRows);
};
