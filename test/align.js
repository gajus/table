/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import align from './../src/align';

import chalk from 'chalk';

describe(`align`, () => {
    context(`subject parameter value is not a string`, () => {
        it(`throws an error`, () => {
            expect(() => {
                align();
            }).to.throw(Error, `Subject parameter value must be a string.`);
        });
    });
    context(`container width parameter value is not a string`, () => {
        it(`throws an error`, () => {
            expect(() => {
                align(``);
            }).to.throw(Error, `Container width parameter value must be a number.`);
        });
    });
    context(`subject parameter value width is greater than the container width`, () => {
        it(`throws an error`, () => {
            expect(() => {
                align(`aa`, 1, `left`);
            }).to.throw(Error, `Subject parameter value width cannot be greater than the container width.`);
        });
    });
    context(`container alignment parameter value is not a string`, () => {
        it(`throws an error`, () => {
            expect(() => {
                align(``, 1);
            }).to.throw(Error, `Alignment parameter value must be a string.`);
        });
    });
    context(`container alignment parameter value is not a known alignment parameter value`, () => {
        it(`throws an error`, () => {
            expect(() => {
                align(``, 1, `foo`);
            }).to.throw(Error, `Alignment parameter value must be a known alignment parameter value (left, right, center).`);
        });
    });
    context(`subject parameter value`, () => {
        context(`plain text`, () => {
            context(`alignment`, () => {
                context(`left`, () => {
                    it(`pads the string on the right side using a whitespace character`, () => {
                        expect(align(`aa`, 6, `left`)).to.equal(`aa    `);
                    });
                });
                context(`right`, () => {
                    it(`pads the string on the left side using a whitespace character`, () => {
                        expect(align(`aa`, 6, `right`)).to.equal(`    aa`);
                    });
                });
                context(`center`, () => {
                    it(`pads the string on both sides using a whitespace character`, () => {
                        expect(align(`aa`, 6, `center`)).to.equal(`  aa  `);
                    });
                    context(`uneven number of available with`, () => {
                        it(`floors the available width; adds extra space to the end of the string`, () => {
                            expect(align(`aa`, 7, `center`)).to.equal(`  aa   `);
                        });
                    });
                });
            });
        });
        context(`text containing ANSI escape codes`, () => {
            context(`alignment`, () => {
                context(`left`, () => {
                    it(`pads the string on the right side using a whitespace character`, () => {
                        expect(align(chalk.red(`aa`), 6, `left`)).to.equal(`${chalk.red(`aa`)}    `);
                    });
                });
                context(`right`, () => {
                    it(`pads the string on the left side using a whitespace character`, () => {
                        expect(align(chalk.red(`aa`), 6, `right`)).to.equal(`    ${chalk.red(`aa`)}`);
                    });
                });
                context(`center`, () => {
                    it(`pads the string on both sides using a whitespace character`, () => {
                        expect(align(chalk.red(`aa`), 6, `center`)).to.equal(`  ${chalk.red(`aa`)}  `);
                    });
                    context(`uneven number of available with`, () => {
                        it(`floors the available width; adds extra space to the end of the string`, () => {
                            expect(align(chalk.red(`aa`), 7, `center`)).to.equal(`  ${chalk.red(`aa`)}   `);
                        });
                    });
                });
            });
        });
    });
});
