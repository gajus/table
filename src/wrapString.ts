import slice from 'slice-ansi';
import stringWidth from 'string-width';

/**
 * Creates an array of strings split into groups the length of size.
 * This function works with strings that contain ASCII characters.
 *
 * wrapText is different from would-be "chunk" implementation
 * in that whitespace characters that occur on a chunk size limit are trimmed.
 *
 */
export default (subject: string, size: number): string[] => {
  let subjectSlice = subject;

  const chunks: string[] = [];

  do {
    chunks.push(slice(subjectSlice, 0, size));

    subjectSlice = slice(subjectSlice, size).trim();
  } while (stringWidth(subjectSlice));

  return chunks;
};
