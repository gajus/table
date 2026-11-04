import {
  expect,
} from 'chai';
import {
  calculateSliceLength,
  splitGraphemes,
} from '../src/utils';

describe('splitGraphemes', () => {
  it('measures printable ASCII', () => {
    expect(splitGraphemes('ab')).to.deep.equal([
      {positions: 1,
        value: 'a',
        width: 1},
      {positions: 1,
        value: 'b',
        width: 1},
    ]);
  });

  it('measures emoji and wide characters in columns and slice-ansi positions', () => {
    expect(splitGraphemes('a🧪你👨\u200D👩\u200D👧')).to.deep.equal([
      {positions: 1,
        value: 'a',
        width: 1},
      {positions: 1,
        value: '🧪',
        width: 2},
      {positions: 2,
        value: '你',
        width: 2},
      {positions: 5,
        value: '👨\u200D👩\u200D👧',
        width: 2},
    ]);
  });

  it('returns no graphemes for an empty string', () => {
    expect(splitGraphemes('')).to.deep.equal([]);
  });

  it('measures more distinct graphemes than it caches', () => {
    const text = Array.from({length: 12_000}, (_, index) => {
      return String.fromCodePoint(0x4E_00 + index);
    }).join('');

    const graphemes = splitGraphemes(text);

    expect(graphemes).to.have.length(12_000);
    expect(graphemes.every(({positions, width}) => {
      return positions === 2 && width === 2;
    })).to.equal(true);
  });
});

describe('calculateSliceLength', () => {
  it('fits printable ASCII', () => {
    expect(calculateSliceLength('abcdef', 3)).to.equal(3);
    expect(calculateSliceLength('ab', 5)).to.equal(2);
  });

  it('keeps a combining mark with the character before it', () => {
    expect(calculateSliceLength('abc\u0301d', 3)).to.equal(4);
  });

  it('measures emoji by display width', () => {
    expect(calculateSliceLength('🧪aaaa', 5)).to.equal(4);
  });

  it('includes at least one grapheme', () => {
    expect(calculateSliceLength('🧪', 1)).to.equal(1);
    expect(calculateSliceLength('ab', 0)).to.equal(1);
  });

  it('measures the whole string when the width is unbounded', () => {
    expect(calculateSliceLength('🧪a', Number.POSITIVE_INFINITY)).to.equal(2);
  });

  it('returns zero for an empty string', () => {
    expect(calculateSliceLength('', 3)).to.equal(0);
  });
});
