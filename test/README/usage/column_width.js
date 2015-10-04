import {
    expect
} from 'chai';

import _ from 'lodash';

import table, {
    getBorderCharacters
} from './../../../src';

describe(`README.md usage/`, () => {
    let expectTable;

    before(() => {
        expectTable = (rows, contents) => {
            expect(rows).to.equal(_.trim(contents) + `\n`);
        };
    });

    it(`usage/column_width`, () => {
        let config,
            data,
            output;

        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        config = {
            columns: {
                1: {
                    width: 10
                }
            }
        };

        output = table(data, config);

        // console.log(output);

        expectTable(output, `
╔════╤════════════╤════╗
║ 0A │ 0B         │ 0C ║
╟────┼────────────┼────╢
║ 1A │ 1B         │ 1C ║
╟────┼────────────┼────╢
║ 2A │ 2B         │ 2C ║
╚════╧════════════╧════╝
        `);
    });
});
