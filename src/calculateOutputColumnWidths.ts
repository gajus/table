import type {
  TableConfig,
} from './types/internal';

export const calculateOutputColumnWidths = (config: TableConfig): number[] => {
  return config.columns.map((col) => {
    return col.paddingLeft + col.width + col.paddingRight;
  });
};
