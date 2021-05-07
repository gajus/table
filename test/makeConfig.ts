/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import {
  makeTableConfig,
} from '../src/makeTableConfig';

describe('makeConfig', () => {
  const rows = [['aaaaa']];

  it('does not affect the parameter configuration object', () => {
    const config = {};
    makeTableConfig(rows, config);

    expect(config).to.deep.equal({});
  });

  context('column', () => {
    context('"alignment"', () => {
      context('is not provided', () => {
        it('defaults to "left"', () => {
          const config = makeTableConfig(rows);

          expect(config.columns[0].alignment).to.equal('left');
        });
      });

      context('is provided', () => {
        it('uses the custom value', () => {
          const config = makeTableConfig(rows, {columns: {
            0: {alignment: 'center'},
          }});

          expect(config.columns[0].alignment).to.equal('center');
        });
      });
    });

    context('"width"', () => {
      context('is not provided', () => {
        it('defaults to the maximum column width', () => {
          const config = makeTableConfig(rows);

          expect(config.columns[0].width).to.equal(5);
        });
      });

      context('is provided', () => {
        it('uses the custom value', () => {
          const config = makeTableConfig(rows, {columns: {0: {width: 7}}});

          expect(config.columns[0].width).to.equal(7);
        });
      });
    });

    context('"padding"', () => {
      context('is not provided', () => {
        it('defaults to 1', () => {
          const config = makeTableConfig(rows);

          expect(config.columns[0].paddingLeft).to.equal(1);
          expect(config.columns[0].paddingRight).to.equal(1);
        });
      });

      context('is provided', () => {
        it('uses the custom value', () => {
          const config = makeTableConfig(rows, {columns: {0: {paddingLeft: 3,
            paddingRight: 2}}});

          expect(config.columns[0].paddingLeft).to.equal(3);
          expect(config.columns[0].paddingRight).to.equal(2);
        });
      });
    });
  });

  context('"drawVerticalLine', () => {
    context('is not provided', () => {
      it('defaults to retuning true', () => {
        const config = makeTableConfig(rows);

        expect(config.drawVerticalLine(-1, -1)).to.equal(true);
      });
    });

    context('is provided', () => {
      it('uses the custom function', () => {
        const config = makeTableConfig(rows, {drawVerticalLine: () => {
          return false;
        }});

        expect(config.drawVerticalLine(-1, -1)).to.equal(false);
      });
    });
  });

  context('"drawHorizontalLine', () => {
    context('is not provided', () => {
      it('defaults to retuning true', () => {
        const config = makeTableConfig([['aaaaa']]);

        expect(config.drawHorizontalLine(-1, -1)).to.equal(true);
      });
    });

    context('is provided', () => {
      it('uses the custom function', () => {
        const config = makeTableConfig(rows, {drawHorizontalLine: () => {
          return false;
        }});

        expect(config.drawHorizontalLine(-1, -1)).to.be.equal(false);
      });
    });
  });

  context('"singleLine', () => {
    context('is not provided', () => {
      it('defaults to retuning false', () => {
        const config = makeTableConfig(rows);

        expect(config.singleLine).to.equal(false);
      });
    });

    context('is provided', () => {
      it('uses the custom value', () => {
        const config = makeTableConfig(rows, {singleLine: true});

        expect(config.singleLine).to.equal(true);
      });
    });
  });

  context('header', () => {
    context('when no given', () => {
      it('returns undefined', () => {
        const config = makeTableConfig(rows, {header: undefined});

        expect(config.header).to.equal(undefined);
      });
    });

    context('when given content only', () => {
      it('returns the default config', () => {
        const config = makeTableConfig(rows, {header: {
          content: 'bb',
        }});

        expect(config.header).to.deep.equal({
          alignment: 'center',
          content: 'bb',
          paddingLeft: 1,
          paddingRight: 1,
          truncate: Number.POSITIVE_INFINITY,
          wrapWord: false,
        });
      });
    });

    context('when given extra configs', () => {
      it('overrides the default', () => {
        const config = makeTableConfig(rows, {header: {
          alignment: 'center',
          content: 'bb',
          paddingLeft: 2,
          paddingRight: 3,
          truncate: 5,
          wrapWord: true,
        }});

        expect(config.header).to.deep.equal({
          alignment: 'center',
          content: 'bb',
          paddingLeft: 2,
          paddingRight: 3,
          truncate: 5,
          wrapWord: true,
        });
      });
    });
  });
});
