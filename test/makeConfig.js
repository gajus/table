/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import _ from 'lodash';

import makeConfig from './../src/makeConfig';

describe(`makeConfig`, () => {
    context(`column specific alignment is not provided`, () => {
        it(`defaults to 'left'`, () => {
            let config;

            config = makeConfig([
                [
                    `aaaaa`
                ]
            ]);

            expect(config.columnConfig[0].alignment).to.equal(`left`);
        });
    });
    context(`column specific minWidth is not provided`, () => {
        context(`maxWidth is not set`, () => {
            it(`uses the maximum value length`, () => {
                let config;

                config = makeConfig([
                    [
                        `aaaaa`
                    ]
                ]);

                expect(config.columnConfig[0].minWidth).to.equal(5);
            });
        });
        context(`maxWidth is set`, () => {
            context(`maxWidth is larger than maximum value length`, () => {
                it(`uses the maximum value length`, () => {
                    let config;

                    config = makeConfig([
                        [
                            `aaaaa`
                        ]
                    ], {
                        columnConfig: [
                            {
                                maxWidth: 10
                            }
                        ]
                    });

                    expect(config.columnConfig[0].minWidth).to.equal(5);
                });
            });
            context(`maxWidth is lesser than maximum value length`, () => {
                it(`uses the maxWidth value`, () => {
                    let config;

                    config = makeConfig([
                        [
                            `aaaaaaaaaa`
                        ]
                    ], {
                        columnConfig: [
                            {
                                maxWidth: 5
                            }
                        ]
                    });

                    expect(config.columnConfig[0].minWidth).to.equal(5);
                });
            });
        });
    });
    context(`column specific minWidth is provided`, () => {
        context(`column specific minWidth is larger than maximum value length`, () => {
            it(`uses the maximum value length`, () => {
                let config;

                config = makeConfig([
                    [
                        `aaaaa`
                    ]
                ], {
                    columnConfig: [
                        {
                            minWidth: 10
                        }
                    ]
                });

                expect(_.pluck(config.columnConfig, `minWidth`)).to.deep.equal([10]);
            });
        });
        context(`column specific minWidth is smaller than maximum value length`, () => {
            it(`uses the maximum value length`, () => {
                let config;

                config = makeConfig([
                    [
                        `aaaaa`
                    ]
                ], {
                    columnConfig: [
                        {
                            minWidth: 2
                        }
                    ]
                });

                expect(_.pluck(config.columnConfig, `minWidth`)).to.deep.equal([5]);
            });
        });
    });
});
