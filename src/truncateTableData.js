import _ from 'lodash';

/**
 * @todo Make it work with ASCII content.
 * @param {table~row[]} rows
 * @param {Object} config
 * @return {table~row[]}
 */
export default (rows, config) => {
    return _.map(rows, (cells) => {
        return _.map(cells, (content, index) => {
            return _.trunc(content, {
                length: config.columns[index].truncate
            });
        });
    });
};
