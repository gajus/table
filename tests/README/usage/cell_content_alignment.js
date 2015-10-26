import table from './../../../src';

import expectTable from './expectTable';

describe('README.md usage/', () => {
    it('cell_content_alignment', () => {
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
                0: {
                    alignment: 'left',
                    width: 10
                },
                1: {
                    alignment: 'center',
                    width: 10
                },
                2: {
                    alignment: 'right',
                    width: 10
                }
            }
        };

        output = table(data, config);

        // console.log(output);

        expectTable(output, `
╔════════════╤════════════╤════════════╗
║ 0A         │     0B     │         0C ║
╟────────────┼────────────┼────────────╢
║ 1A         │     1B     │         1C ║
╟────────────┼────────────┼────────────╢
║ 2A         │     2B     │         2C ║
╚════════════╧════════════╧════════════╝
        `);
    });
});
