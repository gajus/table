/* eslint-disable max-nested-callbacks */

import {
  expect
} from 'chai';
import validateTableData from '../src/validateTableData';

describe('validateTableData', () => {
  context('table does not have a row', () => {
    it('throws an error', () => {
      expect(() => {
        validateTableData([]);
      }).to.throw(Error, 'Table must define at least one row.');
    });
  });

  context('table does not have a column', () => {
    it('throws an error', () => {
      expect(() => {
        validateTableData([[]]);
      }).to.throw(Error, 'Table must define at least one column.');
    });
  });

  context('row data is not an array', () => {
    it('throws an error', () => {
      expect(() => {
        validateTableData({});
      }).to.throw(Error, 'Table data must be an array.');
    });
  });

  context('column data is not an array', () => {
    it('throws an error', () => {
      expect(() => {
        validateTableData([{}]);
      }).to.throw(Error, 'Table row data must be an array.');
    });
  });

  context('cell data contains a control character', () => {
    it('throws an error', () => {
      expect(() => {
        validateTableData([
          [
            [
              String.fromCodePoint(0x01)
            ]
          ]
        ]);
      }).to.throw(Error, 'Table data must not contain control characters.');
    });
  });

  context('cell data contains newlines', () => {
    it('does not throw', () => {
      validateTableData([['ab\nc']]);
    });
  });

  context('cell data contains hyperlinks', () => {
    const OSC = '\u001B]';
    const BEL = '\u0007';
    const SEP = ';';
    const url = 'https://example.com';
    const text = 'This is a link to example.com';

    const link = [
      OSC,
      '8',
      SEP,
      SEP,
      url,
      BEL,
      text,
      OSC,
      '8',
      SEP,
      SEP,
      BEL
    ].join('');

    it('does not throw', () => {
      validateTableData([[link]]);
    });
  });

  context('rows have inconsistent number of cells', () => {
    it('throws an error', () => {
      expect(() => {
        validateTableData([
          ['a', 'b', 'c'],
          ['a', 'b']
        ]);
      }).to.throw(Error, 'Table must have a consistent number of cells.');
    });
  });
});
