/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import makeConfig from '../src/makeConfig';
import truncateTableData from '../src/truncateTableData';

describe('truncateTableData', () => {
  context('when no given userConfig', () => {
    it('not truncate at all', () => {
      const rows = [['a'.repeat(100)]];

      expect(truncateTableData(rows, makeConfig(rows, undefined))).to.deep.equal([['a'.repeat(100)]]);
    });
  });

  context('when given truncate value in columnDefault', () => {
    context('when no given column-specific truncate', () => {
      it('uses the columnDefault value', () => {
        const rows = [['a'.repeat(100)]];

        expect(truncateTableData(rows, makeConfig(rows, {columnDefault: {
          truncate: 20,
        }}))).to.deep.equal([['a'.repeat(17) + '...']]);
      });
    });

    context('when given column-specific truncate value', () => {
      it('uses column-specific truncate value', () => {
        const rows = [['a'.repeat(100)]];

        expect(truncateTableData(rows, makeConfig(rows, {
          columnDefault: {
            truncate: 20,
          },
          columns: {
            0: {
              truncate: 30,
            },
          },
        }))).to.deep.equal([['a'.repeat(27) + '...']]);
      });
    });
  });

  context('when given multiple rows and columns', () => {
    it('uses corresponding column-specific truncate values or fallback to the default truncate value', () => {
      const rows = [['a'.repeat(100), 'b'.repeat(100)], ['c'.repeat(100), 'd'.repeat(100)]];

      expect(truncateTableData(rows, makeConfig(rows, {
        columnDefault: {
          truncate: 20,
        },
        columns: {
          0: {
            truncate: 30,
          },
        },
      }))).to.deep.equal([['a'.repeat(27) + '...', 'b'.repeat(17) + '...'], ['c'.repeat(27) + '...', 'd'.repeat(17) + '...']]);
    });
  });
});
