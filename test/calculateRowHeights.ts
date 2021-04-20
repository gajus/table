/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import {
  calculateRowHeights,
} from '../src/calculateRowHeights';
import {
  makeConfig,
} from '../src/makeConfig';

describe('calculateRowHeights', () => {
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

        const rowHeights = calculateRowHeights(data, config);

        expect(rowHeights[0]).to.equal(1);
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

        const rowHeights = calculateRowHeights(data, config);

        expect(rowHeights[0]).to.equal(2);
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

        const rowHeights = calculateRowHeights(data, config);

        expect(rowHeights[0]).to.equal(3);
      });
    });
  });
});
