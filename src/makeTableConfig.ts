import {
  calculateMaximumColumnWidths,
} from './calculateMaximumColumnWidths';
import {
  createSpanningCellManager,
} from './spanningCellManager';
import type {
  ColumnUserConfig, Indexable,
  SpanningCellConfig,
  TableUserConfig,
} from './types/api';
import type {
  ColumnConfig, Row, TableConfig,
} from './types/internal';
import {
  makeBorderConfig,
} from './utils';
import {
  validateConfig,
} from './validateConfig';
import {
  validateSpanningCellConfig,
} from './validateSpanningCellConfig';

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 */
const makeColumnsConfig = (rows: Row[],
  columns?: Indexable<ColumnUserConfig>,
  columnDefault?: ColumnUserConfig,
  spanningCellConfigs?: SpanningCellConfig[]): ColumnConfig[] => {
  const columnWidths = calculateMaximumColumnWidths(rows, spanningCellConfigs);

  return rows[0].map((_, columnIndex) => {
    return {
      alignment: 'left',
      paddingLeft: 1,
      paddingRight: 1,
      truncate: Number.POSITIVE_INFINITY,
      verticalAlignment: 'top',
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

export const makeTableConfig = (rows: Row[], config: TableUserConfig = {}, injectedSpanningCellConfig?: SpanningCellConfig[]): TableConfig => {
  validateConfig('config.json', config);
  validateSpanningCellConfig(rows, config.spanningCells ?? []);

  const spanningCellConfigs = injectedSpanningCellConfig ?? config.spanningCells ?? [];

  const columnsConfig = makeColumnsConfig(rows, config.columns, config.columnDefault, spanningCellConfigs);

  const drawVerticalLine = config.drawVerticalLine ?? (() => {
    return true;
  });
  const drawHorizontalLine = config.drawHorizontalLine ?? (() => {
    return true;
  });

  return {
    ...config,
    border: makeBorderConfig(config.border),
    columns: columnsConfig,
    drawHorizontalLine,
    drawVerticalLine,
    singleLine: config.singleLine ?? false,
    spanningCellManager: createSpanningCellManager({
      columnsConfig,
      drawHorizontalLine,
      drawVerticalLine,
      rows,
      spanningCellConfigs,
    }),
  };
};
