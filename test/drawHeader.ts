/* eslint-disable max-nested-callbacks */

import type {
  TableUserConfig,
} from '../src';
import {
  table,
} from '../src';
import type {
  Row,
} from '../src/types/internal';
import {
  closeBold,
  closeRed,
  expectTable,
  openBold,
  openRed,
} from './utils';

const basicContent = 'Lorem ipsum dolor sit amet';

const basicRows: Row[] = [['aaa', 'bb', 'c']];

const createHeader = (headerConfig?: TableUserConfig['header']): string => {
  return table(basicRows, {header: headerConfig});
};

context('drawHeader', () => {
  context('when no given header', () => {
    it('throws an error', () => {
      const header = createHeader(undefined);

      expectTable(header, `
╔═════╤════╤═══╗
║ aaa │ bb │ c ║
╚═════╧════╧═══╝`);
    });
  });

  context('truncate', () => {
    it('truncates to the truncation value', () => {
      const header = createHeader({
        content: basicContent,
        truncate: 7,
      });

      expectTable(header, `
╔══════════════╗
║   Lorem …    ║
╟─────┬────┬───╢
║ aaa │ bb │ c ║
╚═════╧════╧═══╝
`);
    });
  });

  context('wrapWord', () => {
    context('wrapWord = false', () => {
      it('slices to the given width', () => {
        const header = createHeader({
          content: basicContent,
          wrapWord: false,
        });

        expectTable(header, `
╔══════════════╗
║ Lorem ipsum  ║
║ dolor sit am ║
║      et      ║
╟─────┬────┬───╢
║ aaa │ bb │ c ║
╚═════╧════╧═══╝
`);
      });
    });

    context('wrapWord = true', () => {
      it('wraps word properly', () => {
        const header = createHeader({
          content: basicContent,
          wrapWord: true,
        });

        expectTable(header, `
╔══════════════╗
║ Lorem ipsum  ║
║  dolor sit   ║
║     amet     ║
╟─────┬────┬───╢
║ aaa │ bb │ c ║
╚═════╧════╧═══╝
`);
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

        expectTable(header, `
╔══════════════╗
║ Lorem ipsum  ║
║ dolor sit    ║
║ amet         ║
╟─────┬────┬───╢
║ aaa │ bb │ c ║
╚═════╧════╧═══╝
`);
      });
    });

    context('center', () => {
      it('aligns center', () => {
        const header = createHeader({
          alignment: 'center',
          content: basicContent,
          wrapWord: true,
        });

        expectTable(header, `
╔══════════════╗
║ Lorem ipsum  ║
║  dolor sit   ║
║     amet     ║
╟─────┬────┬───╢
║ aaa │ bb │ c ║
╚═════╧════╧═══╝
`);
      });
    });

    context('right', () => {
      it('aligns right', () => {
        const header = createHeader({
          alignment: 'right',
          content: basicContent,
          wrapWord: true,
        });

        expectTable(header, `
╔══════════════╗
║  Lorem ipsum ║
║    dolor sit ║
║         amet ║
╟─────┬────┬───╢
║ aaa │ bb │ c ║
╚═════╧════╧═══╝
`);
      });
    });

    context('justify', () => {
      it('aligns justify', () => {
        const header = createHeader({
          alignment: 'justify',
          content: basicContent,
          wrapWord: true,
        });

        expectTable(header, `
╔══════════════╗
║ Lorem  ipsum ║
║ dolor    sit ║
║ amet         ║
╟─────┬────┬───╢
║ aaa │ bb │ c ║
╚═════╧════╧═══╝
`);
      });
    });
  });

  context('padding', () => {
    it('pads properly', () => {
      const header = createHeader({
        content: basicContent,
        paddingLeft: 2,
        paddingRight: 3,
      });

      expectTable(header, `
╔══════════════╗
║  Lorem ips   ║
║  um dolor    ║
║  sit amet    ║
╟─────┬────┬───╢
║ aaa │ bb │ c ║
╚═════╧════╧═══╝
`);
    });
  });

  context('mixed with ansi word', () => {
    it('works properly', () => {
      const header = createHeader({
        content: `${openBold}This is the header with ${openRed}ansi words${closeRed}${closeBold}`,
        wrapWord: true,
      });

      expectTable(header, `
╔══════════════╗
║ ${openBold}This is the${closeBold}  ║
║ ${openBold}header with${closeBold}  ║
║  ${openBold}${openRed}ansi words${closeBold}${closeRed}  ║
╟─────┬────┬───╢
║ aaa │ bb │ c ║
╚═════╧════╧═══╝
`);
    });
  });
});
