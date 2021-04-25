import alignTableData from './alignTableData';
import calculateRowHeights from './calculateRowHeights';
import {
  drawBorderBottom,
  drawBorderJoin,
  drawBorderTop,
} from './drawBorder';
import drawRow from './drawRow';
import makeStreamConfig from './makeStreamConfig';
import mapDataUsingRowHeights from './mapDataUsingRowHeights';
import padTableData from './padTableData';
import stringifyTableData from './stringifyTableData';
import truncateTableData from './truncateTableData';
import type {
  StreamUserConfig,
  WritableStream,
} from './types/api';
import type {
  Row, StreamConfig,
} from './types/internal';

const prepareData = (data: Row[], config: StreamConfig) => {
  let rows = stringifyTableData(data);

  rows = truncateTableData(rows, config);

  const rowHeights = calculateRowHeights(rows, config);

  rows = mapDataUsingRowHeights(rows, rowHeights, config);
  rows = alignTableData(rows, config);
  rows = padTableData(rows, config);

  return rows;
};

const create = (row: Row, columnWidths: number[], config: StreamConfig) => {
  const rows = prepareData([row], config);

  const body = rows.map((literalRow) => {
    return drawRow(literalRow, config);
  }).join('');

  let output;

  output = '';

  output += drawBorderTop(columnWidths, config);
  output += body;
  output += drawBorderBottom(columnWidths, config);

  output = output.trimEnd();

  process.stdout.write(output);
};

const append = (row: Row, columnWidths: number[], config: StreamConfig) => {
  const rows = prepareData([row], config);

  const body = rows.map((literalRow) => {
    return drawRow(literalRow, config);
  }).join('');

  let output = '';
  const bottom = drawBorderBottom(columnWidths, config);

  if (bottom !== '\n') {
    output = '\r\u001B[K';
  }

  output += drawBorderJoin(columnWidths, config);
  output += body;
  output += bottom;

  output = output.trimEnd();

  process.stdout.write(output);
};

export default (userConfig: StreamUserConfig): WritableStream => {
  const config = makeStreamConfig(userConfig);

  const columnWidths = Object.values(config.columns).map((column) => {
    return column.width + column.paddingLeft + column.paddingRight;
  });

  let empty = true;

  return {
    write: (row: string[]) => {
      if (row.length !== config.columnCount) {
        throw new Error('Row cell count does not match the config.columnCount.');
      }

      if (empty) {
        empty = false;

        create(row, columnWidths, config);
      } else {
        append(row, columnWidths, config);
      }
    },
  };
};
