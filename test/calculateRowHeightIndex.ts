/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import calculateRowHeightIndex from '../src/calculateRowHeightIndex';
import makeConfig from '../src/makeConfig';

describe('calculateRowHeightIndex', () => {
  context('invalid column width', () => {
    it('throws an TypeError', () => {
      expect(() => {
        return calculateRowHeightIndex([['a']], {
          columns: {
            0: {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              width: '3',
            },
          },
        });
      }).to.be.throw(TypeError, 'column[index].width must be a number.');
    });
  });

  context('single column', () => {
    context('cell content width is lesser than column width', () => {
      it('is equal to 1', () => {
        const data = [['aaa']];

        const config = makeConfig(data, {
          columns: {
            0: {
              width: 10,
              wrapWord: false,
            },
          },
        });

        const rowSpanIndex = calculateRowHeightIndex(data, config);

        expect(rowSpanIndex[0]).to.equal(1);
      });
    });
    context('cell content width is twice the size of the column width', () => {
      it('is equal to 2', () => {
        const data = [['aaabbb']];

        const config = makeConfig(data, {
          columns: {
            0: {
              width: 3,
              wrapWord: false,
            },
          },
        });

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

        const config = makeConfig(data, {
          columns: {
            0: {
              width: 2,
              wrapWord: false,
            },
          },
        });

        const rowSpanIndex = calculateRowHeightIndex(data, config);

        expect(rowSpanIndex[0]).to.equal(3);
      });
    });
  });
});
