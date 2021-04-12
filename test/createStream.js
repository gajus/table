/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import {
  stub as SinonStub, assert,
} from 'sinon';
import createStream from '../src/createStream';
import getBorderCharacters from '../src/getBorderCharacters';

describe('createStream', () => {
  context('"config.columnDefault.width" property is not provided', () => {
    it('throws an error', () => {
      expect(() => {
        createStream();
      }).to.throw(Error, 'Must provide config.columnDefault.width when creating a stream.');
    });
  });
  context('"config.columnCount" property is not provided', () => {
    it('throws an error', () => {
      expect(() => {
        createStream({
          columnDefault: {
            width: 10,
          },
        });
      }).to.throw(Error, 'Must provide config.columnCount.');
    });
  });
  context('Table data cell count does not match the columnCount.', () => {
    it('throws an error', () => {
      expect(() => {
        const stream = createStream({
          columnCount: 10,
          columnDefault: {
            width: 10,
          },
        });

        stream.write(['foo']);
      }).to.throw(Error, 'Row cell count does not match the config.columnCount.');
    });
  });

  context('given two normal rows', () => {
    let stub;
    before(() => {
      stub = SinonStub(process.stdout, 'write');
    });
    after(() => {
      stub.restore();
    });

    it('process.stdout.write calls twice with proper arguments', () => {
      const stream = createStream({
        border: getBorderCharacters('ramac'),
        columnCount: 3,
        columnDefault: {
          width: 2,
        },
        columns: {
          0: {
            alignment: 'right',
            paddingLeft: 3,
          },
          1: {
            alignment: 'center',
            paddingRight: 2,
          },
          2: {
            alignment: 'left',
            width: 5,
          },
        },
      });
      stream.write(['a b', 'ccc', 'd']);
      stream.write(['e', 'f', 'g']);

      assert.callCount(stub, 2);
      assert.calledWithExactly(stub.getCall(0), '+------+-----+-------+\n|   a  | cc  | d     |\n|    b | c   |       |\n+------+-----+-------+');
      assert.calledWithExactly(stub.getCall(1), '\r\u001b[K|------|-----|-------|\n|    e | f   | g     |\n+------+-----+-------+');
    });
  });
});
