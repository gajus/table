import type {
  SpanningCellConfig,
  TableUserConfig,
} from './types/api';
import type {
  Row,
} from './types/internal';

export const injectHeaderConfig = (rows: Row[], config: TableUserConfig): [Row[], SpanningCellConfig[]] => {
  let spanningCellConfig = config.spanningCells ?? [];
  const headerConfig = config.header;
  const adjustedRows = [...rows];

  if (headerConfig) {
    spanningCellConfig = spanningCellConfig.map(({row, ...rest}) => {
      return {...rest,
        row: row + 1};
    });

    const {content, ...headerStyles} = headerConfig;

    spanningCellConfig.unshift({alignment: 'center',
      col: 0,
      colSpan: rows[0].length,
      paddingLeft: 1,
      paddingRight: 1,
      row: 0,
      wrapWord: false,
      ...headerStyles});

    adjustedRows.unshift([content, ...Array.from<string>({length: rows[0].length - 1}).fill('')]);
  }

  return [adjustedRows,
    spanningCellConfig];
};
