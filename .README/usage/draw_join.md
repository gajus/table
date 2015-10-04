### Draw Join

`{function} config.drawJoin` property is a function that is called for every row in the table. The result of the function `{boolean}` determines whether a join/separating row is drawn.

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
     * Used to dynamically tell table whether to draw a line separating rows or not.
     * The default behavior is to always return true.
     *
     * @typedef {function} drawJoin
     * @param {number} index
     * @param {number} size
     * @return {boolean}
     */
    drawJoin: (index, size) => {
        // This implementation draws a separating line only after the first row
        // and before the last row.
        if (index === 1 || index === size - 1) {
            return true;
        }
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
