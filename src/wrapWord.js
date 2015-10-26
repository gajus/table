import _ from 'lodash';
import slice from 'ansi-slice';
import stringWidth from 'string-width';

/**
 * @param {string} input
 * @param {number} size
 * @returns {Array}
 */
export default (input, size) => {
    let chunk,
        chunks,
        re,
        subject;

    subject = input;

    chunks = [];

    // https://regex101.com/r/gY5kZ1/1
    re = new RegExp('(^.{1,' + size + '}(\\s+|$))|(^.{1,' + (size - 1) + '}(\\\\|/|_|\\.|,|;|\-))');

    do {
        chunk = subject.match(re);

        // console.log('chunk', chunk, re);

        if (chunk) {
            chunk = chunk[0];

            subject = slice(subject, stringWidth(chunk));

            chunk = _.trim(chunk);
        } else {
            chunk = slice(subject, 0, size);
            subject = slice(subject, size);
        }

        chunks.push(chunk);
    } while (stringWidth(subject));

    return chunks;
};
