import {
    expect
} from 'chai';

import _ from 'lodash';

import table from './../src/table';

describe(`readme`, () => {
    let expectTable;

    before(() => {
        expectTable = (rows, contents) => {
            expect(rows).to.equal(_.trim(contents) + `\n`);
        };
    });

    it(`draws expected table (basic)`, () => {
        let data,
            output;

        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        output = table(data);

        console.log(output);

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

    it(`draws expected table (padding)`, () => {
        let data,
            output,
            options;

        data = [
            ['0A', 'AABBCC', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        options = {
            column: {
                0: {
                    paddingLeft: 3
                },
                1: {
                    maxWidth: 2,
                    paddingRight: 3
                }
            }
        };

        output = table(data, options);

        console.log(output);

        expectTable(output, `
╔═════╤═════╤══╗
║   0A│AA   │0C║
║     │BB   │  ║
║     │CC   │  ║
╟─────┼─────┼──╢
║   1A│1B   │1C║
╟─────┼─────┼──╢
║   2A│2B   │2C║
╚═════╧═════╧══╝
        `);
    });

    it(`draws expected table (alignment)`, () => {
        let data,
            output,
            options;

        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        options = {
            column: {
                0: {
                    alignment: 'left',
                    minWidth: 10
                },
                1: {
                    alignment: 'center',
                    minWidth: 10
                },
                2: {
                    alignment: 'right',
                    minWidth: 10
                }
            }
        };

        output = table(data, options);

        console.log(output);

        expectTable(output, `
╔══════════╤══════════╤══════════╗
║0A        │    0B    │        0C║
╟──────────┼──────────┼──────────╢
║1A        │    1B    │        1C║
╟──────────┼──────────┼──────────╢
║2A        │    2B    │        2C║
╚══════════╧══════════╧══════════╝
        `);
    });

    it(`draws expected table (minWith)`, () => {
        let data,
            output,
            options;

        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        options = {
            column: {
                1: {
                    minWidth: 10
                }
            }
        };

        output = table(data, options);

        console.log(output);

        expectTable(output, `
╔══╤══════════╤══╗
║0A│0B        │0C║
╟──┼──────────┼──╢
║1A│1B        │1C║
╟──┼──────────┼──╢
║2A│2B        │2C║
╚══╧══════════╧══╝
        `);
    });

    it(`draws expected table (maxWith)`, () => {
        let data,
            output,
            options;

        data = [
            ['0A', 'AAABBBCCC', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        options = {
            column: {
                1: {
                    maxWidth: 3
                }
            }
        };

        output = table(data, options);

        console.log(output);

        expectTable(output, `
╔══╤═══╤══╗
║0A│AAA│0C║
║  │BBB│  ║
║  │CCC│  ║
╟──┼───┼──╢
║1A│1B │1C║
╟──┼───┼──╢
║2A│2B │2C║
╚══╧═══╧══╝
        `);
    });

    it(`draws expected table (custom border)`, () => {
        let data,
            output,
            options;

        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        options = {
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

        output = table(data, options);

        console.log(output);

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
