import {
    expect
} from 'chai';

import _ from 'lodash';

import table, {
    getBorderCharacters
} from './../../../src';

describe(`README.md usage/predefined_border_templates`, () => {
    let data,
        expectTable;

    before(() => {
        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        expectTable = (rows, contents) => {
            expect(rows).to.equal(_.trim(contents) + `\n`);
        };
    });

    it(`honeywell`, () => {
        let output;

        output = table(data, {
            border: getBorderCharacters(`honeywell`)
        });

        // console.log(output);

        expectTable(output, `
╔════╤════╤════╗
║ 0A │ 0B │ 0C ║
╟────┼────┼────╢
║ 1A │ 1B │ 1C ║
╟────┼────┼────╢
║ 2A │ 2B │ 2C ║
╚════╧════╧════╝
        `);
    });

    it(`norc`, () => {
        let output;

        output = table(data, {
            border: getBorderCharacters(`norc`)
        });

        // console.log(output);

        expectTable(output, `
┌────┬────┬────┐
│ 0A │ 0B │ 0C │
├────┼────┼────┤
│ 1A │ 1B │ 1C │
├────┼────┼────┤
│ 2A │ 2B │ 2C │
└────┴────┴────┘
        `);
    });

    it(`ramac`, () => {
        let output;

        output = table(data, {
            border: getBorderCharacters(`ramac`)
        });

        // console.log(output);

        expectTable(output, `
+----+----+----+
| 0A | 0B | 0C |
|----|----|----|
| 1A | 1B | 1C |
|----|----|----|
| 2A | 2B | 2C |
+----+----+----+
        `);
    });
});
