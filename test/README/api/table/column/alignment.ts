import type {
  TableUserConfig,
} from '../../../../../src';
import {
  table,
} from '../../../../../src';
import {
  expectTable,
} from '../../../../utils';

describe('README.md api/table/columns', () => {
  it('/alignment', () => {
    const data = [
      ['0A', '0B', '0C', '0D 0E 0F'],
      ['1A', '1B', '1C', '1D 1E 1F'],
      ['2A', '2B', '2C', '2D 2E 2F'],
    ];

    const config: TableUserConfig = {
      columnDefault: {
        width: 10,
      },
      columns: [
        {alignment: 'left'},
        {alignment: 'center'},
        {alignment: 'right'},
        {alignment: 'justify'},
      ],
    };

    expectTable(table(data, config), `
╔════════════╤════════════╤════════════╤════════════╗
║ 0A         │     0B     │         0C │ 0D  0E  0F ║
╟────────────┼────────────┼────────────┼────────────╢
║ 1A         │     1B     │         1C │ 1D  1E  1F ║
╟────────────┼────────────┼────────────┼────────────╢
║ 2A         │     2B     │         2C │ 2D  2E  2F ║
╚════════════╧════════════╧════════════╧════════════╝
        `);
  });
});
