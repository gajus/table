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
  makeBorderConfig,
} from './utils';
import {
  validateConfig,
} from './validateConfig';

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 */
const makeColumnsConfig = (columnCount: number,
  columns: Indexable<ColumnUserConfig> = {},
  columnDefault: StreamUserConfig['columnDefault']): ColumnConfig[] => {
  return Array.from({length: columnCount}).map((_, index) => {
    return {
      alignment: 'left',
      paddingLeft: 1,
      paddingRight: 1,
      truncate: Number.POSITIVE_INFINITY,
      verticalAlignment: 'top',
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
export const makeStreamConfig = (userConfig: StreamUserConfig): StreamConfig => {
  validateConfig('streamConfig.json', userConfig);

  const config = cloneDeep(userConfig);

  if (config.columnDefault.width === undefined) {
    throw new Error('Must provide config.columnDefault.width when creating a stream.');
  }

  return {
    drawVerticalLine: () => {
      return true;
    },
    ...config,
    border: makeBorderConfig(config.border),
    columns: makeColumnsConfig(config.columnCount, config.columns, config.columnDefault),
  };
};
