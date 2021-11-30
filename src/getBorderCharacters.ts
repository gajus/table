/* eslint-disable canonical/sort-keys */

import type {
  BorderConfig,
} from './types/api';

export const getBorderCharacters = (name: string): BorderConfig => {
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
      headerJoin: '┬',

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
      headerJoin: '┬',

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
      headerJoin: '+',

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
      headerJoin: '',

      joinBody: '',
      joinLeft: '',
      joinRight: '',
      joinJoin: '',
    };
  }

  throw new Error('Unknown border template "' + name + '".');
};
