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

    it(`usage/draw_join`, () => {
        let data,
            output,
            options;

        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C'],
            ['3A', '3B', '3C'],
            ['4A', '4B', '4C']
        ];

        options = {
            /**
             * Used to dynamically tell table whether to draw a line separating rows or not.
             * The default behavior is to always return true.
             *
             * @typedef {function} drawJoin
             * @param {number} index
             * @param {number} size
             * @return {boolean}
             */
            drawJoin: (index, size) => {
                // This implementation draws a separating line only after the first row
                // and before the last row.
                if (index === 1 || index === size - 1) {
                    return true;
                }
            }
        };

        output = table(data, options);

        // console.log(output);

        expectTable(output, `
╔════╤════╤════╗
║ 0A │ 0B │ 0C ║
╟────┼────┼────╢
║ 1A │ 1B │ 1C ║
║ 2A │ 2B │ 2C ║
║ 3A │ 3B │ 3C ║
╟────┼────┼────╢
║ 4A │ 4B │ 4C ║
╚════╧════╧════╝
        `);
    });
});
