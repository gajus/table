/* eslint-disable sort-keys-fix/sort-keys-fix */

import {
  expect,
} from 'chai';
import {
  drawBorder,
  drawBorderTop,
  drawBorderJoin,
  drawBorderBottom,
} from '../src/drawBorder';

const defaultDrawVerticalLine = () => {
  return true;
};

const customDrawVerticalLine = (index, size) => {
  return index === size - 1;
};

describe('drawBorder', () => {
  it('draws a border using parts', () => {
    const config = {
      border: {
        left: '╔',
        right: '╗',
        body: '═',
        join: '╤',
      },
      drawVerticalLine: defaultDrawVerticalLine,
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

describe('drawBorderTop', () => {
  it('draws a border using parts', () => {
    const config = {
      border: {
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

describe('drawBorderJoin', () => {
  it('draws a border using parts', () => {
    const config = {
      border: {
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

describe('drawBorderBottom', () => {
  it('draws a border using parts', () => {
    const config = {
      border: {
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
