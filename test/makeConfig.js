/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import makeConfig from '../src/makeConfig';

describe('makeConfig', () => {
  const rows = [['aaaaa']];

  it('does not affect the parameter configuration object', () => {
    const config = {};
    makeConfig(rows, config);

    expect(config).to.deep.equal({});
  });

  context('column', () => {
    context('"alignment"', () => {
      context('is not provided', () => {
        it('defaults to "left"', () => {
          const config = makeConfig(rows);

          expect(config.columns[0].alignment).to.equal('left');
        });
      });

      context('is provided', () => {
        it('uses the custom value', () => {
          const config = makeConfig(rows, {columns: {
            0: {alignment: 'center'},
          }});

          expect(config.columns[0].alignment).to.equal('center');
        });
      });
    });

    context('"width"', () => {
      context('is not provided', () => {
        it('defaults to the maximum column width', () => {
          const config = makeConfig(rows);

          expect(config.columns[0].width).to.equal(5);
        });
      });

      context('is provided', () => {
        it('uses the custom value', () => {
          const config = makeConfig(rows, {columns: {0: {width: 7}}});

          expect(config.columns[0].width).to.equal(7);
        });
      });
    });

    context('"paddingLeft"', () => {
      context('is not provided', () => {
        it('defaults to 1', () => {
          const config = makeConfig(rows);

          expect(config.columns[0].paddingLeft).to.equal(1);
        });
      });

      context('is provided', () => {
        it('uses the custom value', () => {
          const config = makeConfig(rows, {columns: {0: {paddingLeft: 3}}});

          expect(config.columns[0].paddingLeft).to.equal(3);
        });
      });
    });

    context('"paddingRight"', () => {
      context('is not provided', () => {
        it('defaults to 1', () => {
          const config = makeConfig(rows);

          expect(config.columns[0].paddingRight).to.equal(1);
        });
      });

      context('is provided', () => {
        it('uses the custom value', () => {
          const config = makeConfig(rows, {columns: {0: {paddingRight: 3}}});

          expect(config.columns[0].paddingRight).to.equal(3);
        });
      });
    });
  });

  context('"drawVerticalLine', () => {
    context('is not provided', () => {
      it('defaults to retuning true', () => {
        const config = makeConfig(rows);

        expect(config.drawVerticalLine()).to.equal(true);
      });
    });

    context('is provided', () => {
      it('uses the custom function', () => {
        const config = makeConfig(rows, {drawVerticalLine: () => {
          return false;
        }});

        expect(config.drawVerticalLine()).to.equal(false);
      });
    });
  });

  context('"drawHorizontalLine', () => {
    context('is not provided', () => {
      it('defaults to retuning true', () => {
        const config = makeConfig([['aaaaa']]);

        expect(config.drawHorizontalLine()).to.equal(true);
      });
    });

    context('is provided', () => {
      it('uses the custom function', () => {
        const config = makeConfig(rows, {drawHorizontalLine: () => {
          return false;
        }});

        expect(config.drawHorizontalLine()).to.equal(false);
      });
    });
  });

  context('"singleLine', () => {
    context('is not provided', () => {
      it('defaults to retuning false', () => {
        const config = makeConfig(rows);

        expect(config.singleLine).to.equal(false);
      });
    });

    context('is provided', () => {
      it('uses the custom value', () => {
        const config = makeConfig(rows, {singleLine: true});

        expect(config.singleLine).to.equal(true);
      });
    });
  });
});
