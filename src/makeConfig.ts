import cloneDeep from 'lodash.clonedeep';
import calculateColumnWidths from './calculateColumnWidths';
import type {
  ColumnUserConfig, Indexable,
  TableUserConfig,
} from './types/api';
import type {
  ColumnConfig, Row, TableConfig,
} from './types/internal';
import {
  makeBorder,
} from './utils';
import validateConfig from './validateConfig';

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 */
const makeColumns = (rows: Row[],
  columns?: Indexable<ColumnUserConfig>,
  columnDefault?: ColumnUserConfig): Indexable<ColumnConfig> => {
  const columnWidths = calculateColumnWidths(rows);

  return rows[0].map((_, columnIndex) => {
    return {
      alignment: 'left',
      paddingLeft: 1,
      paddingRight: 1,
      truncate: Number.POSITIVE_INFINITY,
      width: columnWidths[columnIndex],
      wrapWord: false,
      ...columnDefault,
      ...columns?.[columnIndex],
    };
  });
};

/**
 * Makes a new configuration object out of the userConfig object
 * using default values for the missing configuration properties.
 */

export default (rows: Row[], userConfig: TableUserConfig = {}): TableConfig => {
  validateConfig('config.json', userConfig);

  const config = cloneDeep(userConfig);

  return {
    ...config,
    border: makeBorder(config.border),
    columns: makeColumns(rows, config.columns, config.columnDefault),
    drawHorizontalLine: config.drawHorizontalLine ?? (() => {
      return true;
    }),
    drawVerticalLine: config.drawVerticalLine ?? (() => {
      return true;
    }),
    singleLine: config.singleLine ?? false,
  };
};
