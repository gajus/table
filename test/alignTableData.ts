import {
  expect,
} from 'chai';
import chalk from 'chalk';
import {
  alignTableData,
} from '../src/alignTableData';
import {
  makeTableConfig,
} from '../src/makeTableConfig';

describe('alignTableData', () => {
  context('when the string width is equal to column width config', () => {
    it('returns the unchange string', () => {
      const rows = [['aaa'], [chalk.red('bbb')]];

      expect(alignTableData(rows, makeTableConfig(rows, {
        columns: {
          0: {
            width: 3,
          },
        },
      }))).to.deep.equal(rows);
    });
  });

  context('when the string is different from the column width config', () => {
    it('aligns cells with column width and alignment config', () => {
      const rows = [['a', 'b', 'c'],
        [chalk.red('a'), chalk.red('b'), chalk.red('c')]];

      expect(alignTableData(rows, makeTableConfig(rows, {
        columnDefault: {
          width: 3,
        },
        columns: {
          0: {
            alignment: 'left',
          },
          1: {
            alignment: 'right',
          },
          2: {
            alignment: 'center',
          },
        },
      }))).to.deep.equal([['a  ', '  b', ' c '], [
        chalk.red('a') + '  ', '  ' + chalk.red('b'), ' ' + chalk.red('c') + ' ',
      ]]);
    });
  });

  context('when the string is longer then column width', () => {
    it('throws an error', () => {
      const rows = [['aaaa']];

      expect(() => {
        alignTableData(rows, makeTableConfig(rows, {
          columns: {
            0: {
              width: 3,
            },
          },
        }));
      }).to.throw(Error, 'Subject parameter value width cannot be greater than the container width.');
    });
  });
});
