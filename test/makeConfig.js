/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import _ from 'lodash';

import makeConfig from './../src/makeConfig';

describe(`makeConfig`, () => {
    it(`does not affect the parameter configuration object`, () => {
        let config;

        config = {};

        makeConfig([
            [
                `aaaaa`
            ]
        ], config);

        expect(config).to.deep.equal({});
    });

    context(`column`, () => {
        context(`'alignment'`, () => {
            context(`is not provided`, () => {
                it(`defaults to 'left'`, () => {
                    let config;

                    config = makeConfig([
                        [
                            `aaaaa`
                        ]
                    ]);

                    expect(config.column[0].alignment).to.equal(`left`);
                });
            });
        });
        context(`'width'`, () => {
            context(`is not provided`, () => {
                it(`defaults to the maximum column width`, () => {
                    let config;

                    config = makeConfig([
                        [
                            `aaaaa`
                        ]
                    ]);

                    expect(config.column[0].width).to.equal(5);
                });
            });
        });
        context(`'paddingLeft'`, () => {
            context(`is not provided`, () => {
                it(`defaults to 1`, () => {
                    let config;

                    config = makeConfig([
                        [
                            `aaaaa`
                        ]
                    ]);

                    expect(config.column[0].paddingLeft).to.equal(1);
                });
            });
        });
        context(`'paddingRight'`, () => {
            context(`is not provided`, () => {
                it(`defaults to 1`, () => {
                    let config;

                    config = makeConfig([
                        [
                            `aaaaa`
                        ]
                    ]);

                    expect(config.column[0].paddingRight).to.equal(1);
                });
            });
        });
    });
});
