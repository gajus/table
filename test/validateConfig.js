/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import validateConfig from './../src/validateConfig';

describe(`validateConfig`, () => {
    context(`config defines an unknown property`, () => {
        it(`throws an error`, () => {
            expect(() => {
                validateConfig([[`a`]], {
                    unknownProperty: true
                });
            }).to.throw(Error, `Config must not define unknown properties. "unknownProperty" is an unknown property.`);
        });
    });
    context(`columnConfig`, () => {
        context(`config defines an unknown property`, () => {
            it(`throws an error`, () => {
                expect(() => {
                    validateConfig([[`a`]], {
                        columnConfig: [
                            {
                                unknownProperty: true
                            }
                        ]
                    });
                }).to.throw(Error, `Column config must not define unknown properties. "unknownProperty" is an unknown property.`);
            });
        });
        context(`column specific minWidth and maxWidth are provided`, () => {
            context(`minWidth is greater than maxWidth`, () => {
                it(`throws an error`, () => {
                    expect(() => {
                        validateConfig([[`a`]], {
                            columnConfig: [
                                {
                                    minWidth: 10,
                                    maxWidth: 5
                                }
                            ]
                        });
                    }).to.throw(Error, `Column minWidth cannot be greater than maxWidth.`);
                });
            });
        });
    });
});
