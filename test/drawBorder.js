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

const drawVerticalLine = () => {
  return true;
};

describe('drawBorder', () => {
  it('draws a border using parts', () => {
    const parts = {
      left: '╔',
      right: '╗',
      body: '═',
      join: '╤',
    };

    expect(drawBorder([1], parts, drawVerticalLine)).to.equal('╔═╗\n');
    expect(drawBorder([1, 1], parts, drawVerticalLine)).to.equal('╔═╤═╗\n');
    expect(drawBorder([5, 10], parts, drawVerticalLine)).to.equal('╔═════╤══════════╗\n');
  });
});

describe('drawBorderTop', () => {
  it('draws a border using parts', () => {
    const parts = {
      topLeft: '╔',
      topRight: '╗',
      topBody: '═',
      topJoin: '╤',
    };

    expect(drawBorderTop([1], parts, drawVerticalLine)).to.equal('╔═╗\n');
    expect(drawBorderTop([1, 1], parts, drawVerticalLine)).to.equal('╔═╤═╗\n');
    expect(drawBorderTop([5, 10], parts, drawVerticalLine)).to.equal('╔═════╤══════════╗\n');
  });

  it('no leading new line if borderless', () => {
    const parts = {
      topLeft: '',
      topRight: '',
      topBody: '',
      topJoin: '',
    };

    expect(drawBorderTop([1], parts, drawVerticalLine)).to.equal('');
    expect(drawBorderTop([1, 1], parts, drawVerticalLine)).to.equal('');
    expect(drawBorderTop([5, 10], parts, drawVerticalLine)).to.equal('');
  });
});

describe('drawBorderJoin', () => {
  it('draws a border using parts', () => {
    const parts = {
      joinBody: '─',
      joinLeft: '╟',
      joinRight: '╢',
      joinJoin: '┼',
    };

    expect(drawBorderJoin([1], parts, drawVerticalLine)).to.equal('╟─╢\n');
    expect(drawBorderJoin([1, 1], parts, drawVerticalLine)).to.equal('╟─┼─╢\n');
    expect(drawBorderJoin([5, 10], parts, drawVerticalLine)).to.equal('╟─────┼──────────╢\n');
  });
});

describe('drawBorderBottom', () => {
  it('draws a border using parts', () => {
    const parts = {
      bottomBody: '═',
      bottomJoin: '╧',
      bottomLeft: '╚',
      bottomRight: '╝',
    };

    expect(drawBorderBottom([1], parts, drawVerticalLine)).to.equal('╚═╝\n');
    expect(drawBorderBottom([1, 1], parts, drawVerticalLine)).to.equal('╚═╧═╝\n');
    expect(drawBorderBottom([5, 10], parts, drawVerticalLine)).to.equal('╚═════╧══════════╝\n');
  });
});
