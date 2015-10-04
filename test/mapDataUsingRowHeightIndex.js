import {
    expect
} from 'chai';

import mapDataUsingRowHeightIndex from './../src/mapDataUsingRowHeightIndex';

describe(`mapDataUsingRowHeightIndex`, () => {
    context(`no data spans multiple rows`, () => {
        it(`maps data to a single cell`, () => {
            let config,
                data,
                rowSpanIndex,
                mappedData;

            config = {
                column: {
                    0: {
                        maxWidth: 2
                    }
                }
            };

            rowSpanIndex = [
                1
            ];

            data = [
                [
                    `aa`
                ]
            ];

            mappedData = mapDataUsingRowHeightIndex(data, rowSpanIndex, config);

            expect(mappedData).to.deep.equal([
                [
                    `aa`
                ]
            ]);
        });
    });

    context(`single cell spans multiple rows`, () => {
        it(`maps data to multiple rows`, () => {
            let config,
                data,
                rowSpanIndex,
                mappedData;

            config = {
                column: {
                    0: {
                        maxWidth: 2
                    }
                }
            };

            rowSpanIndex = [
                5
            ];

            data = [
                [
                    `aabbccddee`
                ]
            ];

            mappedData = mapDataUsingRowHeightIndex(data, rowSpanIndex, config);

            expect(mappedData).to.deep.equal([
                [`aa`],
                [`bb`],
                [`cc`],
                [`dd`],
                [`ee`]
            ]);
        });
    });

    context(`multiple cells spans multiple rows`, () => {
        it(`maps data to multiple rows`, () => {
            let config,
                data,
                rowSpanIndex,
                mappedData;

            config = {
                column: {
                    0: {
                        maxWidth: 2
                    },
                    1: {
                        maxWidth: 4
                    }
                }
            };

            rowSpanIndex = [
                5
            ];

            data = [
                [
                    `aabbccddee`,
                    `00001111`
                ]
            ];

            mappedData = mapDataUsingRowHeightIndex(data, rowSpanIndex, config);

            expect(mappedData).to.deep.equal([
                [
                    `aa`,
                    `0000`
                ],
                [
                    `bb`,
                    `1111`
                ],
                [
                    `cc`,
                    ``
                ],
                [
                    `dd`,
                    ``
                ],
                [
                    `ee`,
                    ``
                ]
            ]);
        });
    });
});
