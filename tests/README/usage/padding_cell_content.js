import table from './../../../src';

import expectTable from './expectTable';

describe('README.md usage/', () => {
    it('usage/padding_cell_content', () => {
        let config,
            data,
            output;

        data = [
            ['0A', 'AABBCC', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        config = {
            columns: {
                0: {
                    paddingLeft: 3
                },
                1: {
                    width: 2,
                    paddingRight: 3
                }
            }
        };

        output = table(data, config);

        // console.log(output);

        expectTable(output, `
╔══════╤══════╤════╗
║   0A │ AA   │ 0C ║
║      │ BB   │    ║
║      │ CC   │    ║
╟──────┼──────┼────╢
║   1A │ 1B   │ 1C ║
╟──────┼──────┼────╢
║   2A │ 2B   │ 2C ║
╚══════╧══════╧════╝
        `);
    });
});
