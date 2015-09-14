import {
    expect
} from 'chai';

import _ from 'lodash';

import chalk from 'chalk';

import chunk from './../src/chunk';

describe(`chunk`, () => {
    context(`subject is a plain text string`, () => {
        describe(`subject is lesser than the chunk size`, () => {
            it(`returns subject in a single chunk`, () => {
                expect(chunk(`aaa`, 3)).to.deep.equal([`aaa`]);
            });
        });
        describe(`subject is larger than the chunk size`, () => {
            it(`returns subject sliced into multiple chunks`, () => {
                expect(chunk(`aaabbbc`, 3)).to.deep.equal([`aaa`, `bbb`, `c`]);
            });
        });
    });
    context(`subject string contains ANSI escape codes`, () => {
        describe(`subject is lesser than the chunk size`, () => {
            it(`returns subject in a single chunk`, () => {
                expect(chunk(chalk.red(`aaa`), 3)).to.deep.equal([chalk.red(`aaa`)]);
            });
        });
        describe(`subject is larger than the chunk size`, () => {
            it(`returns subject sliced into multiple chunks`, () => {
                expect(chunk(chalk.red(`aaabbbc`), 3)).to.deep.equal([chalk.red(`aaa`), chalk.red(`bbb`), chalk.red(`c`)]);
            });
        });
    });
});
