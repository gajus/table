import table from './../../../src';

import expectTable from './expectTable';

describe('README.md usage/', () => {
    it('text_wrapping (no wrap word)', () => {
        let config,
            data,
            output;

        data = [
            ['Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus pulvinar nibh sed mauris convallis dapibus. Nunc venenatis tempus nulla sit amet viverra.']
        ];

        config = {
            columns: {
                0: {
                    width: 20
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
║ sed mauris convallis ║
║ dapibus. Nunc venena ║
║ tis tempus nulla sit ║
║ amet viverra.        ║
╚══════════════════════╝
        `);
    });

    it('text_wrapping (wrap word)', () => {
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
                    wrapWord: true
                }
            }
        };

        output = table(data, config);

        // console.log(output);

        expectTable(output, `
╔══════════════════════╗
║ Lorem ipsum dolor    ║
║ sit amet,            ║
║ consectetur          ║
║ adipiscing elit.     ║
║ Phasellus pulvinar   ║
║ nibh sed mauris      ║
║ convallis dapibus.   ║
║ Nunc venenatis       ║
║ tempus nulla sit     ║
║ amet viverra.        ║
╚══════════════════════╝
        `);
    });
});
