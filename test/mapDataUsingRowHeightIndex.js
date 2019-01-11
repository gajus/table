import {
  expect
} from 'chai';
import chalk from 'chalk';
import mapDataUsingRowHeightIndex from '../src/mapDataUsingRowHeightIndex';

describe('mapDataUsingRowHeightIndex', () => {
  context('no data spans multiple rows', () => {
    it('maps data to a single cell', () => {
      const config = {
        columns: {
          0: {
            width: 2
          }
        }
      };

      const rowSpanIndex = [
        1
      ];

      const data = [
        [
          'aa'
        ]
      ];

      const mappedData = mapDataUsingRowHeightIndex(data, rowSpanIndex, config);

      expect(mappedData).to.deep.equal([
        [
          'aa'
        ]
      ]);
    });
  });

  context('single cell spans multiple rows', () => {
    it('maps data to multiple rows', () => {
      const config = {
        columns: {
          0: {
            width: 2
          }
        }
      };

      const rowSpanIndex = [
        5
      ];

      const data = [
        [
          'aabbccddee'
        ]
      ];

      const mappedData = mapDataUsingRowHeightIndex(data, rowSpanIndex, config);

      expect(mappedData).to.deep.equal([
        ['aa'],
        ['bb'],
        ['cc'],
        ['dd'],
        ['ee']
      ]);
    });
  });

  context('single cell contains newlines', () => {
    it('maps data to multiple rows', () => {
      const config = {
        columns: {
          0: {
            width: 100
          }
        }
      };

      const rowSpanIndex = [
        5
      ];

      const data = [
        [
          'aa\nbb\ncc\ndd\nee'
        ]
      ];

      const mappedData = mapDataUsingRowHeightIndex(data, rowSpanIndex, config);

      expect(mappedData).to.deep.equal([
        ['aa'],
        ['bb'],
        ['cc'],
        ['dd'],
        ['ee']
      ]);
    });

    it('maps data with color coding to multiple rows', () => {
      const config = {
        columns: {
          0: {
            width: 100
          }
        }
      };

      const rowSpanIndex = [
        5
      ];

      const data = [
        [
          chalk.red('aa\nbb\ncc\ndd\nee')
        ]
      ];

      const mappedData = mapDataUsingRowHeightIndex(data, rowSpanIndex, config);

      expect(mappedData).to.deep.equal([
        [chalk.red('aa')],
        [chalk.red('bb')],
        [chalk.red('cc')],
        [chalk.red('dd')],
        [chalk.red('ee')]
      ]);
    });
  });

  context('multiple cells spans multiple rows', () => {
    it('maps data to multiple rows', () => {
      const config = {
        columns: {
          0: {
            width: 2
          },
          1: {
            width: 4
          }
        }
      };

      const rowSpanIndex = [
        5
      ];

      const data = [
        [
          'aabbccddee',
          '00001111'
        ]
      ];

      const mappedData = mapDataUsingRowHeightIndex(data, rowSpanIndex, config);

      expect(mappedData).to.deep.equal([
        [
          'aa',
          '0000'
        ],
        [
          'bb',
          '1111'
        ],
        [
          'cc',
          ''
        ],
        [
          'dd',
          ''
        ],
        [
          'ee',
          ''
        ]
      ]);
    });
  });
});
