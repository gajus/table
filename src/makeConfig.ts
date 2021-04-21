import cloneDeep from 'lodash.clonedeep';
import calculateMaximumColumnWidthIndex from './calculateMaximumColumnWidthIndex';
import getBorderCharacters from './getBorderCharacters';
import type {
  ColumnUserConfig, Indexable,
  BorderUserConfig, BorderConfig, TableUserConfig,
} from './types/api';
import type {
  ColumnConfig, Row, TableConfig,
} from './types/internal';
import validateConfig from './validateConfig';

/**
 * Merges user provided border characters with the default border ("honeywell") characters.
 */
const makeBorder = (border: BorderUserConfig | undefined): BorderConfig => {
  return {
    ...getBorderCharacters('honeywell'),
    ...border,
  };
};

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 */
const makeColumns = (rows: Row[],
  columns?: Indexable<ColumnUserConfig>,
  columnDefault?: ColumnUserConfig): Indexable<ColumnConfig> => {
  const maximumColumnWidthIndex = calculateMaximumColumnWidthIndex(rows);

  return rows[0].reduce<Record<number, ColumnConfig>>((result, _cell, index) => {
    result[index] = {
      alignment: 'left',
      paddingLeft: 1,
      paddingRight: 1,
      truncate: Number.MAX_VALUE,
      width: maximumColumnWidthIndex[index],
      wrapWord: false,
      ...columnDefault,
      ...columns?.[index],
    };

    return result;
  }, {});
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
