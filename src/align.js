import _ from 'lodash';
import stringWidth from 'string-width';

let alignments;

alignments = [
    `left`,
    `right`,
    `center`
];

/**
 * @param {String} subject
 * @param {Number} containerWidth
 * @param {String} alignment (left, right, center)
 * @return {String}
 */
export default (subject, containerWidth, alignment) => {
    let availableWidth,
        halfAvailableWidth,
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
        return subject + _.repeat(` `, availableWidth);
    }

    if (alignment === `right`) {
        return _.repeat(` `, availableWidth) + subject;
    }

    halfAvailableWidth = availableWidth / 2;

    if (halfAvailableWidth % 2 === 0) {
        return _.repeat(` `, halfAvailableWidth) + subject + _.repeat(` `, halfAvailableWidth);
    } else {
        halfAvailableWidth = _.floor(halfAvailableWidth);

        return _.repeat(` `, halfAvailableWidth) + subject + _.repeat(` `, halfAvailableWidth + 1);
    }
};
