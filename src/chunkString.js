import slice from 'ansi-slice';
import stringWidth from 'string-width';

/**
 * Creates an array of strings split into groups the length of size.
 * This function works with strings that contain ASCII characters.
 *
 * @param {string} subject
 * @param {number} size
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
