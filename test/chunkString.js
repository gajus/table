import {
    expect
} from 'chai';

import _ from 'lodash';
import chalk from 'chalk';
import chunkString from './../src/chunkString';


describe(`chunkString`, () => {
    context(`subject is a plain text string`, () => {
        describe(`subject is lesser than the chunk size`, () => {
            it(`returns subject in a single chunk`, () => {
                expect(chunkString(`aaa`, 3)).to.deep.equal([`aaa`]);
            });
        });
        describe(`subject is larger than the chunk size`, () => {
            it(`returns subject sliced into multiple chunks`, () => {
                expect(chunkString(`aaabbbc`, 3)).to.deep.equal([`aaa`, `bbb`, `c`]);
            });
        });
    });
    // The reason these tests are being skipped is because `ansi-slice`
    // pacakge suffixes string with all possible escape codes.
    // Need to find a better way to test it.
    xcontext(`subject string contains ANSI escape codes`, () => {
        describe(`subject is lesser than the chunk size`, () => {
            it(`returns subject in a single chunk`, () => {
                expect(chunkString(chalk.red(`aaa`), 3)).to.deep.equal([chalk.red(`aaa`)]);
            });
        });
        describe(`subject is larger than the chunk size`, () => {
            it(`returns subject sliced into multiple chunks`, () => {
                expect(chunkString(chalk.red(`aaabbbc`), 3)).to.deep.equal([chalk.red(`aaa`), chalk.red(`bbb`), chalk.red(`c`)]);
            });
        });
    });
});
