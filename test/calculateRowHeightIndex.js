/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import calculateRowHeightIndex from '../src/calculateRowHeightIndex';

describe('calculateRowHeightIndex', () => {
  context('invalid column width', () => {
    it('throws an TypeError', () => {
      expect(() => {
        return calculateRowHeightIndex([['a']], {
          columns: {
            0: {
              width: '3',
            },
          },
        });
      }).to.be.throw(TypeError, 'column[index].width must be a number.');
    });
  });

  context('invalid column wrapWord', () => {
    it('throws an TypeError', () => {
      expect(() => {
        return calculateRowHeightIndex([['a']], {
          columns: {
            0: {
              width: 3,
              wrapWord: 'true',
            },
          },
        });
      }).to.be.throw(TypeError, 'column[index].wrapWord must be a boolean.');
    });
  });

  context('single column', () => {
    context('cell content width is lesser than column width', () => {
      it('is equal to 1', () => {
        const data = [['aaa']];

        const config = {
          columns: {
            0: {
              width: 10,
              wrapWord: false,
            },
          },
        };

        const rowSpanIndex = calculateRowHeightIndex(data, config);

        expect(rowSpanIndex[0]).to.equal(1);
      });
    });
    context('cell content width is twice the size of the column width', () => {
      it('is equal to 2', () => {
        const data = [['aaabbb']];

        const config = {
          columns: {
            0: {
              width: 3,
              wrapWord: false,
            },
          },
        };

        const rowSpanIndex = calculateRowHeightIndex(data, config);

        expect(rowSpanIndex[0]).to.equal(2);
      });
    });
  });
  context('multiple columns', () => {
    context('multiple cell content width is greater than the column width', () => {
      it('uses the largest height', () => {
        const data = [
          ['aaabbb'],
          ['aaabbb'],
        ];

        const config = {
          columns: {
            0: {
              width: 2,
              wrapWord: false,
            },
          },
        };

        const rowSpanIndex = calculateRowHeightIndex(data, config);

        expect(rowSpanIndex[0]).to.equal(3);
      });
    });
  });
});
