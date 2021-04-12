/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import makeConfig from '../src/makeConfig';
import padTableData from '../src/padTableData';

describe('padTableData', () => {
  context('when no given userConfig', () => {
    it('inserts 01 whitespace character regardless of string whitespaces', () => {
      const rows = [[' a  ']];

      expect(padTableData(rows, makeConfig(rows, undefined))).to.deep.equal([['  a   ']]);
    });
  });

  context('when given paddings in columnDefault', () => {
    context('when no given column-specific paddings', () => {
      it('uses the columnDefault values', () => {
        const rows = [['a']];

        expect(padTableData(rows, makeConfig(rows, {columnDefault: {
          paddingLeft: 2,
          paddingRight: 3,
        }}))).to.deep.equal([['  a   ']]);
      });
    });

    context('when given column-specific padding values', () => {
      it('uses column-specific padding values', () => {
        const rows = [['a']];

        expect(padTableData(rows, makeConfig(rows, {
          columnDefault: {
            paddingLeft: 2,
            paddingRight: 3,
          },
          columns: {
            0: {
              paddingLeft: 4,
              paddingRight: 5,
            },
          },
        }))).to.deep.equal([['    a     ']]);
      });
    });
  });

  context('when given multiple rows and columns', () => {
    it('uses corresponding column-specific padding values or fallback to the default padding values', () => {
      const rows = [['a', 'b'], ['c', 'd']];

      expect(padTableData(rows, makeConfig(rows, {
        columnDefault: {
          paddingLeft: 2,
          paddingRight: 3,
        },
        columns: {
          0: {
            paddingLeft: 4,
          },
          1: {
            paddingRight: 5,
          },
        },
      }))).to.deep.equal([['    a   ', '  b     '], ['    c   ', '  d     ']]);
    });
  });
});
