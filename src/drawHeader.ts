import {
  alignString,
} from './alignString';
import {
  drawRow,
} from './drawRow';
import {
  padString,
} from './padTableData';
import {
  truncateString,
} from './truncateTableData';
import type {
  TableConfig,
} from './types/internal';
import {
  wrapCell,
} from './wrapCell';

export const drawHeader = (width: number, config: TableConfig): string => {
  if (!config.header) {
    throw new Error('Can not draw header without header configuration');
  }

  const {alignment, paddingRight, paddingLeft, wrapWord} = config.header;

  let content = config.header.content;

  content = truncateString(content, config.header.truncate);

  const headerLines = wrapCell(content, width, wrapWord);

  return headerLines.map((headerLine) => {
    let line = alignString(headerLine, width, alignment);
    line = padString(line, paddingLeft, paddingRight);

    return drawRow([line], {
      ...config,
      drawVerticalLine: (index) => {
        const columnCount = config.columns.length;

        return config.drawVerticalLine(index === 0 ? 0 : columnCount, columnCount);
      },
    });
  }).join('');
};
