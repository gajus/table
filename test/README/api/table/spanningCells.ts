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
  it('/spanningCells', () => {
    const data = [
      ['Test Coverage Report', '', '', '', '', ''],
      ['Module', 'Component', 'Test Cases', 'Failures', 'Durations', 'Success Rate'],
      ['Services', 'User', '50', '30', '3m 7s', '60.0%'],
      ['', 'Payment', '100', '80', '7m 15s', '80.0%'],
      ['Subtotal', '', '150', '110', '10m 22s', '73.3%'],
      ['Controllers', 'User', '24', '18', '1m 30s', '75.0%'],
      ['', 'Payment', '30', '24', '50s', '80.0%'],
      ['Subtotal', '', '54', '42', '2m 20s', '77.8%'],
      ['Total', '', '204', '152', '12m 42s', '74.5%'],
    ];

    const config: TableUserConfig = {
      columns: [
        {alignment: 'center',
          width: 12},
        {alignment: 'center',
          width: 10},
        {alignment: 'right'},
        {alignment: 'right'},
        {alignment: 'right'},
        {alignment: 'right'},
      ],
      spanningCells: [
        {col: 0,
          colSpan: 6,
          row: 0},
        {col: 0,
          row: 2,
          rowSpan: 2,
          verticalAlignment: 'middle'},
        {alignment: 'right',
          col: 0,
          colSpan: 2,
          row: 4},
        {col: 0,
          row: 5,
          rowSpan: 2,
          verticalAlignment: 'middle'},
        {alignment: 'right',
          col: 0,
          colSpan: 2,
          row: 7},
        {alignment: 'right',
          col: 0,
          colSpan: 2,
          row: 8},
      ],
    };

    expectTable(table(data, config), `
╔══════════════════════════════════════════════════════════════════════════════╗
║                             Test Coverage Report                             ║
╟──────────────┬────────────┬────────────┬──────────┬───────────┬──────────────╢
║    Module    │ Component  │ Test Cases │ Failures │ Durations │ Success Rate ║
╟──────────────┼────────────┼────────────┼──────────┼───────────┼──────────────╢
║              │    User    │         50 │       30 │     3m 7s │        60.0% ║
║   Services   ├────────────┼────────────┼──────────┼───────────┼──────────────╢
║              │  Payment   │        100 │       80 │    7m 15s │        80.0% ║
╟──────────────┴────────────┼────────────┼──────────┼───────────┼──────────────╢
║                  Subtotal │        150 │      110 │   10m 22s │        73.3% ║
╟──────────────┬────────────┼────────────┼──────────┼───────────┼──────────────╢
║              │    User    │         24 │       18 │    1m 30s │        75.0% ║
║ Controllers  ├────────────┼────────────┼──────────┼───────────┼──────────────╢
║              │  Payment   │         30 │       24 │       50s │        80.0% ║
╟──────────────┴────────────┼────────────┼──────────┼───────────┼──────────────╢
║                  Subtotal │         54 │       42 │    2m 20s │        77.8% ║
╟───────────────────────────┼────────────┼──────────┼───────────┼──────────────╢
║                     Total │        204 │      152 │   12m 42s │        74.5% ║
╚═══════════════════════════╧════════════╧══════════╧═══════════╧══════════════╝
`);
  });
});
