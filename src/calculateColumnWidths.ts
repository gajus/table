import type {
  ColumnUserConfig, Indexable,
} from './types/api';

/**
 * Creates a configuration for every column using default
 * values for the missing configuration properties.
 */
export const calculateColumnWidths = (maxColumnWidths: number[],
  columnsConfig?: Indexable<ColumnUserConfig>,
  columnDefault?: ColumnUserConfig): number[] => {
  const columnCount = maxColumnWidths.length;
  const columnIndices = Array.from<number>(new Array(columnCount).keys());

  const totalPadding = columnIndices.reduce<number>((total, columnIndex) => {
    const paddingLeft = columnsConfig?.[columnIndex]?.paddingLeft ?? columnDefault?.paddingLeft ?? 1;
    const paddingRight = columnsConfig?.[columnIndex]?.paddingRight ?? columnDefault?.paddingRight ?? 1;

    return total + paddingLeft + paddingRight;
  }, 0);

  const fixedWidths = columnIndices.map((columnIndex) => {
    const width = columnsConfig?.[columnIndex]?.width ?? columnDefault?.width ?? maxColumnWidths[columnIndex];

    return width === 'auto' ? 0 : width;
  });

  const totalFixedWidth = fixedWidths.reduce((total, width) => {
    return total + width;
  }, 0);
  const totalBorderWiths = columnCount + 1;
  const totalWidth = process.stdout.columns;
  const remainWidth = totalWidth - totalBorderWiths - totalPadding - totalFixedWidth;

  const autoColumnCount = Object.values(columnsConfig ?? {}).filter(({width}) => {
    return width === 'auto';
  }).length;

  return fixedWidths.map((width) => {
    return width === 0 ? Math.floor(remainWidth / autoColumnCount) : width;
  });
};
