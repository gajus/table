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
        }}))).to.deep.equal([['a'.repeat(19) + '…']]);
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
        }))).to.deep.equal([['a'.repeat(29) + '…']]);
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
      }))).to.deep.equal([
        ['a'.repeat(29) + '…', 'b'.repeat(19) + '…'],
        ['c'.repeat(29) + '…', 'd'.repeat(19) + '…']]);
    });
  });

  context('edge cases', () => {
    context('truncate = 0', () => {
      it('returns ellipsis only', () => {
        const rows = [['a'.repeat(100)]];
        expect(truncateTableData(rows, makeConfig(rows, {
          columns: {0: {truncate: 0}},
        }))).to.deep.equal([['…']]);
      });
    });

    context('truncate = 1', () => {
      it('returns ellipsis only', () => {
        const rows = [['a'.repeat(100)]];
        expect(truncateTableData(rows, makeConfig(rows, {
          columns: {0: {truncate: 1}},

        }))).to.deep.equal([['…']]);
      });
    });

    context('truncate = 2', () => {
      it('returns 2-length string with ellipsis', () => {
        const rows = [['a'.repeat(100)]];
        expect(truncateTableData(rows, makeConfig(rows, {
          columns: {0: {truncate: 2}},
        }))).to.deep.equal([['a…']]);
      });
    });

    context('empty string', () => {
      it('returns empty string', () => {
        const rows = [['']];
        expect(truncateTableData(rows, makeConfig(rows, {
          columns: {0: {truncate: 100}},
        }))).to.deep.equal([['']]);
      });
    });
  });
});
