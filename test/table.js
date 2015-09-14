import {
    expect
} from 'chai';

import _ from 'lodash';

import table from './../src/table';

xdescribe(`table`, () => {
    let expectTable;

    before(() => {
        expectTable = (rows, contents) => {
            expect(rows).to.equal(_.trim(contents) + `\n`);
        };
    });

    it(`draws expected table`, () => {
        expectTable(table([
                ['a']
            ]
            ), `
╔═╗
║a║
╚═╝
        `);

        expectTable(table([
                [`a`, `b`]
            ]
            ), `
╔═╤═╗
║a│b║
╚═╧═╝
        `);

        expectTable(table([
                [`a`, `b`],
                [`0`, `1`]
            ]
            ), `
╔═╤═╗
║a│b║
╟─┼─╢
║0│1║
╚═╧═╝
        `);
    });
});
