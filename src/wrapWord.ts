import slice from 'slice-ansi';
import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';

/**
 * Returns the number of code units of `subject` that fit within `width` display
 * columns. Full-width characters (e.g. CJK) occupy two columns, so the number
 * of code units and the number of columns they span are not interchangeable.
 * At least one character is always consumed to guarantee forward progress.
 */
const fittingLength = (subject: string, width: number): number => {
  let length = 0;
  let usedWidth = 0;

  for (const character of subject) {
    const characterWidth = stringWidth(character);

    if (length > 0 && usedWidth + characterWidth > width) {
      break;
    }

    usedWidth += characterWidth;
    length += character.length;
  }

  return length;
};

const calculateStringLengths = (input: string, size: number): Array<[Length:number, Offset: number]> => {
  let subject = stripAnsi(input);

  const chunks: Array<[number, number]> = [];

  do {
    let chunk: string;

    // The chunk size is expressed in display columns, but the regular expression
    // counts code units. Because a full-width character spans two columns, the
    // column limit is first translated into the matching code unit limit for the
    // current `subject`; otherwise full-width characters would be sliced past the
    // intended width and silently dropped.
    // https://regex101.com/r/gY5kZ1/1
    const wordLimit = Math.max(fittingLength(subject, Math.max(size, 1)), 1);
    const breakLimit = Math.max(fittingLength(subject, Math.max(size - 1, 1)), 1);
    const re = new RegExp('(^.{1,' + String(wordLimit) + '}(\\s+|$))|(^.{1,' + String(breakLimit) + '}(\\\\|/|_|\\.|,|;|-))');

    const match = re.exec(subject);

    if (match) {
      chunk = match[0];

      subject = subject.slice(chunk.length);

      const trimmedWidth = stringWidth(chunk.trim());
      const offset = stringWidth(chunk) - trimmedWidth;

      chunks.push([trimmedWidth, offset]);
    } else {
      chunk = subject.slice(0, wordLimit);
      subject = subject.slice(chunk.length);

      chunks.push([stringWidth(chunk), 0]);
    }
  } while (subject.length);

  return chunks;
};

export const wrapWord = (input: string, size: number): string[] => {
  const result: string[] = [];

  let startIndex = 0;
  calculateStringLengths(input, size).forEach(([length, offset]) => {
    result.push(slice(input, startIndex, startIndex + length));

    startIndex += length + offset;
  });

  return result;
};
