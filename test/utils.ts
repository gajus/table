import {
  expect,
} from 'chai';

export const openRed = '\u001B[31m';
export const closeRed = '\u001B[39m';
export const openBold = '\u001B[1m';
export const closeBold = '\u001B[22m';

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
