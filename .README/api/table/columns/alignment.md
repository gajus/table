###### config.columns[*].alignment

Type: `'center' | 'justify' | 'left' | 'right'`

Default: `'left'`

Cell content horizontal alignment

```js
const data = [
  ['0A', '0B', '0C', '0D 0E 0F'],
  ['1A', '1B', '1C', '1D 1E 1F'],
  ['2A', '2B', '2C', '2D 2E 2F'],
];

const config = {
  columnDefault: {
    width: 10,
  },
  columns: [
    { alignment: 'left' },
    { alignment: 'center' },
    { alignment: 'right' },
    { alignment: 'justify' }
  ],
};

console.log(table(data, config));
```

```
╔════════════╤════════════╤════════════╤════════════╗
║ 0A         │     0B     │         0C │ 0D  0E  0F ║
╟────────────┼────────────┼────────────┼────────────╢
║ 1A         │     1B     │         1C │ 1D  1E  1F ║
╟────────────┼────────────┼────────────┼────────────╢
║ 2A         │     2B     │         2C │ 2D  2E  2F ║
╚════════════╧════════════╧════════════╧════════════╝
```
