### Cell Content Alignment

`{string} config.columns[{number}].alignment` property controls content horizontal alignment within a cell.

Valid values are: "left", "right", "center" and "justify".

```js
let config,
  data,
  output;

data = [
  ['0A', '0B', '0C', '0D 0E 0F'],
  ['1A', '1B', '1C', '1D 1E 1F'],
  ['2A', '2B', '2C', '2D 2E 2F'],
];

config = {
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

output = table(data, config);

console.log(output);
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
