import slice from 'slice-ansi';
import stringWidth from 'string-width';

export default (input: string, size: number): string[] => {
  let subject = input;

  const chunks = [];

  // https://regex101.com/r/gY5kZ1/1
  const re = new RegExp('(^.{1,' + String(size) + '}(\\s+|$))|(^.{1,' + String(size - 1) + '}(\\\\|/|_|\\.|,|;|-))');

  do {
    let chunk;

    chunk = re.exec(subject);

    if (chunk) {
      chunk = chunk[0];

      subject = slice(subject, stringWidth(chunk));

      chunk = chunk.trim();
    } else {
      chunk = slice(subject, 0, size);
      subject = slice(subject, size);
    }

    chunks.push(chunk);
  } while (stringWidth(subject));

  return chunks;
};
