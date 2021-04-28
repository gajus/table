###### config.columns[*].width
Type: `number`
Default: the maximum width of cells in the column

Column width

```js

const data = [
  ['0A', '0B', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C']
];

const options = {
  columns: {
    1: {
      width: 10
    }
  }
};

console.log(table(data, options));
```

```
╔════╤════════════╤════╗
║ 0A │ 0B         │ 0C ║
╟────┼────────────┼────╢
║ 1A │ 1B         │ 1C ║
╟────┼────────────┼────╢
║ 2A │ 2B         │ 2C ║
╚════╧════════════╧════╝
```
