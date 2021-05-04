import {
  table,
} from '../../../../src';
import type {
  TableUserConfig,
} from '../../../../src';
import {
  expectTable,
} from '../../../utils';

describe('README.md api/table', () => {
  it('drawVerticalLine', () => {
    const data = [
      ['0A', '0B', '0C'],
      ['1A', '1B', '1C'],
      ['2A', '2B', '2C'],
      ['3A', '3B', '3C'],
      ['4A', '4B', '4C'],
    ];

    const options: TableUserConfig = {
      drawVerticalLine: (index, size) => {
        return index === 0 || index === size;
      },
    };

    const output = table(data, options);

    expectTable(output, `
╔════════════╗
║ 0A  0B  0C ║
╟────────────╢
║ 1A  1B  1C ║
╟────────────╢
║ 2A  2B  2C ║
╟────────────╢
║ 3A  3B  3C ║
╟────────────╢
║ 4A  4B  4C ║
╚════════════╝
        `);
  });
});
