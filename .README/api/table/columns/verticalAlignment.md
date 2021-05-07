###### config.columns[*].verticalAlignment

Type: `'top' | 'middle' | 'bottom'`\
Default: `'top'`

Cell content vertical alignment

```js
const data = [
  ['A', 'B', 'C', 'DEF'],
];

const config = {
  columnDefault: {
    width: 1,
  },
  columns: [
    { verticalAlignment: 'top' },
    { verticalAlignment: 'middle' },
    { verticalAlignment: 'bottom' },
  ],
};

console.log(table(data, config));
```

```
╔═══╤═══╤═══╤═══╗
║ A │   │   │ D ║
║   │ B │   │ E ║
║   │   │ C │ F ║
╚═══╧═══╧═══╧═══╝
```
