import _ from 'lodash';

let drawBorder,
    drawBorderBottom,
    drawBorderJoin,
    drawBorderTop;

/**
 * @typedef drawBorder~parts
 * @property {String} left
 * @property {String} right
 * @property {String} body
 * @property {String} join
 */

/**
 * @param {Number[]} columnSizeIndex
 * @param {drawBorder~parts} parts
 * @return {String}
 */
drawBorder = (columnSizeIndex, parts) => {
    let columns;

    columns = _.map(columnSizeIndex, (size) => {
        return _.repeat(parts.body, size);
    });

    columns = columns.join(parts.join);

    return `${parts.left}${columns}${parts.right}\n`;
};

/**
 * @typedef drawBorderTop~parts
 * @property {String} topLeft
 * @property {String} topRight
 * @property {String} topBody
 * @property {String} topJoin
 */

/**
 * @param {Number[]} columnSizeIndex
 * @param {drawBorderTop~parts} parts
 * @return {String}
 */
drawBorderTop = (columnSizeIndex, parts) => {
    return drawBorder(columnSizeIndex, {
        left: parts.topLeft,
        right: parts.topRight,
        body: parts.topBody,
        join: parts.topJoin
    });
};

/**
 * @typedef drawBorderJoin~parts
 * @property {String} joinLeft
 * @property {String} joinRight
 * @property {String} joinBody
 * @property {String} joinJoin
 */

/**
 * @param {Number[]} columnSizeIndex
 * @param {drawBorderJoin~parts} parts
 * @return {String}
 */
drawBorderJoin = (columnSizeIndex, parts) => {
    return drawBorder(columnSizeIndex, {
        left: parts.joinLeft,
        right: parts.joinRight,
        body: parts.joinBody,
        join: parts.joinJoin
    });
};

/**
 * @typedef drawBorderBottom~parts
 * @property {String} topLeft
 * @property {String} topRight
 * @property {String} topBody
 * @property {String} topJoin
 */

/**
 * @param {Number[]} columnSizeIndex
 * @param {drawBorderBottom~parts} parts
 * @return {String}
 */
drawBorderBottom = (columnSizeIndex, parts) => {
    return drawBorder(columnSizeIndex, {
        left: parts.bottomLeft,
        right: parts.bottomRight,
        body: parts.bottomBody,
        join: parts.bottomJoin
    });
};

export {
    drawBorder,
    drawBorderTop,
    drawBorderJoin,
    drawBorderBottom
};
