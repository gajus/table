import {
    expect
} from 'chai';

import _ from 'lodash';

import table from './../src/table';

describe(`table`, () => {
    let expectTable;

    before(() => {
        expectTable = (rows, contents) => {
            expect(rows).to.equal(_.trim(contents) + `\n`);
        };
    });

    it(`draws expected table`, () => {
        let output;

        output = table([
                ['0A', '0B', '0C'],
                ['1A', '1B', '1C'],
                ['2A', '2B', '2C']
        ]);

        console.log(output);

        expectTable(output, `
╔═╗
║a║
╚═╝
        `);

        output = table([
                [`a`, `b`]
        ]);

        expectTable(output, `
╔═╤═╗
║a│b║
╚═╧═╝
        `);

        output = table([
                [`a`, `b`],
                [`0`, `1`]
        ]);

        expectTable(output, `
╔═╤═╗
║a│b║
╟─┼─╢
║0│1║
╚═╧═╝
        `);
    });
});
