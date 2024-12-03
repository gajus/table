import {
  alignTableData,
} from './alignTableData';
import {
  calculateOutputColumnWidths,
} from './calculateOutputColumnWidths';
import {
  calculateRowHeights,
} from './calculateRowHeights';
import {
  drawTable,
} from './drawTable';
import {
  injectHeaderConfig,
} from './injectHeaderConfig';
import {
  makeTableConfig,
} from './makeTableConfig';
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
  extractTruncates,
} from './utils';
import {
  validateTableData,
} from './validateTableData';

export const table = (data: ReadonlyArray<readonly unknown[]>, userConfig: TableUserConfig = {}): string => {
  validateTableData(data);

  let rows = stringifyTableData(data);

  const [injectedRows, injectedSpanningCellConfig] = injectHeaderConfig(rows, userConfig);

  const config = makeTableConfig(injectedRows, userConfig, injectedSpanningCellConfig);

  rows = truncateTableData(injectedRows, extractTruncates(config));

  const rowHeights = calculateRowHeights(rows, config);

  config.spanningCellManager.setRowHeights(rowHeights);
  config.spanningCellManager.setRowIndexMapping(rowHeights);

  rows = mapDataUsingRowHeights(rows, rowHeights, config);
  rows = alignTableData(rows, config);
  rows = padTableData(rows, config);

  const outputColumnWidths = calculateOutputColumnWidths(config);

  return drawTable(rows, outputColumnWidths, rowHeights, config);
};
