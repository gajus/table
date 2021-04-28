###### config.columns[*].wrapWord
Type: `boolean`
Default: `false`

`table` package implements auto text wrapping, i.e. text that has width greater than the container width will be separated into multiple lines at the nearest space or one of the special characters: `\|/_.,;-`.

When `wrapWord` is `false`:
```js
const data = [
    ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra.']
];

const config = {
  columns: [
    {
      width: 20
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
║ sed mauris convallis ║
║ dapibus. Nunc venena ║
║ tis tempus nulla sit ║
║ amet viverra.        ║
╚══════════════════════╝
```

When `wrapWord` is `true`:

```js
const data = [
  ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra.']
];

const config = {
  columns: [
    {
      width: 20,
      wrapWord: true
    }
  ]
};

console.log(table(data, config));
```

```
╔══════════════════════╗
║ Lorem ipsum dolor    ║
║ sit amet,            ║
║ consectetur          ║
║ adipiscing elit.     ║
║ Phasellus pulvinar   ║
║ nibh sed mauris      ║
║ convallis dapibus.   ║
║ Nunc venenatis       ║
║ tempus nulla sit     ║
║ amet viverra.        ║
╚══════════════════════╝

```
