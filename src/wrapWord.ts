import slice from 'slice-ansi';
import stripAnsi from 'strip-ansi';

const calculateStringLengths = (input: string, size: number): Array<[Length:number, Offset: number]> => {
  let subject = stripAnsi(input);

  const chunks: Array<[number, number]> = [];

  // https://regex101.com/r/gY5kZ1/1
  const re = new RegExp('(^.{1,' + String(Math.max(size, 1)) + '}(\\s+|$))|(^.{1,' + String(Math.max(size - 1, 1)) + '}(\\\\|/|_|\\.|,|;|-))');

  do {
    let chunk: string;

    const match = re.exec(subject);

    if (match) {
      chunk = match[0];

      subject = subject.slice(chunk.length);

      const trimmedLength = chunk.trim().length;
      const offset = chunk.length - trimmedLength;

      chunks.push([trimmedLength, offset]);
    } else {
      chunk = subject.slice(0, size);
      subject = subject.slice(size);

      chunks.push([chunk.length, 0]);
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
