/* eslint-disable sort-keys-fix/sort-keys-fix */

import {
  expect,
} from 'chai';
import type {
  DrawVerticalLine,
} from '../src';
import {
  getBorderCharacters,
} from '../src';
import {
  drawBorder,
  drawBorderTop,
  drawBorderJoin,
  drawBorderBottom,
  createTableBorderGetter,
} from '../src/drawBorder';
import {
  makeTableConfig,
} from '../src/makeTableConfig';
import type {
  TableConfig,
} from '../src/types/internal';

const defaultBorderConfig = getBorderCharacters('honeywell');

const defaultDrawVerticalLine: DrawVerticalLine = () => {
  return true;
};

const customDrawVerticalLine: DrawVerticalLine = (index, size) => {
  return index === size - 1;
};

context('drawBorder', () => {
  it('draws a border using parts', () => {
    const config = {
      drawVerticalLine: defaultDrawVerticalLine,
      separator: {
        left: '╔',
        right: '╗',
        body: '═',
        join: '╤',
      },
    };

    expect(drawBorder([1], config)).to.equal('╔═╗\n');
    expect(drawBorder([1, 1], config)).to.equal('╔═╤═╗\n');
    expect(drawBorder([5, 10], config)).to.equal('╔═════╤══════════╗\n');

    expect(drawBorder([5, 10],
      {
        ...config,
        drawVerticalLine: customDrawVerticalLine,
      })).to.equal('═════╤══════════\n');
  });
});

context('drawBorderTop', () => {
  it('draws a border using parts', () => {
    const config: Parameters<typeof drawBorderTop>[1] = {
      border: {
        ...defaultBorderConfig,
        topLeft: '╔',
        topRight: '╗',
        topBody: '═',
        topJoin: '╤',
      },
      drawVerticalLine: defaultDrawVerticalLine,
    };

    expect(drawBorderTop([1], config)).to.equal('╔═╗\n');
    expect(drawBorderTop([1, 1], config)).to.equal('╔═╤═╗\n');
    expect(drawBorderTop([5, 10], config)).to.equal('╔═════╤══════════╗\n');

    expect(drawBorderTop([5, 10],
      {
        ...config,
        drawVerticalLine: customDrawVerticalLine,
      })).to.equal('═════╤══════════\n');
  });

  it('no leading new line if borderless', () => {
    const config = {
      border: {
        ...defaultBorderConfig,
        topLeft: '',
        topRight: '',
        topBody: '',
        topJoin: '',
      },
      drawVerticalLine: defaultDrawVerticalLine,
    };

    expect(drawBorderTop([1], config)).to.equal('');
    expect(drawBorderTop([1, 1], config)).to.equal('');
    expect(drawBorderTop([5, 10], config)).to.equal('');

    expect(drawBorderTop([5, 10],
      {
        ...config,
        drawVerticalLine: customDrawVerticalLine,
      })).to.equal('');
  });
});

context('drawBorderJoin', () => {
  it('draws a border using parts', () => {
    const config = {
      border: {
        ...defaultBorderConfig,
        joinBody: '─',
        joinLeft: '╟',
        joinRight: '╢',
        joinJoin: '┼',
      },
      drawVerticalLine: defaultDrawVerticalLine,
    };

    expect(drawBorderJoin([1], config)).to.equal('╟─╢\n');
    expect(drawBorderJoin([1, 1], config)).to.equal('╟─┼─╢\n');
    expect(drawBorderJoin([5, 10], config)).to.equal('╟─────┼──────────╢\n');

    expect(drawBorderJoin([5, 10],
      {
        ...config,
        drawVerticalLine: customDrawVerticalLine,
      })).to.equal('─────┼──────────\n');
  });
});

context('drawBorderBottom', () => {
  it('draws a border using parts', () => {
    const config = {
      border: {
        ...defaultBorderConfig,
        bottomBody: '═',
        bottomJoin: '╧',
        bottomLeft: '╚',
        bottomRight: '╝',
      },
      drawVerticalLine: defaultDrawVerticalLine,
    };

    expect(drawBorderBottom([1], config)).to.equal('╚═╝\n');
    expect(drawBorderBottom([1, 1], config)).to.equal('╚═╧═╝\n');
    expect(drawBorderBottom([5, 10], config)).to.equal('╚═════╧══════════╝\n');

    expect(drawBorderBottom([5, 10],
      {
        ...config,
        drawVerticalLine: customDrawVerticalLine,
      })).to.equal('═════╧══════════\n');
  });
});

context('tableBorderGetter', () => {
  context('when config.header is undefined', () => {
    it('draw the table border normally', () => {
      const config: TableConfig = makeTableConfig([['a', 'b', 'c']], {
        header: undefined,
      });

      const getter = createTableBorderGetter([2, 1, 3], config);

      expect(getter(0, 3)).to.equal('╔══╤═╤═══╗\n');
      expect(getter(1, 3)).to.equal('╟──┼─┼───╢\n');
      expect(getter(2, 3)).to.equal('╟──┼─┼───╢\n');
      expect(getter(3, 3)).to.equal('╚══╧═╧═══╝\n');
    });
  });
});
