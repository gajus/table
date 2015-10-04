import {
    expect
} from 'chai';

import calculateRowHeightIndex from './../src/calculateRowHeightIndex';

describe(`calculateRowHeightIndex`, () => {
    context(`single column`, () => {
        context(`cell content width is lesser than column width`, () => {
            it(`is equal to 1`, () => {
                let config,
                    data,
                    rowSpanIndex;

                data = [
                    [
                        `aaa`
                    ]
                ];

                config = {
                    columns: {
                        0: {
                            width: 10
                        }
                    }
                };

                rowSpanIndex = calculateRowHeightIndex(data, config);

                expect(rowSpanIndex[0]).to.equal(1);
            })
        });
        context(`cell content width is twice the size of the column width`, () => {
            it(`is equal to 2`, () => {
                let config,
                    data,
                    rowSpanIndex;

                data = [
                    [
                        `aaabbb`
                    ]
                ];

                config = {
                    columns: {
                        0: {
                            width: 3
                        }
                    }
                };

                rowSpanIndex = calculateRowHeightIndex(data, config);

                expect(rowSpanIndex[0]).to.equal(2);
            });
        });
    });
    context(`multiple columns`, () => {
        context(`multiple cell content width is greater than the column width`, () => {
            it(`uses the largest height`, () => {
                let config,
                    data,
                    rowSpanIndex;

                data = [
                    [`aaabbb`],
                    [`aaabbb`]
                ];

                config = {
                    columns: {
                        0: {
                            width: 3
                        },
                        0: {
                            width: 2
                        }
                    }
                };

                rowSpanIndex = calculateRowHeightIndex(data, config);

                expect(rowSpanIndex[0]).to.equal(3);
            });
        });
    });
});
