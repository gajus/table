import slice from 'ansi-slice';

import stringWidth from 'string-width';

/**
 * @param {String} subject
 * @param {Number} size
 */
export default (subject, size) => {
    let chunks,
        subjectSlice;

    subjectSlice = subject;

    chunks = [];

    do {
        chunks.push(slice(subjectSlice, 0, size));

        subjectSlice = slice(subjectSlice, size);
    } while (stringWidth(subjectSlice));

    return chunks;
};
