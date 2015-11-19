import table from './../../../src';

import expectTable from './expectTable';

describe('README.md usage/', () => {
    it('basic', () => {
        let data,
            output;

        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];

        output = table(data);

        // console.log(output);

        /* eslint-disable no-restricted-syntax */
        expectTable(output, `
╔════╤════╤════╗
║ 0A │ 0B │ 0C ║
╟────┼────┼────╢
║ 1A │ 1B │ 1C ║
╟────┼────┼────╢
║ 2A │ 2B │ 2C ║
╚════╧════╧════╝
        `);
        /* eslint-enable no-restricted-syntax */
    });
});
