### getBorderCharacters

**Parameter:**
 - **_template_**
   - Type: `'honeywell' | 'norc' | 'ramac' | 'void'`
   - Required: `true`

You can load one of the predefined border templates using `getBorderCharacters` function.

```js
import { table, getBorderCharacters } from 'table';

const data = [
  ['0A', '0B', '0C'],
  ['1A', '1B', '1C'],
  ['2A', '2B', '2C']
];

const config = {
  border: getBorderCharacters(`name of the template`)
};

console.log(table(data, config));
```

```
# honeywell

╔════╤════╤════╗
║ 0A │ 0B │ 0C ║
╟────┼────┼────╢
║ 1A │ 1B │ 1C ║
╟────┼────┼────╢
║ 2A │ 2B │ 2C ║
╚════╧════╧════╝

# norc

┌────┬────┬────┐
│ 0A │ 0B │ 0C │
├────┼────┼────┤
│ 1A │ 1B │ 1C │
├────┼────┼────┤
│ 2A │ 2B │ 2C │
└────┴────┴────┘

# ramac (ASCII; for use in terminals that do not support Unicode characters)

+----+----+----+
| 0A | 0B | 0C |
|----|----|----|
| 1A | 1B | 1C |
|----|----|----|
| 2A | 2B | 2C |
+----+----+----+

# void (no borders; see "bordless table" section of the documentation)

 0A  0B  0C

 1A  1B  1C

 2A  2B  2C

```

Raise [an issue](https://github.com/gajus/table/issues) if you'd like to contribute a new border template.

#### Borderless Table

Simply using "void" border character template creates a table with a lot of unnecessary spacing.

To create a more pleasant to the eye table, reset the padding and remove the joining rows, e.g.

```js

const output = table(data, {
    border: getBorderCharacters('void'),
    columnDefault: {
        paddingLeft: 0,
        paddingRight: 1
    },
    drawHorizontalLine: () => false
    }
);

console.log(output);
```

```
0A 0B 0C
1A 1B 1C
2A 2B 2C
```
