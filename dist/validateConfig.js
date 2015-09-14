'use strict';

var _lodashArrayFirst2 = require('lodash/array/first');

var _lodashArrayFirst3 = _interopRequireDefault(_lodashArrayFirst2);

var _lodashArrayDifference2 = require('lodash/array/difference');

var _lodashArrayDifference3 = _interopRequireDefault(_lodashArrayDifference2);

var _lodashObjectKeys2 = require('lodash/object/keys');

var _lodashObjectKeys3 = _interopRequireDefault(_lodashObjectKeys2);

var _lodashCollectionForEach2 = require('lodash/collection/forEach');

var _lodashCollectionForEach3 = _interopRequireDefault(_lodashCollectionForEach2);

var _lodashLangIsUndefined2 = require('lodash/lang/isUndefined');

var _lodashLangIsUndefined3 = _interopRequireDefault(_lodashLangIsUndefined2);

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * @param {row[]} rows
 * @param {formatData~config} config
 * @return {undefined}
 */

exports['default'] = function (rows) {
    var config = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    var unknownPropertyName = undefined;

    unknownPropertyName = (0, _lodashArrayFirst3['default'])((0, _lodashArrayDifference3['default'])((0, _lodashObjectKeys3['default'])(config), ['columnConfig']));

    if (unknownPropertyName) {
        throw new Error('Config must not define unknown properties. "' + unknownPropertyName + '" is an unknown property.');
    }

    if (config.columnConfig) {
        (0, _lodashCollectionForEach3['default'])(config.columnConfig, function (columnConfig) {
            unknownPropertyName = (0, _lodashArrayFirst3['default'])((0, _lodashArrayDifference3['default'])((0, _lodashObjectKeys3['default'])(columnConfig), ['align', 'minWidth', 'maxWidth']));

            if (unknownPropertyName) {
                throw new Error('Column config must not define unknown properties. "' + unknownPropertyName + '" is an unknown property.');
            }

            if (!(0, _lodashLangIsUndefined3['default'])(columnConfig.minWidth) && !(0, _lodashLangIsUndefined3['default'])(columnConfig.maxWidth) && columnConfig.minWidth > columnConfig.maxWidth) {
                throw new Error('Column minWidth cannot be greater than maxWidth.');
            }
        });
    }
};

module.exports = exports['default'];
//# sourceMappingURL=validateConfig.js.map