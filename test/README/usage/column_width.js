import table from './../../../src';

import expectTable from './expectTable';

describe('README.md usage/', () => {
    it('column_width', () => {
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

        /* eslint-disable no-restricted-syntax */
        expectTable(output, `
╔════╤════════════╤════╗
║ 0A │ 0B         │ 0C ║
╟────┼────────────┼────╢
║ 1A │ 1B         │ 1C ║
╟────┼────────────┼────╢
║ 2A │ 2B         │ 2C ║
╚════╧════════════╧════╝
        `);
        /* eslint-enable no-restricted-syntax */
    });
});
