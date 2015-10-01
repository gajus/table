import _ from 'lodash';
import stringWidth from 'string-width';

let alignCenter,
    alignLeft,
    alignments,
    alignRight;

alignments = [
    `left`,
    `right`,
    `center`
];

/**
 * @param {string} subject
 * @param {number} availableWidth
 * @returns {string}
 */
alignLeft = (subject, availableWidth) => {
    return subject + _.repeat(` `, availableWidth);
};

/**
 * @param {string} subject
 * @param {number} availableWidth
 * @returns {string}
 */
alignRight = (subject, availableWidth) => {
    return _.repeat(` `, availableWidth) + subject;
};

/**
 * @param {string} subject
 * @param {number} availableWidth
 * @returns {string}
 */
alignCenter = (subject, availableWidth) => {
    let halfAvailableWidth;

    halfAvailableWidth = availableWidth / 2;

    if (halfAvailableWidth % 2 === 0) {
        return _.repeat(` `, halfAvailableWidth) + subject + _.repeat(` `, halfAvailableWidth);
    } else {
        halfAvailableWidth = _.floor(halfAvailableWidth);

        return _.repeat(` `, halfAvailableWidth) + subject + _.repeat(` `, halfAvailableWidth + 1);
    }
};

/**
 * Pads a string to the left and/or right to position the subject
 * text in a desired alignment within a container.
 *
 * @param {string} subject
 * @param {number} containerWidth
 * @param {string} alignment (left, right, center)
 * @returns {string}
 */
export default (subject, containerWidth, alignment) => {
    let availableWidth,
        subjectWidth;

    if (!_.isString(subject)) {
        throw new Error(`Subject parameter value must be a string.`);
    }

    if (!_.isNumber(containerWidth)) {
        throw new Error(`Container width parameter value must be a number.`);
    }

    subjectWidth = stringWidth(subject);

    if (subjectWidth > containerWidth) {
        throw new Error(`Subject parameter value width cannot be greater than the container width.`);
    }

    if (!_.isString(alignment)) {
        throw new Error(`Alignment parameter value must be a string.`);
    }

    if (alignments.indexOf(alignment) === -1) {
        throw new Error(`Alignment parameter value must be a known alignment parameter value (left, right, center).`);
    }

    availableWidth = containerWidth - subjectWidth;

    if (alignment === `left`) {
        return alignLeft(subject, availableWidth);
    }

    if (alignment === `right`) {
        return alignRight(subject, availableWidth);
    }

    return alignCenter(subject, availableWidth);
};
