import {
  alignString,
} from './alignString';
import type {
  BaseConfig,
  Row,
} from './types/internal';

export const alignTableData = (rows: Row[], config: BaseConfig): Row[] => {
  return rows.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      const {width, alignment} = config.columns[cellIndex];

      const containingRange = config.spanningCellManager?.getContainingRange({col: cellIndex,
        row: rowIndex}, {mapped: true});
      if (containingRange) {
        return cell;
      }

      return alignString(cell, width, alignment);
    });
  });
};
