import {
  expect,
} from 'chai';
import * as Sinon from 'sinon';
import {
  getBorderCharacters,
  createStream,
} from '../src';

describe('createStream', () => {
  context('"config.columnDefault.width" property is not provided', () => {
    it('throws an error', () => {
      expect(() => {
        createStream({
          columnCount: 1,
          columnDefault: {},
        } as never);
      }).to.throw(Error, 'Must provide config.columnDefault.width when creating a stream.');
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

  context('normal stream', () => {
    let stub: Sinon.SinonStub;
    beforeEach(() => {
      stub = Sinon.stub(process.stdout, 'write');
    });
    afterEach(() => {
      stub.restore();
      stub.resetHistory();
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

      Sinon.assert.callCount(stub, 2);
      Sinon.assert.calledWithExactly(stub.getCall(0), '+------+-----+-------+\n|   a  | cc  | d     |\n|    b | c   |       |\n+------+-----+-------+');
      Sinon.assert.calledWithExactly(stub.getCall(1), '\r\u001B[K|------|-----|-------|\n|    e | f   | g     |\n+------+-----+-------+');
    });

    context('given custom drawVerticalLine', () => {
      it('use the callback to draw vertical lines', () => {
        const stream = createStream({
          columnCount: 2,
          columnDefault: {
            width: 2,
          },
          drawVerticalLine: (index) => {
            return index === 1;
          },
        });

        stream.write(['a', 'b']);
        Sinon.assert.callCount(stub, 1);

        Sinon.assert.calledOnceWithExactly(stub, '════╤════\n a  │ b  \n════╧════');
      });
    });

    context('append empty row', () => {
      it('does not add a new line', () => {
        const stream = createStream({
          border: getBorderCharacters('void'),
          columnCount: 1,
          columnDefault: {
            width: 2,
          },
        });

        stream.write(['a']);
        stream.write(['']);
        stream.write(['a']);

        Sinon.assert.calledWithExactly(stub.getCall(1), '');
        Sinon.assert.calledWithExactly(stub.getCall(2), '\n a');
      });
    });
  });
});
