/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import {
  getBorderCharacters,
} from '../src/getBorderCharacters';

describe('getBorderCharacters', () => {
  context('given name \'honeywell\'', () => {
    it('returns the \'honeywell\' template', () => {
      expect(getBorderCharacters('honeywell')).to.be.deep.equal({
        bodyJoin: '│',
        bodyLeft: '║',
        bodyRight: '║',
        bottomBody: '═',

        bottomJoin: '╧',
        bottomLeft: '╚',
        bottomRight: '╝',
        joinBody: '─',

        joinJoin: '┼',
        joinLeft: '╟',
        joinRight: '╢',

        topBody: '═',
        topJoin: '╤',
        topLeft: '╔',
        topRight: '╗',
      });
    });
  });

  context('given name \'norc\'', () => {
    it('returns the \'norc\' template', () => {
      expect(getBorderCharacters('norc')).to.be.deep.equal({
        bodyJoin: '│',
        bodyLeft: '│',
        bodyRight: '│',
        bottomBody: '─',

        bottomJoin: '┴',
        bottomLeft: '└',
        bottomRight: '┘',
        joinBody: '─',

        joinJoin: '┼',
        joinLeft: '├',
        joinRight: '┤',

        topBody: '─',
        topJoin: '┬',
        topLeft: '┌',
        topRight: '┐',
      });
    });
  });

  context('given name \'ramac\'', () => {
    it('returns the \'ramac\' template', () => {
      expect(getBorderCharacters('ramac')).to.be.deep.equal({
        bodyJoin: '|',
        bodyLeft: '|',
        bodyRight: '|',
        bottomBody: '-',

        bottomJoin: '+',
        bottomLeft: '+',
        bottomRight: '+',
        joinBody: '-',

        joinJoin: '|',
        joinLeft: '|',
        joinRight: '|',

        topBody: '-',
        topJoin: '+',
        topLeft: '+',
        topRight: '+',
      });
    });
  });

  context('given name \'void\'', () => {
    it('returns the \'void\' template', () => {
      expect(getBorderCharacters('void')).to.be.deep.equal({
        bodyJoin: '',
        bodyLeft: '',
        bodyRight: '',
        bottomBody: '',

        bottomJoin: '',
        bottomLeft: '',
        bottomRight: '',
        joinBody: '',

        joinJoin: '',
        joinLeft: '',
        joinRight: '',

        topBody: '',
        topJoin: '',
        topLeft: '',
        topRight: '',
      });
    });
  });

  context('given another name', () => {
    it('throws an error', () => {
      expect(() => {
        return getBorderCharacters('bold');
      }).to.throw(Error, 'Unknown border template "bold".');
    });
  });
});
