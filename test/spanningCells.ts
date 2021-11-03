import type {
  CellUserConfig, ColumnUserConfig,
} from '../src';
import {
  table,
} from '../src';
import {
  baseRows, baseSpanningCellConfig,
} from './spanningCellFixtures';
import {
  expectTable,
} from './utils';

describe('spanningCells', () => {
  const baseUserCellConfig: CellUserConfig = {
    alignment: 'left',
    verticalAlignment: 'top',
    wrapWord: true,
  };

  const baseUserColumnConfig: ColumnUserConfig[] = [
    {width: 15,
      ...baseUserCellConfig},
    {width: 20,
      ...baseUserCellConfig},
    {width: 27,
      ...baseUserCellConfig},
    {width: 30,
      ...baseUserCellConfig},
  ];

  it('test 1', () => {
    const result = table(baseRows, {
      columns: baseUserColumnConfig,
      spanningCells: baseSpanningCellConfig,
    });

    expectTable(result, `
╔════════════════════════════════════════╤═════════════════════════════╤════════════════════════════════╗
║ ECMAScript (or ES) is a                │ ECMAScript is commonly used │ ECMA-262 or the ECMAScript     ║
║ general-purpose programming language,  │ for client-side scripting   │ Language Specification defines ║
║ standardised by Ecma International     │ on the World Wide Web, and  │ the ECMAScript Language, or    ║
║ according to the document ECMA-262.    │ it is increasingly being    │ just ECMAScript (aka           ║
║                                        │ used for writing server     │ JavaScript).                   ║
║                                        │ applications and services   │                                ║
║                                        │ using Node.js.              │                                ║
╟─────────────────┬──────────────────────┴─────────────────────────────┤                                ║
║ JavaScript      │ JavaScript is high-level, often just-in-time       │                                ║
║ often           │ compiled and multi-paradigm. It has dynamic        │                                ║
║ abbreviated as  │ typing, prototype-based object-orientation and     │                                ║
║ JS, is a        │ first-class functions.                             │                                ║
║ programming     │                                                    │                                ║
║ language that   │                                                    │                                ║
║ conforms to the │                                                    │                                ║
║ ECMAScript      │                                                    │                                ║
║ specification.  │                                                    │                                ║
╟─────────────────┴──────────────────────┬─────────────────────────────┼────────────────────────────────╢
║ Node.js is an open-source,             │ Consequently, Node.js       │ Though .js is the standard     ║
║ cross-platform, back-end JavaScript    │ represents a "JavaScript    │ filename extension for         ║
║ runtime environment that runs on the   │ everywhere" paradigm,       │ JavaScript code, the name      ║
║ V8 engine and executes JavaScript code │ unifying web-application    │ "Node.js" doesn't refer to a   ║
║ outside a web browser.                 │ development around a single │ particular file in this        ║
║                                        │ programming language,       │ context and is merely the name ║
║                                        │ rather than different       │ of the product.                ║
║                                        │ languages for server-side   ├────────────────────────────────╢
║                                        │ and client-side scripts.    │ The registry is accessed via   ║
║                                        │                             │ the client, and the available  ║
║                                        │                             │ packages can be browsed and    ║
║                                        │                             │ searched via the npm website.  ║
║                                        │                             │ The package manager and the    ║
║                                        │                             │ registry are managed by npm,   ║
║                                        │                             │ Inc.                           ║
╚════════════════════════════════════════╧═════════════════════════════╧════════════════════════════════╝
`);
  });

  it('test 2', () => {
    const result = table(baseRows, {
      columns: baseUserColumnConfig,
      drawHorizontalLine: (index) => {
        return index !== 3;
      },
      header: {
        content: 'Web development is the work involved in developing a Web site for the Internet (World Wide Web) or an intranet (a private network).',
      },
      spanningCells: [
        {col: 1,
          colSpan: 2,
          row: 0},
        {col: 1,
          colSpan: 2,
          row: 1},
      ],
    });

    expectTable(result, `
╔═══════════════════════════════════════════════════════════════════════════════════════════════════════╗
║ Web development is the work involved in developing a Web site for the Internet (World Wide Web) or an ║
║                                     intranet (a private network).                                     ║
╟─────────────────┬────────────────────────────────────────────────────┬────────────────────────────────╢
║ ECMAScript (or  │ It is a JavaScript standard meant to ensure the    │ ECMA-262 or the ECMAScript     ║
║ ES) is a        │ interoperability of web pages across different web │ Language Specification defines ║
║ general-purpose │ browsers.                                          │ the ECMAScript Language, or    ║
║ programming     │                                                    │ just ECMAScript (aka           ║
║ language,       │                                                    │ JavaScript).                   ║
║ standardised by │                                                    │                                ║
║ Ecma            │                                                    │                                ║
║ International   │                                                    │                                ║
║ according to    │                                                    │                                ║
║ the document    │                                                    │                                ║
║ ECMA-262.       │                                                    │                                ║
╟─────────────────┼────────────────────────────────────────────────────┼────────────────────────────────╢
║ JavaScript      │ JavaScript is high-level, often just-in-time       │ All major web browsers have a  ║
║ often           │ compiled and multi-paradigm. It has dynamic        │ dedicated JavaScript engine to ║
║ abbreviated as  │ typing, prototype-based object-orientation and     │ execute the code on the user's ║
║ JS, is a        │ first-class functions.                             │ device.                        ║
║ programming     │                                                    │                                ║
║ language that   │                                                    │                                ║
║ conforms to the │                                                    │                                ║
║ ECMAScript      │                                                    │                                ║
║ specification.  │                                                    │                                ║
║ Node.js is an   │ Node.js lets         │ Consequently, Node.js       │ Though .js is the standard     ║
║ open-source,    │ developers use       │ represents a "JavaScript    │ filename extension for         ║
║ cross-platform, │ JavaScript to write  │ everywhere" paradigm,       │ JavaScript code, the name      ║
║ back-end        │ command line tools   │ unifying web-application    │ "Node.js" doesn't refer to a   ║
║ JavaScript      │ and for server-side  │ development around a single │ particular file in this        ║
║ runtime         │ scripting—running    │ programming language,       │ context and is merely the name ║
║ environment     │ scripts server-side  │ rather than different       │ of the product.                ║
║ that runs on    │ to produce dynamic   │ languages for server-side   │                                ║
║ the V8 engine   │ web page content     │ and client-side scripts.    │                                ║
║ and executes    │ before the page is   │                             │                                ║
║ JavaScript code │ sent to the user's   │                             │                                ║
║ outside a web   │ web browser.         │                             │                                ║
║ browser.        │                      │                             │                                ║
╟─────────────────┼──────────────────────┼─────────────────────────────┼────────────────────────────────╢
║ npm is a        │ npm is the default   │ It consists of a command    │ The registry is accessed via   ║
║ package manager │ package manager for  │ line client, also called    │ the client, and the available  ║
║ for the         │ the JavaScript       │ npm, and an online database │ packages can be browsed and    ║
║ JavaScript      │ runtime environment  │ of public and paid-for      │ searched via the npm website.  ║
║ programming     │ Node.js.             │ private packages, called    │ The package manager and the    ║
║ language        │                      │ the npm registry.           │ registry are managed by npm,   ║
║ maintained by   │                      │                             │ Inc.                           ║
║ npm, Inc.       │                      │                             │                                ║
╚═════════════════╧══════════════════════╧═════════════════════════════╧════════════════════════════════╝
`);
  });
});

