/* eslint-disable max-nested-callbacks */

import {
  expect,
} from 'chai';
import type {
  StreamUserConfig,
} from '../src';
import makeStreamConfig from '../src/makeStreamConfig';

const baseStreamConfig: StreamUserConfig = {
  columnCount: 1,
  columnDefault: {
    width: 5,
  },
};

describe('makeStreamConfig', () => {
  it('does not affect the parameter configuration object', () => {
    makeStreamConfig(baseStreamConfig);

    expect(baseStreamConfig).to.equal(baseStreamConfig);
  });

  context('columnDefault', () => {
    context('is not provided', () => {
      it('throws an error', () => {
        expect(() => {
          return makeStreamConfig({columnCount: 2} as never);
        }).to.be.throw('Must provide config.columnDefault when creating a stream.');
      });
    });
  });

  context('columnCount', () => {
    context('is not provided', () => {
      it('throws an error', () => {
        expect(() => {
          return makeStreamConfig({columnDefault: {width: 5}} as never);
        }).to.be.throw('Must provide config.columnCount.');
      });
    });
  });

  context('column', () => {
    context('alignment', () => {
      context('is not provided', () => {
        it('defaults to "left"', () => {
          const config = makeStreamConfig(baseStreamConfig);

          expect(config.columns[0].alignment).to.equal('left');
        });
      });

      context('is provided', () => {
        it('uses the custom value', () => {
          const config = makeStreamConfig({...baseStreamConfig,
            columns: {
              0: {
                alignment: 'center',
              },
            }});

          expect(config.columns[0].alignment).to.equal('center');
        });
      });
    });

    context('paddingLeft', () => {
      context('is not provided', () => {
        it('defaults to 1', () => {
          const config = makeStreamConfig(baseStreamConfig);

          expect(config.columns[0].paddingLeft).to.equal(1);
        });
      });

      context('is provided', () => {
        it('uses the custom value', () => {
          const config = makeStreamConfig({...baseStreamConfig,
            columns: {
              0: {
                paddingLeft: 3,
              },
            }});

          expect(config.columns[0].paddingLeft).to.equal(3);
        });
      });
    });

    context('paddingRight', () => {
      context('is not provided', () => {
        it('defaults to 1', () => {
          const config = makeStreamConfig(baseStreamConfig);

          expect(config.columns[0].paddingRight).to.equal(1);
        });
      });

      context('is provided', () => {
        it('uses the custom value', () => {
          const config = makeStreamConfig({...baseStreamConfig,
            columns: {
              0: {
                paddingRight: 3,
              },
            }});

          expect(config.columns[0].paddingRight).to.equal(3);
        });
      });
    });
  });

  context('"drawVerticalLine', () => {
    context('is not provided', () => {
      it('defaults to retuning true', () => {
        const config = makeStreamConfig(baseStreamConfig);

        expect(config.drawVerticalLine(-1, -1)).to.equal(true);
      });
    });

    context('is provided', () => {
      it('uses the custom function', () => {
        const config = makeStreamConfig({
          ...baseStreamConfig,
          drawVerticalLine: () => {
            return false;
          },
        });

        expect(config.drawVerticalLine(-1, -1)).to.equal(false);
      });
    });
  });
});
