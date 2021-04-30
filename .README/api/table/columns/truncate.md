###### config.columns[*].truncate

Type: `number`\
Default: `Infinity`

The number of characters is which the content will be truncated.
To handle a content that overflows the container width, `table` package implements [text wrapping](#config.columns[*].wrapWord). However, sometimes you may want to truncate content that is too long to be displayed in the table.

```js
const data = [
  ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra.']
];

const config = {
  columns: [
    {
      width: 20,
      truncate: 100
    }
  ]
};

console.log(table(data, config));
```

```
╔══════════════════════╗
║ Lorem ipsum dolor si ║
║ t amet, consectetur  ║
║ adipiscing elit. Pha ║
║ sellus pulvinar nibh ║
║ sed mauris convall…  ║
╚══════════════════════╝
```
