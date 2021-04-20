/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import {
  table,
} from '../src';
import {
  validateTableData,
} from '../src/validateTableData';

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
        validateTableData({} as never);
      }).to.throw(Error, 'Table data must be an array.');
    });
  });

  context('column data is not an array', () => {
    it('throws an error', () => {
      expect(() => {
        validateTableData([{}] as never);
      }).to.throw(Error, 'Table row data must be an array.');
    });
  });

  context('cell data contains a control character', () => {
    it('throws an error', () => {
      expect(() => {
        validateTableData([
          [
            String.fromCodePoint(0x01),
          ],
        ]);
      }).to.throw(Error, 'Table data must not contain control characters.');
    });
  });

  context('cell data contains newlines', () => {
    it('does not throw', () => {
      expect(() => {
        validateTableData([['ab\nc']]);
      }).to.not.throw();
    });
  });

  context('cell data contains Windows-style newlines', () => {
    it('does not throw and replaces by Unix-style newline', () => {
      expect(() => {
        validateTableData([['ab\r\nc']]);
      }).to.not.throw();

      expect(table([['ab\r\nc']])).to.equal('╔════╗\n║ ab ║\n║ c  ║\n╚════╝\n');
    });
  });

  context('cell data contains carriage return only', () => {
    it('throws an error', () => {
      expect(() => {
        validateTableData([['ab\rc']]);
      }).to.throw(Error, 'Table data must not contain control characters.');
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
      BEL,
    ].join('');

    it('does not throw', () => {
      expect(() => {
        validateTableData([[link]]);
      }).to.not.throw();
    });
  });

  context('rows have inconsistent number of cells', () => {
    it('throws an error', () => {
      expect(() => {
        validateTableData([
          ['a', 'b', 'c'],
          ['a', 'b'],
        ]);
      }).to.throw(Error, 'Table must have a consistent number of cells.');
    });
  });
});
