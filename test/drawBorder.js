import {
    expect
} from 'chai';

import {
    drawBorder,
    drawBorderTop
} from './../src/drawBorder';

describe(`drawBorder`, () => {
    it(`draws a border using parts`, () => {
        let parts;

        parts = {
            left: `╔`,
            right: `╗`,
            body: `═`,
            join: `╤`
        };

        expect(drawBorder([1], parts)).to.equal(`╔═╗\n`);
        expect(drawBorder([1, 1], parts)).to.equal(`╔═╤═╗\n`);
        expect(drawBorder([5, 10], parts)).to.equal(`╔═════╤══════════╗\n`);
    });
});

describe(`drawBorderTop`, () => {
    it(`draws a border using parts`, () => {
        let parts;

        parts = {
            topLeft: `╔`,
            topRight: `╗`,
            topBody: `═`,
            topJoin: `╤`
        };

        expect(drawBorderTop([1], parts)).to.equal(`╔═╗\n`);
        expect(drawBorderTop([1, 1], parts)).to.equal(`╔═╤═╗\n`);
        expect(drawBorderTop([5, 10], parts)).to.equal(`╔═════╤══════════╗\n`);
    });
});
