/* eslint-disable sort-keys-fix/sort-keys-fix */

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
      joinMiddleDown: '┬',
      joinMiddleUp: '┴',
      joinMiddleLeft: '┤',
      joinMiddleRight: '├',
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
      joinMiddleDown: '┬',
      joinMiddleUp: '┴',
      joinMiddleLeft: '┤',
      joinMiddleRight: '├',
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
      joinMiddleDown: '+',
      joinMiddleUp: '+',
      joinMiddleLeft: '+',
      joinMiddleRight: '+',
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
      joinMiddleDown: '',
      joinMiddleUp: '',
      joinMiddleLeft: '',
      joinMiddleRight: '',
    };
  }

  throw new Error('Unknown border template "' + name + '".');
};
