import {
  alignTableData,
} from './alignTableData';
import {
  calculateCellWidths,
} from './calculateCellWidths';
import {
  calculateRowHeights,
} from './calculateRowHeights';
import {
  drawTable,
} from './drawTable';
import {
  makeConfig,
} from './makeConfig';
import {
  mapDataUsingRowHeights,
} from './mapDataUsingRowHeights';
import {
  padTableData,
} from './padTableData';
import {
  stringifyTableData,
} from './stringifyTableData';
import {
  truncateTableData,
} from './truncateTableData';
import type {
  TableUserConfig,
} from './types/api';
import {
  validateTableData,
} from './validateTableData';

export const table = (data: unknown[][], userConfig: TableUserConfig = {}): string => {
  validateTableData(data);

  let rows = stringifyTableData(data);

  const config = makeConfig(rows, userConfig);

  rows = truncateTableData(rows, config);

  const rowHeights = calculateRowHeights(rows, config);

  rows = mapDataUsingRowHeights(rows, rowHeights, config);
  rows = alignTableData(rows, config);
  rows = padTableData(rows, config);

  const cellWidths = calculateCellWidths(rows[0]);

  return drawTable(rows, cellWidths, rowHeights, config);
};
