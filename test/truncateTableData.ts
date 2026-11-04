/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import {
  truncateTableData,
} from '../src/truncateTableData';
import {
  closeBold, closeRed, openBold, openRed, stringToRed,
} from './utils';

describe('truncateTableData', () => {
  context('when no given userConfig', () => {
    it('not truncate at all', () => {
      const rows = [['a'.repeat(100)]];

      expect(truncateTableData(rows, [Number.POSITIVE_INFINITY])).to.deep.equal([['a'.repeat(100)]]);
    });
  });

  context('when given truncate value in columnDefault', () => {
    context('when no given column-specific truncate', () => {
      it('uses the columnDefault value', () => {
        const rows = [['a'.repeat(100)]];

        expect(truncateTableData(rows, [20])).to.deep.equal([['a'.repeat(19) + '…']]);
      });
    });
  });

  context('when given multiple rows and columns', () => {
    it('uses corresponding column-specific truncate values or fallback to the default truncate value', () => {
      const rows = [['a'.repeat(100), 'b'.repeat(100)], ['c'.repeat(100), 'd'.repeat(100)]];

      expect(truncateTableData(rows, [30, 20])).to.deep.equal([
        ['a'.repeat(29) + '…', 'b'.repeat(19) + '…'],
        ['c'.repeat(29) + '…', 'd'.repeat(19) + '…']]);
    });
  });

  context('when given text with ANSI escape codes', () => {
    it('closes the escape codes that it cuts through (#220)', () => {
      expect(truncateTableData([[stringToRed('a'.repeat(10))]], [5])).to.deep.equal([[`${openRed}aaaa${closeRed}…`]]);
      expect(truncateTableData([[`${openBold}${openRed}abcdef${closeRed}${closeBold}`]], [4])).to.deep.equal([[`${openBold}${openRed}abc${closeRed}${closeBold}…`]]);
    });

    it('does not count the escape codes towards the length', () => {
      expect(truncateTableData([[stringToRed('aaaaa')]], [5])).to.deep.equal([[stringToRed('aaaaa')]]);
    });

    it('counts wide characters and emoji as single characters', () => {
      expect(truncateTableData([[stringToRed('你好世界')]], [3])).to.deep.equal([[`${openRed}你好${closeRed}…`]]);
      expect(truncateTableData([[stringToRed('🧪🧪🧪')]], [2])).to.deep.equal([[`${openRed}🧪${closeRed}…`]]);
    });
  });

  context('when given characters made of several code points', () => {
    it('counts each displayed character once', () => {
      const scotland = '\u{1F3F4}\u{E0067}\u{E0062}\u{E0073}\u{E0063}\u{E0074}\u{E007F}';

      expect(truncateTableData([['कि'.repeat(3)]], [2])).to.deep.equal([['कि…']]);
      expect(truncateTableData([[scotland.repeat(3)]], [2])).to.deep.equal([[`${scotland}…`]]);
    });
  });

  context('edge cases', () => {
    context('truncate = 0', () => {
      it('returns ellipsis only', () => {
        const rows = [['a'.repeat(100)]];
        expect(truncateTableData(rows, [0])).to.deep.equal([['…']]);
      });
    });

    context('truncate = 1', () => {
      it('returns ellipsis only', () => {
        const rows = [['a'.repeat(100)]];
        expect(truncateTableData(rows, [1])).to.deep.equal([['…']]);
      });
    });

    context('truncate = 2', () => {
      it('returns 2-length string with ellipsis', () => {
        const rows = [['a'.repeat(100)]];
        expect(truncateTableData(rows, [2])).to.deep.equal([['a…']]);
      });
    });

    context('empty string', () => {
      it('returns empty string', () => {
        const rows = [['']];
        expect(truncateTableData(rows, [100])).to.deep.equal([['']]);
      });
    });
  });
});
