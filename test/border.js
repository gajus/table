import {
    expect
} from 'chai';

import _ from 'lodash';

import table from './../src/table';

import {
    border
} from './../src/';

describe(`border`, () => {
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

    it(`draws expected table (honeywell)`, () => {
        let output;

        output = table(data, {
            border: border(`honeywell`)
        });

        // console.log(output);

        expectTable(output, `
╔══╤══╤══╗
║0A│0B│0C║
╟──┼──┼──╢
║1A│1B│1C║
╟──┼──┼──╢
║2A│2B│2C║
╚══╧══╧══╝
        `);
    });

    it(`draws expected table (norc)`, () => {
        let output;

        output = table(data, {
            border: border(`norc`)
        });

        // console.log(output);

        expectTable(output, `
┌──┬──┬──┐
│0A│0B│0C│
├──┼──┼──┤
│1A│1B│1C│
├──┼──┼──┤
│2A│2B│2C│
└──┴──┴──┘
        `);
    });

});
