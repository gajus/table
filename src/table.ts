import alignTableData from './alignTableData';
import calculateCellWidthIndex from './calculateCellWidthIndex';
import calculateRowHeightIndex from './calculateRowHeightIndex';
import drawTable from './drawTable';
import makeConfig from './makeConfig';
import mapDataUsingRowHeightIndex from './mapDataUsingRowHeightIndex';
import padTableData from './padTableData';
import stringifyTableData from './stringifyTableData';
import truncateTableData from './truncateTableData';
import type {
  TableUserConfig,
} from './types/api';
import validateTableData from './validateTableData';

export default (data: unknown[][], userConfig: TableUserConfig = {}): string => {
  validateTableData(data);

  let rows = stringifyTableData(data);

  const config = makeConfig(rows, userConfig);

  rows = truncateTableData(rows, config);

  const rowHeightIndex = calculateRowHeightIndex(rows, config);

  rows = mapDataUsingRowHeightIndex(rows, rowHeightIndex, config);
  rows = alignTableData(rows, config);
  rows = padTableData(rows, config);

  const cellWidthIndex = calculateCellWidthIndex(rows[0]);

  return drawTable(rows, cellWidthIndex, rowHeightIndex, config);
};
