import _ from 'lodash';
import stringWidth from 'string-width';

/**
 * Calculates width of each cell contents.
 *
 * @param {string[]} cells
 * @return {number[]}
 */
export default (cells) => {
    return _.map(cells, (value) => {
        return stringWidth(value);
    });
};
