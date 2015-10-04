import _ from 'lodash';

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @return {table~row[]}
 */
export default (rows, config) => {
    return _.map(rows, (cells, index0) => {
        return _.map(cells, (value, index1) => {
            return _.repeat(` `, config.column[index1].paddingLeft) + value + _.repeat(` `, config.column[index1].paddingRight);
        });
    });
};
