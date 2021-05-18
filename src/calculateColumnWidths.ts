import type {
  ColumnUserConfig, Indexable,
} from './types/api';
import {
  distributeUnevenly,
} from './utils';

const DEFAULT_PADDING = 1;
type ColumnConfigs = Indexable<ColumnUserConfig>;

const calculateRemainWidth = (
  {fixedWidths, totalWidth, columnConfigs, columnDefault}: {
    fixedWidths: Array<number | 'auto'>,
    totalWidth: number,
    columnConfigs?: ColumnConfigs,
    columnDefault?: ColumnUserConfig,
  },
): number => {
  const totalBorderWidth = fixedWidths.length + 1;
  const totalPadding = fixedWidths.reduce<number>((total, _, columnIndex) => {
    const paddingLeft = columnConfigs?.[columnIndex]?.paddingLeft ?? columnDefault?.paddingLeft ?? DEFAULT_PADDING;
    const paddingRight = columnConfigs?.[columnIndex]?.paddingRight ?? columnDefault?.paddingRight ?? DEFAULT_PADDING;

    return total + paddingLeft + paddingRight;
  }, 0);
  const totalFixedWidth = fixedWidths.reduce<number>((total, width) => {
    return total + (width === 'auto' ? 0 : width);
  }, 0);

  return totalWidth - totalBorderWidth - totalPadding - totalFixedWidth;
};

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 */
export const calculateColumnWidths = (maxColumnWidths: number[],
  columnsConfig?: ColumnConfigs,
  columnDefault?: ColumnUserConfig,
  totalWidth = process.stdout.columns): number[] => {
  const fixedWidths = maxColumnWidths.map((maxColumnWidth, columnIndex) => {
    return columnsConfig?.[columnIndex]?.width ?? columnDefault?.width ?? maxColumnWidth;
  });

  const remainWidth = calculateRemainWidth(
    {columnConfigs: columnsConfig,
      columnDefault,
      fixedWidths,
      totalWidth},
  );
  const autoColumnCount = maxColumnWidths.filter((_, columnIndex) => {
    return columnsConfig?.[columnIndex]?.width === 'auto' || columnsConfig?.[columnIndex]?.width === undefined && columnDefault?.width === 'auto';
  }).length;
  const autoWidths = distributeUnevenly(remainWidth, autoColumnCount);

  return fixedWidths.map((width, columnIndex) => {
    if (width !== 'auto') {
      return width;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const autoWidth = autoWidths.shift()!;

    if (autoWidth <= 0) {
      return columnDefault?.width !== 'auto' && columnDefault?.width !== undefined ? columnDefault?.width : maxColumnWidths[columnIndex];
    }

    return autoWidth;
  });
};
