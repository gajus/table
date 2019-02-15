### Draw Horizontal Line

`{function} config.drawHorizontalLine` property is a function that is called for every non-content row in the table. The result of the function `{boolean}` determines whether a row is drawn.

```js
let data,
  output,
  options;

data = [
  ['0A', '0B', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C'],
  ['3A', '3B', '3C'],
  ['4A', '4B', '4C']
];

options = {
  /**
    * @typedef {function} drawHorizontalLine
    * @param {number} index
    * @param {number} size
    * @return {boolean}
    */
  drawHorizontalLine: (index, size) => {
    return index === 0 || index === 1 || index === size - 1 || index === size;
  }
};

output = table(data, options);

console.log(output);

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
