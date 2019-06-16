### Cell Content Alignment

`{string} config.columns[{number}].alignment` property controls content horizontal alignment within a cell.

Valid values are: "left", "right" and "center".

```js
let config,
  data,
  output;

data = [
  ['0A', '0B', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C']
];

config = {
  columns: {
    0: {
      alignment: 'left',
      width: 10
    },
    1: {
      alignment: 'center',
      width: 10
    },
    2: {
      alignment: 'right',
      width: 10
    }
  }
};

output = table(data, config);

console.log(output);
```

```
╔════════════╤════════════╤════════════╗
║ 0A         │     0B     │         0C ║
╟────────────┼────────────┼────────────╢
║ 1A         │     1B     │         1C ║
╟────────────┼────────────┼────────────╢
║ 2A         │     2B     │         2C ║
╚════════════╧════════════╧════════════╝
```
