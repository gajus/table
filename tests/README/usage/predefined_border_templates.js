import _ from 'lodash';

import table, {
    getBorderCharacters
} from './../../../src';

import expectTable from './expectTable';

describe('README.md usage/predefined_border_templates', () => {
    let data;

    before(() => {
        data = [
            ['0A', '0B', '0C'],
            ['1A', '1B', '1C'],
            ['2A', '2B', '2C']
        ];
    });

    it('honeywell', () => {
        let output;

        output = table(data, {
            border: getBorderCharacters('honeywell')
        });

        // console.log(output);

        expectTable(output, `
╔════╤════╤════╗
║ 0A │ 0B │ 0C ║
╟────┼────┼────╢
║ 1A │ 1B │ 1C ║
╟────┼────┼────╢
║ 2A │ 2B │ 2C ║
╚════╧════╧════╝
        `);
    });

    it('norc', () => {
        let output;

        output = table(data, {
            border: getBorderCharacters('norc')
        });

        // console.log(output);

        expectTable(output, `
┌────┬────┬────┐
│ 0A │ 0B │ 0C │
├────┼────┼────┤
│ 1A │ 1B │ 1C │
├────┼────┼────┤
│ 2A │ 2B │ 2C │
└────┴────┴────┘
        `);
    });

    it('ramac', () => {
        let output;

        output = table(data, {
            border: getBorderCharacters('ramac')
        });

        // console.log(output);

        expectTable(output, `
+----+----+----+
| 0A | 0B | 0C |
|----|----|----|
| 1A | 1B | 1C |
|----|----|----|
| 2A | 2B | 2C |
+----+----+----+
        `);
    });

    it('void', () => {
        let output;

        output = table(data, {
            border: getBorderCharacters('void')
        });

        // console.log(output);

        expectTable(_.trim(output) + '\n', '0A  0B  0C \n\n 1A  1B  1C \n\n 2A  2B  2C');
    });

    it('borderless', () => {
        let output;

        output = table(data, {
            border: getBorderCharacters('void'),
            columnDefault: {
                paddingLeft: 0,
                paddingRight: 1
            },
            drawHorizontalLine: () => {
                return false;
            }
        });

        // console.log(output);

        expectTable(_.trim(output) + '\n', '0A 0B 0C \n1A 1B 1C \n2A 2B 2C');
    });
});
