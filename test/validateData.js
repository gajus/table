/* eslint-disable max-nested-callbacks */

import {
    expect
} from 'chai';

import validateData from './../src/validateData';

describe(`validateData`, () => {
    context(`table does not have a row`, () => {
        it(`throws an error`, () => {
            expect(() => {
                validateData([]);
            }).to.throw(Error, `Table must define at least one row.`);
        });
    });

    context(`table does not have a column`, () => {
        it(`throws an error`, () => {
            expect(() => {
                validateData([[]]);
            }).to.throw(Error, `Table must define at least one column.`);
        });
    });

    context(`row data is not an array`, () => {
        it(`throws an error`, () => {
            expect(() => {
                validateData({});
            }).to.throw(Error, `Table data must be an array.`);
        });
    });

    context(`column data is not an array`, () => {
        it(`throws an error`, () => {
            expect(() => {
                validateData([{}]);
            }).to.throw(Error, `Table row data must be an array.`);
        });
    });

    context(`cell data contains a control character`, () => {
        it(`throws an error`, () => {
            expect(() => {
                validateData([
                    [
                        [
                            String.fromCodePoint(0x01)
                        ]
                    ]
                ]);
            }).to.throw(Error, `Table data must not contain control characters.`);
        });
    });

    context(`rows have inconsistent number of columns`, () => {
        it(`throws an error`, () => {
            expect(() => {
                validateData([
                    [`a`, `b`, `c`],
                    [`a`, `b`]
                ]);
            }).to.throw(Error, `Table must have a consistent number of columns.`);
        });
    });
});
