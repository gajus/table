import _ from 'lodash';

let drawBorder,
    drawBorderBottom,
    drawBorderJoin,
    drawBorderTop;

/**
 * @typedef drawBorder~parts
 * @property {string} left
 * @property {string} right
 * @property {string} body
 * @property {string} join
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {drawBorder~parts} parts
 * @return {string}
 */
drawBorder = (columnSizeIndex, parts) => {
    let columns;

    columns = _.map(columnSizeIndex, (size) => {
        return _.repeat(parts.body, size);
    });

    columns = columns.join(parts.join);

    return parts.left + columns + parts.right + '\n';
};

/**
 * @typedef drawBorderTop~parts
 * @property {string} topLeft
 * @property {string} topRight
 * @property {string} topBody
 * @property {string} topJoin
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {drawBorderTop~parts} parts
 * @return {string}
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
 * @property {string} joinLeft
 * @property {string} joinRight
 * @property {string} joinBody
 * @property {string} joinJoin
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {drawBorderJoin~parts} parts
 * @return {string}
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
 * @property {string} topLeft
 * @property {string} topRight
 * @property {string} topBody
 * @property {string} topJoin
 */

/**
 * @param {number[]} columnSizeIndex
 * @param {drawBorderBottom~parts} parts
 * @return {string}
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
