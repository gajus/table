import _ from 'lodash';
import alignString from './alignString';
import stringWidth from 'string-width';

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @return {table~row[]}
 */
export default (rows, config) => {
    return _.map(rows, (cells, index0) => {
        return _.map(cells, (value, index1) => {
            let column;

            column = config.columns[index1];

            if (stringWidth(value) === column.width) {
                return value;
            } else {
                return alignString(value, column.width, column.alignment);
            }
        });
    });
};
