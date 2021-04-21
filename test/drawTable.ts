/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import makeConfig from '../src/makeConfig';
import table from '../src/table';
import type {
  TableConfig,
} from '../src/types/internal';

const data = [
  ['Lorem ipsum', 'dolor sit'],
  ['amet', 'consectetur'],
  ['adipiscing', 'elit'],
];

const basicConfig = makeConfig(data, {
  columnDefault: {
    width: 5,
  },
});

describe('drawTable', () => {
  describe('drawHorizontalLine', () => {
    context('only draw top and bottom borders', () => {
      it('draws proper borders', () => {
        const config: TableConfig = {
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
`.trimLeft());
      });
    });

    context('only draw inner borders', () => {
      it('draws proper borders', () => {
        const config: TableConfig = {
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
`.trimLeft());
      });
    });

    context('only draw top and next-to-last borders', () => {
      it('draws proper borders', () => {
        const config: TableConfig = {
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
`.trimLeft());
      });
    });
  });
});
