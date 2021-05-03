import {
  table,
} from '../../../../../src';
import {
  expectTable,
} from '../../../../utils';

describe('README.md api/table/column/wrapWord', () => {
  it('text_wrapping (no wrap word)', () => {
    const data = [
      ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra.'],
    ];

    const config = {
      columns: [{width: 20}],
    };

    const output = table(data, config);

    expectTable(output, `
╔══════════════════════╗
║ Lorem ipsum dolor si ║
║ t amet, consectetur  ║
║ adipiscing elit. Pha ║
║ sellus pulvinar nibh ║
║ sed mauris convallis ║
║ dapibus. Nunc venena ║
║ tis tempus nulla sit ║
║ amet viverra.        ║
╚══════════════════════╝
        `);
  });

  it('text_wrapping (wrap word)', () => {
    const data = [
      ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra.'],
    ];

    const config = {
      columns: [{width: 20,
        wrapWord: true}],
    };

    expectTable(table(data, config), `
╔══════════════════════╗
║ Lorem ipsum dolor    ║
║ sit amet,            ║
║ consectetur          ║
║ adipiscing elit.     ║
║ Phasellus pulvinar   ║
║ nibh sed mauris      ║
║ convallis dapibus.   ║
║ Nunc venenatis       ║
║ tempus nulla sit     ║
║ amet viverra.        ║
╚══════════════════════╝
        `);
  });
});
