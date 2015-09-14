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

            expect(config.column[0].alignment).to.equal(`left`);
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

                expect(config.column[0].minWidth).to.equal(5);
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
                        column: {
                            0: {
                                maxWidth: 10
                            }
                        }
                    });

                    expect(config.column[0].minWidth).to.equal(5);
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
                        column: {
                            0: {
                                maxWidth: 5
                            }
                        }
                    });

                    expect(config.column[0].minWidth).to.equal(5);
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
                    column: {
                        0: {
                            minWidth: 10
                        }
                    }
                });

                expect(config.column[0].minWidth).to.deep.equal(10);
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
                    column: {
                        0: {
                            minWidth: 2
                        }
                    }
                });

                expect(config.column[0].minWidth).to.deep.equal(5);
            });
        });
    });
});
