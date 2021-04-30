##### config.drawHorizontalLine

Type: `(lineIndex: number, rowCount: number) => boolean`

Default: `() => true`

Used to tell whether to draw a horizontal line. This callback is called for each horizontal border of the table.
If the table has `n` rows then the `index` parameter is alternatively received all numbers in range `[0, n]` inclusively.

```js
const data = [
  ['0A', '0B', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C'],
  ['3A', '3B', '3C'],
  ['4A', '4B', '4C']
];

const config = {
  drawHorizontalLine: (lineIndex, rowCount) => {
    return lineIndex === 0 || lineIndex === 1 || lineIndex === rowCount - 1 || lineIndex === rowCount;
  }
};

console.log(table(data, config));

```

```
╔════╤════╤════╗
║ 0A │ 0B │ 0C ║
╟────┼────┼────╢
║ 1A │ 1B │ 1C ║
║ 2A │ 2B │ 2C ║
║ 3A │ 3B │ 3C ║
╟────┼────┼────╢
║ 4A │ 4B │ 4C ║
╚════╧════╧════╝

```
