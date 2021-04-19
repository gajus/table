import slice from 'slice-ansi';
import stringWidth from 'string-width';
import stripAnsi from 'strip-ansi';
import wrapAnsi from 'wrap-ansi';

const indexAnsi = (input: string, index: number): string => {
  return stripAnsi(slice(input, index, index + 1));
};

const trimAnsi = (input: string): string => {
  let startIndex = 0;
  for (; startIndex < stringWidth(input); startIndex++) {
    if (indexAnsi(input, startIndex) !== ' ') {
      break;
    }
  }

  let endIndex = stringWidth(input) - 1;
  for (;endIndex >= 0; endIndex--) {
    if (indexAnsi(input, endIndex) !== ' ') {
      break;
    }
  }

  return slice(input, startIndex, endIndex + 1);
};

const sliceWrap = (input: string, size: number): string => {
  return wrapAnsi(input, size, {hard: true}).split('\n')[0];
};

export default (input: string, size: number): string[] => {
  let subject = input;

  const chunks = [];

  // https://regex101.com/r/gY5kZ1/1
  const re = new RegExp('(^.{1,' + String(size) + '}(\\s+|$))|(^.{1,' + String(size - 1) + '}(\\\\|/|_|\\.|,|;|-))');

  do {
    let chunk: string;

    const match = re.exec(stripAnsi(subject));

    if (match) {
      const firstMatch = match[0];

      chunk = slice(subject, 0, firstMatch.length);
      subject = slice(subject, firstMatch.length);

      chunk = trimAnsi(chunk);
    } else {
      chunk = sliceWrap(subject, size);
      subject = slice(subject, size);
    }

    chunks.push(chunk);
  } while (stringWidth(subject));

  return chunks;
};
