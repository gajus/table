/**
 * @param {String} name
 * @return {Object}
 */
export default (name) => {
    if (name === `honeywell`) {
        return {
            topBody: `═`,
            topJoin: `╤`,
            topLeft: `╔`,
            topRight: `╗`,

            bottomBody: `═`,
            bottomJoin: `╧`,
            bottomLeft: `╚`,
            bottomRight: `╝`,

            bodyLeft: `║`,
            bodyRight: `║`,
            bodyJoin: `│`,

            joinBody: `─`,
            joinLeft: `╟`,
            joinRight: `╢`,
            joinJoin: `┼`
        };
    }

    if (name === `norc`) {
        return {
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
        };
    }

    if (name === `ramac`) {
        return {
            topBody: `-`,
            topJoin: `+`,
            topLeft: `+`,
            topRight: `+`,

            bottomBody: `-`,
            bottomJoin: `+`,
            bottomLeft: `+`,
            bottomRight: `+`,

            bodyLeft: `|`,
            bodyRight: `|`,
            bodyJoin: `|`,

            joinBody: `-`,
            joinLeft: `|`,
            joinRight: `|`,
            joinJoin: `|`
        };
    }

    throw new Error(`Unknown border template "${name}".`);
};
