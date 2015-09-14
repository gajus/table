import _ from 'lodash';

/**
 * @param {row[]} rows
 * @param {formatData~config} config
 * @return {undefined}
 */
export default (rows, config = {}) => {
    let unknownPropertyName;

    unknownPropertyName = _.first(_.difference(_.keys(config), [`columnConfig`]));

    if (unknownPropertyName) {
        throw new Error(`Config must not define unknown properties. "${unknownPropertyName}" is an unknown property.`);
    }

    if (config.columnConfig) {
        _.forEach(config.columnConfig, (columnConfig) => {
            unknownPropertyName = _.first(_.difference(_.keys(columnConfig), [`align`, `minWidth`, `maxWidth`]));

            if (unknownPropertyName) {
                throw new Error(`Column config must not define unknown properties. "${unknownPropertyName}" is an unknown property.`);
            }

            if (!_.isUndefined(columnConfig.minWidth) && !_.isUndefined(columnConfig.maxWidth) && columnConfig.minWidth > columnConfig.maxWidth) {
                throw new Error(`Column minWidth cannot be greater than maxWidth.`);
            }
        });
    }
};
