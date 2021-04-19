import alignTableData from './alignTableData';
import calculateRowHeightIndex from './calculateRowHeightIndex';
import {
  drawBorderBottom,
  drawBorderJoin,
  drawBorderTop,
} from './drawBorder';
import drawRow from './drawRow';
import makeStreamConfig from './makeStreamConfig';
import mapDataUsingRowHeightIndex from './mapDataUsingRowHeightIndex';
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

  const rowHeightIndex = calculateRowHeightIndex(rows, config);

  rows = mapDataUsingRowHeightIndex(rows, rowHeightIndex, config);
  rows = alignTableData(rows, config);
  rows = padTableData(rows, config);

  return rows;
};

const create = (row: Row, columnWidthIndex: number[], config: StreamConfig) => {
  const rows = prepareData([row], config);

  const body = rows.map((literalRow) => {
    return drawRow(literalRow, config);
  }).join('');

  let output;

  output = '';

  output += drawBorderTop(columnWidthIndex, config);
  output += body;
  output += drawBorderBottom(columnWidthIndex, config);

  output = output.trimEnd();

  process.stdout.write(output);
};

const append = (row: Row, columnWidthIndex: number[], config: StreamConfig) => {
  const rows = prepareData([row], config);

  const body = rows.map((literalRow) => {
    return drawRow(literalRow, config);
  }).join('');

  let output = '';
  const bottom = drawBorderBottom(columnWidthIndex, config);

  if (bottom !== '\n') {
    output = '\r\u001B[K';
  }

  output += drawBorderJoin(columnWidthIndex, config);
  output += body;
  output += bottom;

  output = output.trimEnd();

  process.stdout.write(output);
};

export default (userConfig: StreamUserConfig): WritableStream => {
  const config = makeStreamConfig(userConfig);

  const columnWidthIndex = Object.values(config.columns).map((column) => {
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

        create(row, columnWidthIndex, config);
      } else {
        append(row, columnWidthIndex, config);
      }
    },
  };
};
