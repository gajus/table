export default {
    valid: [
        {
            columns: {
                0: {
                    alignment: 'left',
                    // minWidth: 10,
                    width: 10
                },
                1: {
                    alignment: 'center',
                    // minWidth: 10,
                    width: 10
                },
                2: {
                    alignment: 'right',
                    // minWidth: 10,
                    width: 10
                }
            }
        },
        {
            border: {
                topBody: `─`,
                topJoin: `┬`,
                topLeft: `┌`,
                topRight: `┐`,

                bottomBody: `─`,
                bottomJoin: `┴`,
                bottomLeft: `└`,
                bottomRight: `┘`,

                bodyLeft: `│`,
                bodyRight: `│`,
                bodyJoin: `│`,

                joinBody: `─`,
                joinLeft: `├`,
                joinRight: `┤`,
                joinJoin: `┼`
            }
        },
        {
            columns: {
                0: {
                    paddingLeft: 3
                },
                1: {
                    width: 2,
                    paddingRight: 3
                }
            }
        },
        {
            border: {},
            columnDefault: {
                paddingLeft: 0,
                paddingRight: 1
            },
            // drawJoin: () => {
            //     return false
            // }
        },
        {
            columnDefault: {
                width: 50
            },
            // columnCount: 3,
            columns: {
                0: {
                    width: 10,
                    alignment: 'right'
                },
                1: {
                    alignment: 'center',
                },
                2: {
                    width: 10
                }
            }
        }        
    ],
    invalid: [
    ]
};
