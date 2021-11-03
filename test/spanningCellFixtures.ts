import type {
  CellUserConfig, DrawHorizontalLine, DrawVerticalLine, SpanningCellConfig,
} from '../src';
import type {
  SpanningCellContext,
} from '../src/spanningCellManager';
import type {
  ColumnConfig, Row,
} from '../src/types/internal';

export const baseRows: Row[] = [
  ['ECMAScript (or ES) is a general-purpose programming language, standardised by Ecma International according to the document ECMA-262.',
    'It is a JavaScript standard meant to ensure the interoperability of web pages across different web browsers.',
    'ECMAScript is commonly used for client-side scripting on the World Wide Web, and it is increasingly being used for writing server applications and services using Node.js.',
    'ECMA-262 or the ECMAScript Language Specification defines the ECMAScript Language, or just ECMAScript (aka JavaScript).'],
  ['JavaScript often abbreviated as JS, is a programming language that conforms to the ECMAScript specification.',
    'JavaScript is high-level, often just-in-time compiled and multi-paradigm. It has dynamic typing, prototype-based object-orientation and first-class functions.',
    'Alongside HTML and CSS, JavaScript is one of the core technologies of the World Wide Web. Over 97% of websites use it client-side for web page behavior, often incorporating third-party libraries.',
    'All major web browsers have a dedicated JavaScript engine to execute the code on the user\'s device.'],
  ['Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.',
    'Node.js lets developers use JavaScript to write command line tools and for server-side scripting—running scripts server-side to produce dynamic web page content before the page is sent to the user\'s web browser.',
    'Consequently, Node.js represents a "JavaScript everywhere" paradigm, unifying web-application development around a single programming language, rather than different languages for server-side and client-side scripts.',
    'Though .js is the standard filename extension for JavaScript code, the name "Node.js" doesn\'t refer to a particular file in this context and is merely the name of the product.'],
  ['npm is a package manager for the JavaScript programming language maintained by npm, Inc.',
    'npm is the default package manager for the JavaScript runtime environment Node.js.',
    'It consists of a command line client, also called npm, and an online database of public and paid-for private packages, called the npm registry.',
    'The registry is accessed via the client, and the available packages can be browsed and searched via the npm website. The package manager and the registry are managed by npm, Inc.'],
];

export const baseSpanningCellConfig: SpanningCellConfig[] = [
  {
    col: 0,
    colSpan: 2,
    row: 0,
  },
  {col: 3,
    row: 0,
    rowSpan: 2},

  {col: 1,
    colSpan: 2,
    row: 1},

  {col: 0,
    colSpan: 2,
    row: 2,
    rowSpan: 2},

  {col: 2,
    row: 2,
    rowSpan: 2},
];

export const baseDrawHorizontalLine: DrawHorizontalLine = () => {
  return true;
};

export const baseDrawVerticalLine: DrawVerticalLine = () => {
  return true;
};

export const baseCellConfig: Required<CellUserConfig> = {
  alignment: 'left',
  paddingLeft: 1,
  paddingRight: 1,
  truncate: Number.POSITIVE_INFINITY,
  verticalAlignment: 'top',
  wrapWord: true,
};

export const baseColumnConfig: ColumnConfig[] = [
  {width: 15,
    ...baseCellConfig},
  {width: 10,
    ...baseCellConfig},
  {width: 20,
    ...baseCellConfig},
  {width: 15,
    ...baseCellConfig},
];

export const baseRowHeight: number[] = [8, 9, 10, 11];

export const baseSpanningCellContext: SpanningCellContext = {
  columnsConfig: baseColumnConfig,
  drawHorizontalLine: baseDrawHorizontalLine,
  drawVerticalLine: baseDrawVerticalLine,
  rowHeights: baseRowHeight,
  rows: baseRows,
  spanningCellConfigs: baseSpanningCellConfig,
};
