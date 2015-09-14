/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import _ from 'lodash';

import formatData from './../src/formatData';

import chalk from 'chalk';

describe(`formatData`, () => {
    it(`casts data to a string`, () => {
        let rows;

        rows = formatData([
            [1]
        ]);

        expect(rows[0][0]).to.be.a(`string`);
        expect(rows[0][0]).to.equal(`1`);
    });
    context(`cell value`, () => {
        context(`is plain`, () => {
            context(`length is lesser than minWidth`, () => {
                it(`pads the string on the right side using a whitespace character`, () => {
                    let rows;

                    rows = formatData([
                        [`a`]
                    ], {
                        columnConfig: [
                            {
                                minWidth: 10
                            }
                        ]
                    });

                    expect(rows[0][0]).to.equal(`a         `);
                });
            });
            context(`length is greater than minWidth`, () => {
                it(`does not affect the string`, () => {
                    let rows;

                    rows = formatData([
                        [`aaaaaaaaaa`]
                    ], {
                        columnConfig: [
                            {
                                minWidth: 5
                            }
                        ]
                    });

                    expect(rows[0][0]).to.equal(`aaaaaaaaaa`);
                });
            });
            context(`length is greater than maxWidth`, () => {
                it(`splits the string across multiple rows`, () => {
                    let rows;

                    rows = formatData([
                        [`aaabbbccc`]
                    ], {
                        columnConfig: [
                            {
                                maxWidth: 3
                            }
                        ]
                    });

                    expect(_.pluck(rows, 0)).to.deep.equal([`aaa`, `bbb`, `ccc`]);
                });
            });
        });
        context(`contains ANSI escape codes`, () => {
            context(`length is lesser than minWidth`, () => {
                it(`pads the string on the right side using a whitespace character`, () => {
                    let rows;

                    rows = formatData([
                        [
                            chalk.red(`a`)
                        ]
                    ], {
                        columnConfig: [
                            {
                                minWidth: 10
                            }
                        ]
                    });

                    expect(rows[0][0]).to.equal(`${chalk.red(`a`)}         `);
                });
            });
            context(`length is greater than minWidth`, () => {
                it(`does not affect the string`, () => {
                    let rows;

                    rows = formatData([
                        [
                            chalk.red(`aaaaaaaaaa`)
                        ]
                    ], {
                        columnConfig: [
                            {
                                minWidth: 5
                            }
                        ]
                    });

                    expect(rows[0][0]).to.equal(chalk.red(`aaaaaaaaaa`));
                });
            });
            context(`length is greater than maxWidth`, () => {
                it(`splits the string across multiple rows`, () => {
                    let rows;

                    rows = formatData([
                        [
                            chalk.red(`aaabbbccc`)
                        ]
                    ], {
                        columnConfig: [
                            {
                                maxWidth: 3
                            }
                        ]
                    });

                    expect(_.pluck(rows, 0)).to.deep.equal([chalk.red(`aaa`), chalk.red(`bbb`), chalk.red(`ccc`)]);
                });
            });
        });
    });
});
