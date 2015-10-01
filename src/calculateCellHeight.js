import _ from 'lodash';
import stringWidth from 'string-width';

/**
 * @param {string} value
 * @param {number} columnWidth
 * @returns {number}
 */
export default (value, columnWidth) => {
    if (!_.isString(value)) {
        throw new Error(`Value must be a string.`);
    }

    // @todo Replace with _.isString (https://github.com/lodash/lodash/issues/1503).
    if (!Number.isInteger(columnWidth)) {
        throw new Error(`Column width must be an integer.`);
    }

    if (columnWidth < 1) {
        throw new Error(`Column width must be greater than 0.`);
    }

    return _.ceil(stringWidth(value) / columnWidth);
};
