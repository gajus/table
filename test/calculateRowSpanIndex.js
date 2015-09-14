import {
    expect
} from 'chai';

import calculateRowSpanIndex from './../src/calculateRowSpanIndex';

describe(`calculateRowSpanIndex`, () => {
    context(`single column`, () => {
        context(`cell content width is lesser than maxWidth`, () => {
            it(`is equal to 1`, () => {
                let config,
                    data,
                    rowSpanIndex;

                data = [
                    [`aaa`]
                ];

                config = {
                    column: {
                        0: {
                            maxWidth: Infinity
                        }
                    }
                };

                rowSpanIndex = calculateRowSpanIndex(data, config);

                expect(rowSpanIndex[0]).to.equal(1);
            })
        });
        context(`cell content width is twice the size of the the maxWidth`, () => {
            it(`is equal to 2`, () => {
                let config,
                    data,
                    rowSpanIndex;

                data = [
                    [`aaabbb`]
                ];

                config = {
                    column: {
                        0: {
                            maxWidth: 3
                        }
                    }
                };

                rowSpanIndex = calculateRowSpanIndex(data, config);

                expect(rowSpanIndex[0]).to.equal(2);
            });
        });
    });
    context(`multiple columns`, () => {
        context(`multiple cell content width is greater than maxWidth`, () => {
            it(`uses the largest height`, () => {
                let config,
                    data,
                    rowSpanIndex;

                data = [
                    [`aaabbb`],
                    [`aaabbb`]
                ];

                config = {
                    column: {
                        0: {
                            maxWidth: 3
                        },
                        0: {
                            maxWidth: 2
                        }
                    }
                };

                rowSpanIndex = calculateRowSpanIndex(data, config);

                expect(rowSpanIndex[0]).to.equal(3);
            });
        });
    });
});
