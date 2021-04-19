### Text Truncation

To handle a content that overflows the container width, `table` package implements [text wrapping](#table-usage-text-wrapping). However, sometimes you may want to truncate content that is too long to be displayed in the table.

`{number} config.columns[{number}].truncate` property (default: `Infinity`) truncates the text at the specified length.

```js
let config,
  data,
  output;

data = [
  ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra.']
];

config = {
  columns: {
    0: {
      width: 20,
      truncate: 100
    }
  }
};

output = table(data, config);

console.log(output);
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
