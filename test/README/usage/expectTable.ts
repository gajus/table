import {
  expect,
} from 'chai';

export default (result: string, expectedResult: string): void => {
  expect(result).to.equal(expectedResult.trim() + '\n');
};
