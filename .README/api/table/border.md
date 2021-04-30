##### config.border

**Type:** `{ [type: string]: string }`

**Default:** `honeywell` [template](#table-api-getbordercharacters-template)

Custom borders. The keys are any of:
- `topLeft`, `topRight`, `topBody`,`topJoin`
- `bottomLeft`, `bottomRight`, `bottomBody`, `bottomJoin`
- `joinLeft`, `joinRight`, `joinBody`, `joinJoin`
- `bodyLeft`, `bodyRight`, `bodyJoin`

```js
const data = [
  ['0A', '0B', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C']
];

const config = {
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

console.log(table(data, config));
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