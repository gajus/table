'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

/**
 * @param {table~row[]} rows
 * @param {Object} config
 * @return {table~row[]}
 */

exports['default'] = function (rows, config) {
    return _lodash2['default'].map(rows, function (cells, index0) {
        return _lodash2['default'].map(cells, function (value, index1) {
            var column = undefined;

            column = config.columns[index1];

            return _lodash2['default'].repeat(' ', column.paddingLeft) + value + _lodash2['default'].repeat(' ', column.paddingRight);
        });
    });
};

module.exports = exports['default'];
//# sourceMappingURL=padTableData.js.map
