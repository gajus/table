import cloneDeep from 'lodash.clonedeep';
import type {
  ColumnUserConfig,
  Indexable,
  StreamUserConfig,
} from './types/api';
import type {
  ColumnConfig,
  StreamConfig,
} from './types/internal';
import {
  makeBorder,
} from './utils';
import validateConfig from './validateConfig';

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 */
const makeColumns = (columnCount: number,
  columns: Indexable<ColumnUserConfig> = {},
  columnDefault: StreamUserConfig['columnDefault']): Indexable<ColumnConfig> => {
  return Array.from({length: columnCount}).map((_, index) => {
    return {
      alignment: 'left',
      paddingLeft: 1,
      paddingRight: 1,
      truncate: Number.POSITIVE_INFINITY,
      wrapWord: false,
      ...columnDefault,
      ...columns[index],
    };
  });
};

/**
 * Makes a new configuration object out of the userConfig object
 * using default values for the missing configuration properties.
 */
export default (userConfig: StreamUserConfig): StreamConfig => {
  validateConfig('streamConfig.json', userConfig);

  const config = cloneDeep(userConfig);

  if (!config.columnDefault || !config.columnDefault.width) {
    throw new Error('Must provide config.columnDefault.width when creating a stream.');
  }

  if (!config.columnCount) {
    throw new Error('Must provide config.columnCount.');
  }

  return {
    ...config,
    border: makeBorder(config.border),
    columnCount: config.columnCount,
    columns: makeColumns(config.columnCount, config.columns, config.columnDefault),
    drawVerticalLine: config.drawVerticalLine ?? (() => {
      return true;
    }),
  };
};
