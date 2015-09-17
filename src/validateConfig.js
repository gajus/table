import _ from 'lodash';

// To accomodate for the ./dist/ package.
import schema from './../src/schemas/config.json';

import tv4 from 'tv4';

/**
 * @param {row[]} rows
 * @param {formatData~config} config
 * @return {undefined}
 */
export default (rows, config = {}) => {
    let result;

    result = tv4.validateResult(config, schema);

    if (!result.valid) {
        console.log(`config`, config);
        console.log(`error`, {
            message: result.error.message,
            params: result.error.params,
            dataPath: result.error.dataPath,
            schemaPath: result.error.schemaPath
        });

        throw new Error(`Invalid config.`);
    }

    if (config.column) {
        _.forEach(config.column, (column) => {
            if (!_.isUndefined(column.minWidth) && !_.isUndefined(column.maxWidth) && column.minWidth > column.maxWidth) {
                throw new Error(`Column minWidth cannot be greater than maxWidth.`);
            }
        });
    }
};
