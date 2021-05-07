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
  it('/verticalAlignment', () => {
    const data = [
      ['A', 'B', 'C', 'DEF'],
    ];

    const config: TableUserConfig = {
      columnDefault: {
        width: 1,
      },
      columns: [
        {verticalAlignment: 'top'},
        {verticalAlignment: 'middle'},
        {verticalAlignment: 'bottom'},
      ],
    };

    expectTable(table(data, config), `
╔═══╤═══╤═══╤═══╗
║ A │   │   │ D ║
║   │ B │   │ E ║
║   │   │ C │ F ║
╚═══╧═══╧═══╧═══╝`);
  });
});
