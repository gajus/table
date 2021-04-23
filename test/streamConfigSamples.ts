import type {
  StreamUserConfig,
} from '../src';

const streamConfigSamples: {invalid: unknown[], valid: StreamUserConfig[], } = {
  invalid: [
    {border: 1},
    {border: {unknown: '-'}},
    {border: {topBody: 1}},
    {border: {topJoin: 1}},
    {border: {topLeft: 1}},
    {border: {topRight: 1}},
    {border: {bottomBody: 1}},
    {border: {bottomJoin: 1}},
    {border: {bottomLeft: 1}},
    {border: {bottomRight: 1}},
    {border: {bodyLeft: 1}},
    {border: {bodyRight: 1}},
    {border: {bodyJoin: 1}},
    {border: {joinBody: 1}},
    {border: {joinLeft: 1}},
    {border: {joinRight: 1}},
    {border: {joinJoin: 1}},
    {columns: 1},
    {columns: {a: {width: 5}}},
    {columns: {1: 1}},
    {columns: {1: {unknown: 1}}},
    {columns: {1: {alignment: 1}}},
    {columns: {1: {alignment: '1'}}},
    {columns: {1: {width: '5'}}},
    {columns: {1: {wrapWord: 1}}},
    {columns: {1: {truncate: '1'}}},
    {columns: {1: {paddingLeft: '1'}}},
    {columns: {1: {paddingRight: '1'}}},
    {columnDefault: 1},
    {columnDefault: {unknown: 1}},
    {columnDefault: {alignment: 1}},
    {columnDefault: {alignment: '1'}},
    {columnDefault: {width: '5'}},
    {columnDefault: {wrapWord: 1}},
    {columnDefault: {truncate: '1'}},
    {columnDefault: {paddingLeft: '1'}},
    {columnDefault: {paddingRight: '1'}},
    {unknown: 1},
    {
      columnCount: 3,
      columnDefault: {width: 20},
      columns: {0: {alignment: 'middle'}},
    },

    {
      columnCount: 3,
      columnDefault: {width: 20,
        wrapWord: 'true'},
    },
    {
      columnCount: 3,
      columnDefault: {width: 20},
      columns: {0: {wrapWord: 'true'}},
    },
    {
      columnCount: 3,
      columnDefault: {width: 20},
      columns: {0: {wrapWord: 1}},
    },
    {
      columnCount: 1,
      columnDefault: {width: 2},
      columns: {0: {width: 0}},
    },
    {
      columnCount: 1,
      columnDefault: {width: 2},
      columns: {0: {width: 1.5}},
    },
    {
      columnCount: 1,
      columnDefault: {width: 0},
    },
    {
      columnCount: 1,
      columnDefault: {width: 1.5},
    },

    // eslint-disable-next-line no-warning-comments
    // TODO: Fix the schema so that the following configs are truly invalid
    // {border: {topBody: '-'}},
    // {border: {topJoin: '-'}},
    // {border: {topLeft: '-'}},
    // {border: {topRight: '-'}},
    // {border: {bottomBody: '-'}},
    // {border: {bottomJoin: '-'}},
    // {border: {bottomLeft: '-'}},
    // {border: {bottomRight: '-'}},
    // {border: {bodyLeft: '-'}},
    // {border: {bodyRight: '-'}},
    // {border: {bodyJoin: '-'}},
    // {border: {joinBody: '-'}},
    // {border: {joinLeft: '-'}},
    // {border: {joinRight: '-'}},
    // {border: {joinJoin: '-'}},
    // {columns: {1: {alignment: 'left'}}},
    // {columns: {1: {width: 5}}},
    // {columns: {1: {wrapWord: true}}},
    // {columns: {1: {truncate: 1}}},
    // {columns: {1: {paddingLeft: 1}}},
    // {columns: {1: {paddingRight: 1}}},
    // {columnDefault: {alignment: 'left'}},
    // {columnDefault: {width: 5}},
    // {columnDefault: {wrapWord: true}},
    // {columnDefault: {truncate: 1}},
    // {columnDefault: {paddingLeft: 1}},
    // {columnDefault: {paddingRight: 1}},
  ],
  valid: [
    {
      columnCount: 1,
      columnDefault: {width: 1},
    },
    {
      columnCount: 3,
      columnDefault: {width: 20},
    },
    {
      columnCount: 1,
      columnDefault: {width: 1},
      columns: {0: {width: 1}},
    },
    {
      columnCount: 1,
      columnDefault: {width: 5},
      columns: {0: {width: 5}},
    },
    {
      columnCount: 3,
      columnDefault: {width: 20},
      columns: {0: {alignment: 'left'}},
    },
    {
      columnCount: 3,
      columnDefault: {width: 20},
      columns: {1: {alignment: 'right'}},
    },
    {
      columnCount: 3,
      columnDefault: {width: 20},
      columns: {2: {alignment: 'center'}},
    },
    {
      columnCount: 3,
      columnDefault: {
        width: 20,
      },
      columns: {
        0: {
          alignment: 'left',
          width: 10,
        },
        1: {
          alignment: 'center',
          width: 10,
        },
        2: {
          alignment: 'right',
          width: 10,
        },
      },
    },
    {
      border: {
        bodyJoin: '│',
        bodyLeft: '│',
        bodyRight: '│',
        bottomBody: '─',
        bottomJoin: '┴',
        bottomLeft: '└',
        bottomRight: '┘',
        joinBody: '─',
        joinJoin: '┼',
        joinLeft: '├',
        joinRight: '┤',
        topBody: '─',
        topJoin: '┬',
        topLeft: '┌',
        topRight: '┐',
      },
      columnCount: 1,
      columnDefault: {
        width: 10,
      },
    },
    {
      columnCount: 1,
      columnDefault: {
        width: 2,
      },
      columns: {
        0: {
          paddingLeft: 3,
        },
        1: {
          paddingRight: 3,
          width: 2,
        },
      },
    },
    {
      border: {},
      columnCount: 1,
      columnDefault: {
        paddingLeft: 0,
        paddingRight: 1,
        width: 2,
      },
    },
    {
      columnCount: 3,
      columnDefault: {
        width: 50,
      },
      columns: {
        0: {
          alignment: 'right',
          width: 10,
        },
        1: {
          alignment: 'center',
        },
        2: {
          width: 10,
        },
      },
    },
    {
      columnCount: 3,
      columnDefault: {width: 20,
        wrapWord: true},
    },
    {
      columnCount: 3,
      columnDefault: {width: 20},
      columns: {0: {wrapWord: true}},
    },
    {
      columnCount: 3,
      columnDefault: {width: 20},
      columns: {0: {wrapWord: false}},
    },
  ],
};

export default streamConfigSamples;
