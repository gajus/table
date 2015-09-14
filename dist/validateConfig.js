'use strict';

var _lodashCollectionForEach2 = require('lodash/collection/forEach');

var _lodashCollectionForEach3 = _interopRequireDefault(_lodashCollectionForEach2);

var _lodashLangIsUndefined2 = require('lodash/lang/isUndefined');

var _lodashLangIsUndefined3 = _interopRequireDefault(_lodashLangIsUndefined2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _schemasConfigJson = require('./schemas/config.json');

var _schemasConfigJson2 = _interopRequireDefault(_schemasConfigJson);

var _tv4 = require('tv4');

var _tv42 = _interopRequireDefault(_tv4);

/**
 * @param {row[]} rows
 * @param {formatData~config} config
 * @return {undefined}
 */

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = function (rows) {
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var result = undefined;

    result = _tv42['default'].validateResult(config, _schemasConfigJson2['default']);

    if (!result.valid) {
        console.log('config', config);
        console.log('error', {
            message: result.error.message,
            params: result.error.params,
            dataPath: result.error.dataPath,
            schemaPath: result.error.schemaPath
        });

        throw new Error('Invalid config.');
    }

    if (config.column) {
        (0, _lodashCollectionForEach3['default'])(config.column, function (column) {
            if (!(0, _lodashLangIsUndefined3['default'])(column.minWidth) && !(0, _lodashLangIsUndefined3['default'])(column.maxWidth) && column.minWidth > column.maxWidth) {
                throw new Error('Column minWidth cannot be greater than maxWidth.');
            }
        });
    }
};

module.exports = exports['default'];
//# sourceMappingURL=validateConfig.js.map