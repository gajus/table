import {
  expect,
} from 'chai';

export const openRed = '\u001b[31m';
export const closeRed = '\u001b[39m';

export const stringToRed = (string: string) => {
  return openRed + string + closeRed;
};

export const arrayToRed = (array: string[]) => {
  return array.map((string) => {
    return string === '' ? '' : stringToRed(string);
  });
};

export const expectTable = (result: string, expectedResult: string): void => {
  expect(result).to.equal(expectedResult.trim() + '\n');
};
