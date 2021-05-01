##### config.header

Type: `object`

Header configuration.

The header configuration inherits the most of the column's, except:
- `content` **{string}**: the header content.
- `width:` calculate based on the content width automatically.
- `alignment:` `center` be default.
- `config.border.topJoin` will be `config.border.topBody` for more prettier.

```js
const data = [
      ['0A', '0B', '0C'],
      ['1A', '1B', '1C'],
      ['2A', '2B', '2C'],
    ];

const config = {
  columnDefault: {
    width: 10,
  },
  header: {
    alignment: 'center',
    content: 'THE HEADER\nThis is the table about something',
  },
}

console.log(table(data, config));
```

```
╔══════════════════════════════════════╗
║              THE HEADER              ║
║  This is the table about something   ║
╟────────────┬────────────┬────────────╢
║ 0A         │ 0B         │ 0C         ║
╟────────────┼────────────┼────────────╢
║ 1A         │ 1B         │ 1C         ║
╟────────────┼────────────┼────────────╢
║ 2A         │ 2B         │ 2C         ║
╚════════════╧════════════╧════════════╝
```
