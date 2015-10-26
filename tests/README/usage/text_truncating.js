import table from './../../../src';

import expectTable from './expectTable';

describe('README.md usage/', () => {
    it('text_truncating', () => {
        let config,
            data,
            output;

        data = [
            ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra.']
        ];

        config = {
            columns: {
                0: {
                    width: 20,
                    truncate: 100
                }
            }
        };

        output = table(data, config);

        // console.log(output);

        expectTable(output, `
╔══════════════════════╗
║ Lorem ipsum dolor si ║
║ t amet, consectetur  ║
║ adipiscing elit. Pha ║
║ sellus pulvinar nibh ║
║ sed mauris conva...  ║
╚══════════════════════╝
        `);
    });
});
