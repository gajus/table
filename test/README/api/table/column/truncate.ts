import {
  table,
} from '../../../../../src';
import {
  expectTable,
} from '../../../../utils';

describe('README.md api/table/column/', () => {
  it('/truncate', () => {
    const data = [
      ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra.'],
    ];

    const config = {
      columns: [
        {
          truncate: 100,
          width: 20,
        },
      ],
    };

    expectTable(table(data, config), `
╔══════════════════════╗
║ Lorem ipsum dolor si ║
║ t amet, consectetur  ║
║ adipiscing elit. Pha ║
║ sellus pulvinar nibh ║
║ sed mauris convall…  ║
╚══════════════════════╝
        `);
  });
});
