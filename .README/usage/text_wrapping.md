### Text Wrapping

`table` package implements auto text wrapping, i.e. text that has width greater than the container width will be separated into multiple lines, e.g.

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
            width: 20
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
║ sed mauris convallis ║
║ dapibus. Nunc venena ║
║ tis tempus nulla sit ║
║ amet viverra.        ║
╚══════════════════════╝
```

When `wrapWord` is `true` the text is broken at the nearest space or one of the special characters ("-", "_", "\", "/", ".", ",", ";"), e.g.

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
            wrapWord: true
        }
    }
};

output = table(data, config);

console.log(output);
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
