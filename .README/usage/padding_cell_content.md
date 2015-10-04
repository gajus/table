### Padding Cell Content

`{number} config.columns[{number}].paddingLeft` and `{number} config.columns[{number}].paddingRight` properties control content padding within a cell. Property value represents a number of whitespaces used to pad the content.

```js
let config,
    data,
    output;

data = [
    ['0A', 'AABBCC', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];

config = {
    columns: {
        0: {
            paddingLeft: 3
        },
        1: {
            width: 2,
            paddingRight: 3
        }
    }
};

output = table(data, config);

console.log(output);
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
