import {
  expect,
} from 'chai';
import {
  sliceAnsi, stringWidth, stripAnsi,
} from '../src/utils';
import {
  closeRed, hyperlink, openRed,
} from './utils';

const stringTerminator = '\u001B\\';

describe('terminal hyperlinks', () => {
  describe('stringWidth', () => {
    it('measures the text of a hyperlink', () => {
      expect(stringWidth(hyperlink('foo'))).to.equal(3);
    });

    it('measures the text whatever the URI and terminator', () => {
      expect(stringWidth(hyperlink('foo', 'https://en.wikipedia.org/wiki/Foo_(bar)'))).to.equal(3);
      expect(stringWidth(hyperlink('foo', 'https://example.com/?q=a+b'))).to.equal(3);
      expect(stringWidth(hyperlink('foo', 'https://example.com', stringTerminator))).to.equal(3);
      expect(stringWidth('\u009D8;;https://example.com\u009Cfoo\u009D8;;\u009C')).to.equal(3);
    });
  });

  describe('stripAnsi', () => {
    it('removes hyperlinks and colours', () => {
      expect(stripAnsi(hyperlink(`${openRed}foo${closeRed}`, 'https://en.wikipedia.org/wiki/Foo_(bar)'))).to.equal('foo');
    });
  });

  describe('sliceAnsi', () => {
    it('wraps each part of a hyperlink in its own sequences', () => {
      const input = `see ${hyperlink('abcdef')} now`;

      expect(sliceAnsi(input, 0, 6)).to.equal(`see ${hyperlink('ab')}`);
      expect(sliceAnsi(input, 6, 8)).to.equal(hyperlink('cd'));
      expect(sliceAnsi(input, 8)).to.equal(`${hyperlink('ef')} now`);
    });

    it('keeps the terminator of the hyperlink', () => {
      expect(sliceAnsi(hyperlink('abcd', 'https://example.com', stringTerminator), 1, 3)).to.equal(hyperlink('bc', 'https://example.com', stringTerminator));
    });

    it('keeps colours inside a hyperlink', () => {
      expect(sliceAnsi(hyperlink(`${openRed}abcd${closeRed}`), 1, 3)).to.equal(hyperlink(`${openRed}bc${closeRed}`));
    });

    it('drops closing sequences that do not end a hyperlink', () => {
      expect(sliceAnsi('ab\u001B]8;;\u0007cd', 1, 3)).to.equal('bc');
    });

    it('slices text that only resembles a hyperlink as plain text', () => {
      expect(sliceAnsi('a]8;b', 1, 3)).to.equal(']8');
    });
  });
});
