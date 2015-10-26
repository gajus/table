import {
    createStream
} from './../../../src';

import expectTable from './expectTable';

describe('README.md usage/', () => {
    describe('process.stdout.write', () => {
        let overwriteProcessStdoutWrite,
            processStdoutWrite,
            processStdoutWriteBuffer,
            resetProcessStdoudWrite;

        /**
         * @var {Function} Reference to the original process.stdout.write function.
         */
        processStdoutWrite = process.stdout.write;

        /**
         * @returns {undefined}
         */
        overwriteProcessStdoutWrite = () => {
            processStdoutWriteBuffer = '';

            process.stdout.write = (text) => {
                processStdoutWriteBuffer += text;
            };
        };

        /**
         * @returns {string}
         */
        resetProcessStdoudWrite = () => {
            process.stdout.write = processStdoutWrite;

            return processStdoutWriteBuffer;
        };

        it('streaming', () => {
            let config,
                output,
                stream;

            config = {
                columnDefault: {
                    width: 2
                },
                columnCount: 3
            };

            stream = createStream(config);

            overwriteProcessStdoutWrite();

            stream.write(['0A', '0B', '0C']);
            stream.write(['1A', '1B', '1C']);
            stream.write(['2A', '2B', '2C']);

            output = resetProcessStdoudWrite();

            // console.log(output);

            expectTable(output + '\n', '╔════╤════╤════╗\n║ 0A │ 0B │ 0C ║\n╚════╧════╧════╝\r\u001b[K╟────┼────┼────╢\n║ 1A │ 1B │ 1C ║\n╚════╧════╧════╝\r\u001b[K╟────┼────┼────╢\n║ 2A │ 2B │ 2C ║\n╚════╧════╧════╝');
        });
    });
});
