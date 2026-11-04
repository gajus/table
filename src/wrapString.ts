import slice from 'slice-ansi';
import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';
import {
  calculateSliceLength,
} from './utils';

/**
 * Creates an array of strings split into groups of at most size terminal columns.
 *
 * wrapText is different from would-be "chunk" implementation
 * in that whitespace characters that occur on a chunk size limit are trimmed.
 *
 */
export const wrapString = (subject: string, size: number): string[] => {
  let subjectSlice = subject;

  const chunks: string[] = [];

  do {
    const chunkLength = calculateSliceLength(stripAnsi(subjectSlice), size);

    chunks.push(slice(subjectSlice, 0, chunkLength));

    subjectSlice = slice(subjectSlice, chunkLength).trim();
  } while (stringWidth(subjectSlice));

  return chunks;
};
