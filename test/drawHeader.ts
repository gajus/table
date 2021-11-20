import {
  expect,
} from 'chai';
import type {
  TableUserConfig,
} from '../src';
import {
  drawHeader,
} from '../src/drawHeader';
import {
  makeTableConfig,
} from '../src/makeTableConfig';
import type {
  Row,
} from '../src/types/internal';
import {
  closeBold,
  closeRed,
  openBold,
  openRed,
} from './utils';

const basicContent = 'Lorem ipsum dolor sit amet';

const basicRows: Row[] = [['aaa', 'bb', 'c']];

const createHeader = (headerConfig: TableUserConfig['header'], headerWidth = 7): string => {
  const config = makeTableConfig(basicRows, {
    header: headerConfig,
  });

  return drawHeader(headerWidth, config);
};

context('drawHeader', () => {
  context('when no given header', () => {
    it('throws an error', () => {
      const config = makeTableConfig(basicRows, {
        header: undefined,
      });

      expect(() => {
        return drawHeader(7, config);
      }).to.throw('Can not draw header without header configuration');
    });
  });

  context('width', () => {
    it('forces to the given width', () => {
      const header = createHeader({
        content: basicContent,
      });

      expect(header).to.equal(`
║ Lorem i ║
║ psum do ║
║ lor sit ║
║  amet   ║
`.trimStart());
    });
  });

  context('truncate', () => {
    it('truncates to the truncation value', () => {
      const header = createHeader({
        content: basicContent,
        truncate: 7,
      });

      expect(header).to.equal('║ Lorem … ║\n');
    });
  });

  context('wrapWord', () => {
    context('wrapWord = false', () => {
      it('slices to the given width', () => {
        const header = createHeader({
          content: basicContent,
          wrapWord: false,
        });

        expect(header).to.equal(`
║ Lorem i ║
║ psum do ║
║ lor sit ║
║  amet   ║
`.trimStart());
      });
    });

    context('wrapWord = true', () => {
      it('wraps word properly', () => {
        const header = createHeader({
          content: basicContent,
          wrapWord: true,
        });

        expect(header).to.equal(`
║  Lorem  ║
║  ipsum  ║
║  dolor  ║
║   sit   ║
║  amet   ║
`.trimStart());
      });
    });
  });

  context('alignment', () => {
    context('left', () => {
      it('aligns left', () => {
        const header = createHeader({
          alignment: 'left',
          content: basicContent,
          wrapWord: true,
        });

        expect(header).to.equal(`
║ Lorem   ║
║ ipsum   ║
║ dolor   ║
║ sit     ║
║ amet    ║
`.trimStart());
      });
    });

    context('center', () => {
      it('aligns center', () => {
        const header = createHeader({
          alignment: 'center',
          content: basicContent,
          wrapWord: true,
        });

        expect(header).to.equal(`
║  Lorem  ║
║  ipsum  ║
║  dolor  ║
║   sit   ║
║  amet   ║
`.trimStart());
      });
    });

    context('right', () => {
      it('aligns right', () => {
        const header = createHeader({
          alignment: 'right',
          content: basicContent,
          wrapWord: true,
        });

        expect(header).to.equal(`
║   Lorem ║
║   ipsum ║
║   dolor ║
║     sit ║
║    amet ║
`.trimStart());
      });
    });

    context('justify', () => {
      it('aligns justify', () => {
        const header = createHeader({
          alignment: 'justify',
          content: basicContent,
          wrapWord: true,
        }, 12);

        expect(header).to.equal(`
║ Lorem  ipsum ║
║ dolor    sit ║
║ amet         ║
`.trimStart());
      });
    });
  });

  context('padding', () => {
    it('pads properly', () => {
      const header = createHeader({
        content: basicContent,
        paddingLeft: 2,
        paddingRight: 3,
      }, 12);

      expect(header).to.equal(`
║  Lorem ipsum    ║
║  dolor sit am   ║
║       et        ║
`.trimStart());
    });
  });

  context('mixed with ansi word', () => {
    it('works properly', () => {
      const header = createHeader({
        content: `${openBold}This is the header with ${openRed}ansi words${closeRed}${closeBold}`,
        wrapWord: true,
      }, 16);

      expect(header).to.equal(`
║   ${openBold}This is the${closeBold}    ║
║ ${openBold}header with ${openRed}ansi${closeRed}${closeBold} ║
║      ${openBold}${openRed}words${closeBold}${closeRed}       ║
`.trimStart());
    });
  });
});
