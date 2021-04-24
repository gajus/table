import {
  expect,
} from 'chai';
import chalk from 'chalk';
import makeConfig from '../src/makeConfig';
import mapDataUsingRowHeights from '../src/mapDataUsingRowHeights';

describe('mapDataUsingRowHeightIndex', () => {
  context('no data spans multiple rows', () => {
    it('maps data to a single cell', () => {
      const rowSpanIndex = [
        1,
      ];

      const data = [
        [
          'aa',
        ],
      ];

      const config = makeConfig(data, {
        columns: {
          0: {
            width: 2,
          },
        },
      });

      const mappedData = mapDataUsingRowHeights(data, rowSpanIndex, config);

      expect(mappedData).to.deep.equal([
        [
          'aa',
        ],
      ]);
    });
  });

  context('single cell spans multiple rows', () => {
    it('maps data to multiple rows', () => {
      const rowSpanIndex = [
        5,
      ];

      const data = [
        [
          'aabbccddee',
        ],
      ];

      const config = makeConfig(data, {
        columns: {
          0: {
            width: 2,
          },
        },
      });

      const mappedData = mapDataUsingRowHeights(data, rowSpanIndex, config);

      expect(mappedData).to.deep.equal([
        ['aa'],
        ['bb'],
        ['cc'],
        ['dd'],
        ['ee'],
      ]);
    });
  });

  context('single cell contains newlines', () => {
    it('maps data to multiple rows', () => {
      const rowSpanIndex = [
        5,
      ];

      const data = [
        [
          'aa\nbb\ncc\ndd\nee',
        ],
      ];

      const config = makeConfig(data, {
        columns: {
          0: {
            width: 100,
          },
        },
      });

      const mappedData = mapDataUsingRowHeights(data, rowSpanIndex, config);

      expect(mappedData).to.deep.equal([
        ['aa'],
        ['bb'],
        ['cc'],
        ['dd'],
        ['ee'],
      ]);
    });

    it('maps data with color coding to multiple rows', () => {
      const rowSpanIndex = [
        5,
      ];

      const data = [
        [
          chalk.red('aa\nbb\ncc\ndd\nee'),
        ],
      ];

      const config = makeConfig(data, {
        columns: {
          0: {
            width: 100,
          },
        },
      });

      const mappedData = mapDataUsingRowHeights(data, rowSpanIndex, config);

      expect(mappedData).to.deep.equal([
        [chalk.red('aa')],
        [chalk.red('bb')],
        [chalk.red('cc')],
        [chalk.red('dd')],
        [chalk.red('ee')],
      ]);
    });
  });

  context('multiple cells spans multiple rows', () => {
    it('maps data to multiple rows', () => {
      const rowSpanIndex = [
        5,
      ];

      const data = [
        [
          'aabbccddee',
          '00001111',
        ],
      ];

      const config = makeConfig(data, {
        columns: {
          0: {
            width: 2,
          },
          1: {
            width: 4,
          },
        },
      });

      const mappedData = mapDataUsingRowHeights(data, rowSpanIndex, config);

      expect(mappedData).to.deep.equal([
        [
          'aa',
          '0000',
        ],
        [
          'bb',
          '1111',
        ],
        [
          'cc',
          '',
        ],
        [
          'dd',
          '',
        ],
        [
          'ee',
          '',
        ],
      ]);
    });
  });
});
