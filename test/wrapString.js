import {
    expect
} from 'chai';

import _ from 'lodash';
import chalk from 'chalk';
import wrapString from './../src/wrapString';

describe('wrapString', () => {
    context('subject is a plain text string', () => {
        context('subject is lesser than the chunk size', () => {
            it('returns subject in a single chunk', () => {
                expect(wrapString('aaa', 3)).to.deep.equal(['aaa']);
            });
        });
        context('subject is larger than the chunk size', () => {
            it('returns subject sliced into multiple chunks', () => {
                expect(wrapString('aaabbbc', 3)).to.deep.equal(['aaa', 'bbb', 'c']);
            });
        });
        context('a chunk starts with a space', () => {
            it('adjusts chunks to offset the space', () => {
                expect(wrapString('aaa   bbb   ccc', 3)).to.deep.equal(['aaa', 'bbb', 'ccc']);
            });
        });
    });
    // The reason these tests are being skipped is because 'ansi-slice'
    // pacakge suffixes string with all possible escape codes.
    // Need to find a better way to test it.
    xcontext('subject string contains ANSI escape codes', () => {
        describe('subject is lesser than the chunk size', () => {
            it('returns subject in a single chunk', () => {
                expect(wrapString(chalk.red('aaa'), 3)).to.deep.equal([chalk.red('aaa')]);
            });
        });
        describe('subject is larger than the chunk size', () => {
            it('returns subject sliced into multiple chunks', () => {
                expect(wrapString(chalk.red('aaabbbc'), 3)).to.deep.equal([chalk.red('aaa'), chalk.red('bbb'), chalk.red('c')]);
            });
        });
    });
});
