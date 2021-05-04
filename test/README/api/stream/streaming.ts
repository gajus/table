import {
  createStream,
} from '../../../../src';
import {
  expectTable,
} from '../../../utils';

describe('README.md api/stream', () => {
  describe('process.stdout.write', () => {
    let processStdoutWriteBuffer: string;

    /**
     * @member {Function} Reference to the original process.stdout.write function.
     */
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const processStdoutWrite = process.stdout.write;

    const overwriteProcessStdoutWrite = () => {
      processStdoutWriteBuffer = '';

      process.stdout.write = (text: string) => {
        processStdoutWriteBuffer += text;

        return true;
      };
    };

    const resetProcessStdoutWrite = () => {
      process.stdout.write = processStdoutWrite;

      return processStdoutWriteBuffer;
    };

    it('streaming', () => {
      const config = {
        columnCount: 3,
        columnDefault: {
          width: 2,
        },
      };

      const stream = createStream(config);

      overwriteProcessStdoutWrite();

      stream.write(['0A', '0B', '0C']);
      stream.write(['1A', '1B', '1C']);
      stream.write(['2A', '2B', '2C']);

      const output = resetProcessStdoutWrite();

      expectTable(output + '\n', '╔════╤════╤════╗\n║ 0A │ 0B │ 0C ║\n╚════╧════╧════╝\r\u001B[K╟────┼────┼────╢\n║ 1A │ 1B │ 1C ║\n╚════╧════╧════╝\r\u001B[K╟────┼────┼────╢\n║ 2A │ 2B │ 2C ║\n╚════╧════╧════╝');
    });
  });
});
