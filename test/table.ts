import {
  expect,
} from 'chai';
import {
  table,
} from '../src';
import type {
  TableUserConfig,
} from '../src';
import {
  expectTable,
} from './utils';

const data = [
  ['Lorem ipsum', 'dolor sit'],
  ['amet', 'consectetur'],
  ['adipiscing', 'elit'],
];

const basicConfig: TableUserConfig = {
  columnDefault: {
    width: 5,
  },
};

describe('drawTable', () => {
  describe('drawHorizontalLine', () => {
    context('only draw top and bottom borders', () => {
      it('draws proper borders', () => {
        const config: TableUserConfig = {
          ...basicConfig,
          drawHorizontalLine: (index, size) => {
            return index === 0 || index === size;
          },
        };

        expect(table(data, config)).to.be.deep.equal(`
╔═══════╤═══════╗
║ Lorem │ dolor ║
║ ipsum │ sit   ║
║ amet  │ conse ║
║       │ ctetu ║
║       │ r     ║
║ adipi │ elit  ║
║ scing │       ║
╚═══════╧═══════╝
`.trimStart());
      });
    });

    context('only draw inner borders', () => {
      it('draws proper borders', () => {
        const config: TableUserConfig = {
          ...basicConfig,
          drawHorizontalLine: (index, size) => {
            return index > 0 && index < size;
          },
        };

        expect(table(data, config)).to.be.deep.equal(`
║ Lorem │ dolor ║
║ ipsum │ sit   ║
╟───────┼───────╢
║ amet  │ conse ║
║       │ ctetu ║
║       │ r     ║
╟───────┼───────╢
║ adipi │ elit  ║
║ scing │       ║
`.trimStart());
      });
    });

    context('only draw top and next-to-last borders', () => {
      it('draws proper borders', () => {
        const config: TableUserConfig = {
          ...basicConfig,
          drawHorizontalLine: (index, size) => {
            return index === 0 || index === size - 1;
          },
        };

        expect(table(data, config)).to.be.deep.equal(`
╔═══════╤═══════╗
║ Lorem │ dolor ║
║ ipsum │ sit   ║
║ amet  │ conse ║
║       │ ctetu ║
║       │ r     ║
╟───────┼───────╢
║ adipi │ elit  ║
║ scing │       ║
`.trimStart());
      });
    });
  });

  context('header', () => {
    it('draw properly', () => {
      const config: TableUserConfig = {
        ...basicConfig,
        header: {
          content: 'This is the long long header',
        },
      };

      expect(table(data, config)).to.be.deep.equal(`
╔═══════════════╗
║ This is the l ║
║ ong long head ║
║      er       ║
╟───────┬───────╢
║ Lorem │ dolor ║
║ ipsum │ sit   ║
╟───────┼───────╢
║ amet  │ conse ║
║       │ ctetu ║
║       │ r     ║
╟───────┼───────╢
║ adipi │ elit  ║
║ scing │       ║
╚═══════╧═══════╝
`.trimStart());
    });
  });

  context('vertical alignment', () => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const data = [
      ['Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        'Phasellus pulvinar nibh sed',
        'Phasellus pulvinar nibh sed',
        'Phasellus pulvinar nibh sed'],
    ];
    it('works properly', () => {
      const result = table(data, {
        columnDefault: {
          width: 10,
        },
        columns: [
          {},
          {verticalAlignment: 'top'},
          {verticalAlignment: 'middle'},
          {verticalAlignment: 'bottom'},
        ],
      });

      expectTable(result, `
╔════════════╤════════════╤════════════╤════════════╗
║ Lorem ipsu │ Phasellus  │            │            ║
║ m dolor si │ pulvinar n │ Phasellus  │            ║
║ t amet, co │ ibh sed    │ pulvinar n │            ║
║ nsectetur  │            │ ibh sed    │ Phasellus  ║
║ adipiscing │            │            │ pulvinar n ║
║ elit       │            │            │ ibh sed    ║
╚════════════╧════════════╧════════════╧════════════╝`);
    });

    it('works with horizontal alignment', () => {
      const result = table(data, {
        columnDefault: {
          width: 8,
          wrapWord: true,
        },
        columns: [
          {},
          {alignment: 'center',
            verticalAlignment: 'top'},
          {alignment: 'right',
            verticalAlignment: 'middle'},
          {alignment: 'left',
            verticalAlignment: 'bottom'},
        ],
      });

      expectTable(result, `
╔══════════╤══════════╤══════════╤══════════╗
║ Lorem    │ Phasellu │          │          ║
║ ipsum    │    s     │          │          ║
║ dolor    │ pulvinar │ Phasellu │          ║
║ sit      │ nibh sed │        s │          ║
║ amet,    │          │ pulvinar │          ║
║ consecte │          │ nibh sed │ Phasellu ║
║ tur      │          │          │ s        ║
║ adipisci │          │          │ pulvinar ║
║ ng elit  │          │          │ nibh sed ║
╚══════════╧══════════╧══════════╧══════════╝`);
    });
  });
});
