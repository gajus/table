### Custom Border

`config.border` property describes characters used to draw the table border.

```js
let config,
    data,
    output;

data = [
    ['0A', '0B', '0C'],
    ['1A', '1B', '1C'],
    ['2A', '2B', '2C']
];

config = {
    border: {
        topBody: `─`,
        topJoin: `┬`,
        topLeft: `┌`,
        topRight: `┐`,

        bottomBody: `─`,
        bottomJoin: `┴`,
        bottomLeft: `└`,
        bottomRight: `┘`,

        bodyLeft: `│`,
        bodyRight: `│`,
        bodyJoin: `│`,

        joinBody: `─`,
        joinLeft: `├`,
        joinRight: `┤`,
        joinJoin: `┼`
    }
};

output = table(data, config);

console.log(output);
```

```
┌────┬────┬────┐
│ 0A │ 0B │ 0C │
├────┼────┼────┤
│ 1A │ 1B │ 1C │
├────┼────┼────┤
│ 2A │ 2B │ 2C │
└────┴────┴────┘
```
