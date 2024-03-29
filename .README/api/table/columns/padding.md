###### config.columns[*].paddingLeft

Type: `number`\
Default: `1`

The number of whitespaces used to pad the content on the left.

###### config.columns[*].paddingRight

Type: `number`\
Default: `1`

The number of whitespaces used to pad the content on the right.

The `paddingLeft` and `paddingRight` options do not count on the column width. So the column has `width = 5`, `paddingLeft = 2` and `paddingRight = 2` will have the total width is `9`.


```js
const data = [
  ['0A', 'AABBCC', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C']
];

const config = {
  columns: [
    {
      paddingLeft: 3
    },
    {
      width: 2,
      paddingRight: 3
    }
  ]
};

console.log(table(data, config));
```

```
╔══════╤══════╤════╗
║   0A │ AA   │ 0C ║
║      │ BB   │    ║
║      │ CC   │    ║
╟──────┼──────┼────╢
║   1A │ 1B   │ 1C ║
╟──────┼──────┼────╢
║   2A │ 2B   │ 2C ║
╚══════╧══════╧════╝
```
