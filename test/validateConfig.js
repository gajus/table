/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import validateConfig from './../src/validateConfig';

describe(`validateConfig`, () => {
    context(`column`, () => {
        context(`column specific minWidth and maxWidth are provided`, () => {
            context(`minWidth is greater than maxWidth`, () => {
                it(`throws an error`, () => {
                    expect(() => {
                        validateConfig([[`a`]], {
                            column: {
                                0: {
                                    minWidth: 10,
                                    maxWidth: 5
                                }
                            }
                        });
                    }).to.throw(Error, `Column minWidth cannot be greater than maxWidth.`);
                });
            });
        });
    });
});
