##### config.spanningCells

Type: `SpanningCellConfig[]`

Spanning cells configuration.

The configuration should be straightforward: just specify an array of minimal cell configurations including the position of top-left cell
and the number of columns and/or rows will be expanded from it.

The content of overlap cells will be ignored to make the `data` shape be consistent.

By default, the configuration of column that the top-left cell belongs to will be applied to the whole spanning cell, except:
* The `width` will be summed up of all spanning columns.
* The `paddingRight` will be received from the right-most column intentionally.

Advances customized column-like styles can be configurable to each spanning cell to overwrite the default behavior.

```js
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

const config = {
  columns: [
    { alignment: 'center', width: 12 },
    { alignment: 'center', width: 10 },
    { alignment: 'right' },
    { alignment: 'right' },
    { alignment: 'right' },
    { alignment: 'right' }
  ],
  spanningCells: [
    { col: 0, row: 0, colSpan: 6 },
    { col: 0, row: 2, rowSpan: 2, verticalAlignment: 'middle'},
    { col: 0, row: 4, colSpan: 2, alignment: 'right'},
    { col: 0, row: 5, rowSpan: 2, verticalAlignment: 'middle'},
    { col: 0, row: 7, colSpan: 2, alignment: 'right' },
    { col: 0, row: 8, colSpan: 2, alignment: 'right' }
  ],
};

console.log(table(data, config));
```

```
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
```
