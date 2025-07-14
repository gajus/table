/* eslint-disable max-nested-callbacks */

import {
  performance,
} from 'perf_hooks';
import {
  expect,
} from 'chai';
import {
  calculateRowHeights,
} from '../src/calculateRowHeights';
import {
  makeTableConfig,
} from '../src/makeTableConfig';

describe('calculateRowHeights', () => {
  context('single column', () => {
    context('cell content width is lesser than column width', () => {
      it('is equal to 1', () => {
        const data = [['aaa']];

        const config = makeTableConfig(data, {
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

        const config = makeTableConfig(data, {
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

        const config = makeTableConfig(data, {
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
  context('performance', () => {
    it('processes 1000 rows with 100 newlines each in under 100 ms', () => {
      const data = Array.from({length: 1_000}, () => {
        return ['!', '?\n'.repeat(100)];
      });

      const config = makeTableConfig(data, {
        columns: {
          0: {
            width: 10,
            wrapWord: false,
          },
        },
      });

      const startTime = performance.now();
      const rowHeights = calculateRowHeights(data, config);
      const endTime = performance.now();

      const executionTime = endTime - startTime;

      expect(executionTime).to.be.lessThan(50);
      expect(rowHeights).to.have.length(1_000);
      expect(rowHeights[0]).to.equal(101);
    });
  });
});
