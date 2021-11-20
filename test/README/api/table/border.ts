import {
  table,
} from '../../../../src';
import {
  expectTable,
} from '../../../utils';

describe('README.md api/table', () => {
  it('border', () => {
    const data = [
      ['0A', '0B', '0C'],
      ['1A', '1B', '1C'],
      ['2A', '2B', '2C'],
    ];

    /* eslint-disable canonical/sort-keys */
    const config = {
      border: {
        topBody: '─',
        topJoin: '┬',
        topLeft: '┌',
        topRight: '┐',

        bottomBody: '─',
        bottomJoin: '┴',
        bottomLeft: '└',
        bottomRight: '┘',

        bodyLeft: '│',
        bodyRight: '│',
        bodyJoin: '│',

        joinBody: '─',
        joinLeft: '├',
        joinRight: '┤',
        joinJoin: '┼',
      },
    };
    /* eslint-enable canonical/sort-keys */

    const output = table(data, config);

    expectTable(output, `
┌────┬────┬────┐
│ 0A │ 0B │ 0C │
├────┼────┼────┤
│ 1A │ 1B │ 1C │
├────┼────┼────┤
│ 2A │ 2B │ 2C │
└────┴────┴────┘
        `);
  });
});
