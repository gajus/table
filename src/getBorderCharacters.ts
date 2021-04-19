/* eslint-disable sort-keys-fix/sort-keys-fix */

import type {
  BorderConfig,
} from './types/internal';

export default (name: string): BorderConfig => {
  if (name === 'honeywell') {
    return {
      topBody: '═',
      topJoin: '╤',
      topLeft: '╔',
      topRight: '╗',

      bottomBody: '═',
      bottomJoin: '╧',
      bottomLeft: '╚',
      bottomRight: '╝',

      bodyLeft: '║',
      bodyRight: '║',
      bodyJoin: '│',

      joinBody: '─',
      joinLeft: '╟',
      joinRight: '╢',
      joinJoin: '┼',
    };
  }

  if (name === 'norc') {
    return {
      topBody: '─',
      topJoin: '┬',
      topLeft: '┌',
      topRight: '┐',

      bottomBody: '─',
      bottomJoin: '┴',
      bottomLeft: '└',
      bottomRight: '┘',

      bodyLeft: '│',
      bodyRight: '│',
      bodyJoin: '│',

      joinBody: '─',
      joinLeft: '├',
      joinRight: '┤',
      joinJoin: '┼',
    };
  }

  if (name === 'ramac') {
    return {
      topBody: '-',
      topJoin: '+',
      topLeft: '+',
      topRight: '+',

      bottomBody: '-',
      bottomJoin: '+',
      bottomLeft: '+',
      bottomRight: '+',

      bodyLeft: '|',
      bodyRight: '|',
      bodyJoin: '|',

      joinBody: '-',
      joinLeft: '|',
      joinRight: '|',
      joinJoin: '|',
    };
  }

  if (name === 'void') {
    return {
      topBody: '',
      topJoin: '',
      topLeft: '',
      topRight: '',

      bottomBody: '',
      bottomJoin: '',
      bottomLeft: '',
      bottomRight: '',

      bodyLeft: '',
      bodyRight: '',
      bodyJoin: '',

      joinBody: '',
      joinLeft: '',
      joinRight: '',
      joinJoin: '',
    };
  }

  throw new Error('Unknown border template "' + name + '".');
};
