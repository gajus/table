import type {
  TableUserConfig,
} from '../../../../src';
import {
  table,
} from '../../../../src';
import {
  expectTable,
} from '../../../utils';

describe('README.md api/table/', () => {
  it('/header', () => {
    const data = [
      ['0A', '0B', '0C'],
      ['1A', '1B', '1C'],
      ['2A', '2B', '2C'],
    ];

    const config: TableUserConfig = {
      columnDefault: {
        width: 10,
      },
      header: {
        alignment: 'center',
        content: 'THE HEADER\nThis is the table about something',
      },
    };

    expectTable(table(data, config), `
╔══════════════════════════════════════╗
║              THE HEADER              ║
║  This is the table about something   ║
╟────────────┬────────────┬────────────╢
║ 0A         │ 0B         │ 0C         ║
╟────────────┼────────────┼────────────╢
║ 1A         │ 1B         │ 1C         ║
╟────────────┼────────────┼────────────╢
║ 2A         │ 2B         │ 2C         ║
╚════════════╧════════════╧════════════╝
        `);
  });
});
