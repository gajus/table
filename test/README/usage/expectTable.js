import {
  expect,
} from 'chai';

/**
 * @param {string} result
 * @param {string} expectedResult
 * @returns {undefined}
 */
export default (result, expectedResult) => {
  expect(result).to.equal(expectedResult.trim() + '\n');
};
