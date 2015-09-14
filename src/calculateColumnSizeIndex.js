import _ from 'lodash';
import stringWidth from 'string-width';

/**
 * @param {String[]} cells
 * @return {Number[]}
 */
export default (cells) => {
    return _.map(cells, (value) => {
        return stringWidth(value);
    });
};
