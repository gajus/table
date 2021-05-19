import type {
  ColumnUserConfig, Indexable,
} from './types/api';
import {
  distributeUnevenly,
} from './utils';

const DEFAULT_PADDING = 1;
type ColumnConfigs = Indexable<ColumnUserConfig>;

const calculateRemainWidth = (
  {widths, totalWidth, columnConfigs, columnDefault}: {
    widths: Array<number | 'auto'>,
    totalWidth: number,
    columnConfigs?: ColumnConfigs,
    columnDefault?: ColumnUserConfig,
  },
): number => {
  const totalBorderWidth = widths.length + 1;
  const totalPadding = widths.reduce<number>((total, _, columnIndex) => {
    const paddingLeft = columnConfigs?.[columnIndex]?.paddingLeft ?? columnDefault?.paddingLeft ?? DEFAULT_PADDING;
    const paddingRight = columnConfigs?.[columnIndex]?.paddingRight ?? columnDefault?.paddingRight ?? DEFAULT_PADDING;

    return total + paddingLeft + paddingRight;
  }, 0);
  const totalFixedWidth = widths.reduce<number>((total, width) => {
    return total + (width === 'auto' ? 0 : width);
  }, 0);

  return totalWidth - totalBorderWidth - totalPadding - totalFixedWidth;
};

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 */
export const calculateColumnWidths = (maxColumnWidths: ReadonlyArray<number | 'auto'>,
  columnsConfig?: ColumnConfigs,
  columnDefault?: ColumnUserConfig,
  totalWidth = process.stdout.columns): number[] => {
  const widths = maxColumnWidths.map((maxColumnWidth, columnIndex) => {
    return columnsConfig?.[columnIndex]?.width ?? columnDefault?.width ?? maxColumnWidth;
  });

  const remainWidth = calculateRemainWidth(
    {columnConfigs: columnsConfig,
      columnDefault,
      totalWidth,
      widths},
  );
  const autoColumnCount = maxColumnWidths.filter((_, columnIndex) => {
    return 'auto' === (columnsConfig?.[columnIndex]?.width ?? columnDefault?.width);
  }).length;
  const autoWidths = distributeUnevenly(remainWidth, autoColumnCount);

  return widths.map((width, index) => {
    if (width !== 'auto') {
      return width;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const autoWidth = autoWidths.shift()!;

    if (autoWidth >= 0) {
      return autoWidth;
    }

    if (typeof columnDefault?.width === 'number') {
      return columnDefault.width;
    }

    const maxWidth = maxColumnWidths[index];
    if (typeof maxWidth === 'number') {
      return maxWidth;
    }

    throw new Error('There is not available space for draw the table');
  });
};
