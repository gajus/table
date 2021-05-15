import cloneDeep from 'lodash.clonedeep';
import {
  calculateColumnWidths,
} from './calculateColumnWidths';
import {
  calculateMaximumColumnWidths,
} from './calculateMaximumColumnWidths';
import type {
  ColumnUserConfig,
  Indexable,
  TableUserConfig,
} from './types/api';
import type {
  ColumnConfig,
  HeaderConfig, Row, TableConfig,
} from './types/internal';
import {
  makeBorderConfig,
} from './utils';
import {
  validateConfig,
} from './validateConfig';

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 */
const makeColumnsConfig = (rows: Row[],
  columns?: Indexable<ColumnUserConfig>,
  columnDefault?: ColumnUserConfig): ColumnConfig[] => {
  const widths = calculateColumnWidths(calculateMaximumColumnWidths(rows), columns, columnDefault);

  return rows[0].map((_, columnIndex) => {
    return {
      alignment: 'left',
      paddingLeft: 1,
      paddingRight: 1,
      truncate: Number.POSITIVE_INFINITY,
      verticalAlignment: 'top',
      wrapWord: false,
      ...columnDefault,
      ...columns?.[columnIndex],
      width: widths[columnIndex],
    };
  });
};

const makeHeaderConfig = (config: TableUserConfig): HeaderConfig | undefined => {
  if (!config.header) {
    return undefined;
  }

  return {
    alignment: 'center',
    paddingLeft: 1,
    paddingRight: 1,
    truncate: Number.POSITIVE_INFINITY,
    wrapWord: false,
    ...config.header,
  };
};

/**
 * Makes a new configuration object out of the userConfig object
 * using default values for the missing configuration properties.
 */

export const makeTableConfig = (rows: Row[], userConfig: TableUserConfig = {}): TableConfig => {
  validateConfig('config.json', userConfig);

  const config = cloneDeep(userConfig);

  return {
    ...config,
    border: makeBorderConfig(config.border),
    columns: makeColumnsConfig(rows, config.columns, config.columnDefault),
    drawHorizontalLine: config.drawHorizontalLine ?? (() => {
      return true;
    }),
    drawVerticalLine: config.drawVerticalLine ?? (() => {
      return true;
    }),
    header: makeHeaderConfig(config),
    singleLine: config.singleLine ?? false,
  };
};
