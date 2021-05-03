import {
  table,
} from '../../../../../src';
import {
  expectTable,
} from '../../../../utils';

describe('README.md api/table/columns/', () => {
  it('/padding', () => {
    const data = [
      ['0A', 'AABBCC', '0C'],
      ['1A', '1B', '1C'],
      ['2A', '2B', '2C'],
    ];

    const config = {
      columns: [
        {
          paddingLeft: 3,
        },
        {
          paddingRight: 3,
          width: 2,
        },
      ],
    };

    expectTable(table(data, config), `
╔══════╤══════╤════╗
║   0A │ AA   │ 0C ║
║      │ BB   │    ║
║      │ CC   │    ║
╟──────┼──────┼────╢
║   1A │ 1B   │ 1C ║
╟──────┼──────┼────╢
║   2A │ 2B   │ 2C ║
╚══════╧══════╧════╝
        `);
  });
});
